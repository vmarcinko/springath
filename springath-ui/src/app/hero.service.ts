import {Injectable} from '@angular/core';
import {Hero} from './hero';
import {Observable, of} from 'rxjs';
import {MessageService} from "./message.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, tap} from 'rxjs/operators';
import {environment} from '../environments/environment';
import * as moment from 'moment';

const httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
	providedIn: 'root'
})
export class HeroService {
	private heroesUrl = environment.apiUrl + '/heroes';  // URL to web api

	constructor(private http: HttpClient, private messageService: MessageService) {
	}

	getHeroes(): Observable<Hero[]> {
		return this.http
			.get<Hero[]>(this.heroesUrl)
			.pipe(
				map(value => value.map(HeroService.convertApiHeroToModel)),
				tap(heroes => this.log(`Fetched ${heroes.length} heroes`)),
				catchError(this.handleError('getHeroes', [])));
	}

	getHero(id: number): Observable<Hero> {
		const url = `${this.heroesUrl}/${id}`;
		return this.http.get<Hero>(url).pipe(
			map(HeroService.convertApiHeroToModel),
			tap(value => this.log(`fetched hero ${JSON.stringify(value)}`)),
			catchError(this.handleError<Hero>(`getHero id=${id}`))
		);
	}

	updateHero(hero: Hero): Observable<any> {
		const url = `${this.heroesUrl}/${hero.id}`;
		let requestBody = HeroService.convertModelHeroToApi(hero);

		return this.http.put(url, requestBody, httpOptions).pipe(
			tap(_ => this.log(`updated hero id=${hero.id}`)),
			catchError(this.handleError<any>('updateHero'))
		);
	}

	/** Log a HeroService message with the MessageService */
	private log(message: string) {
		this.messageService.add(`HeroService: ${message}`);
	}

	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			this.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}

	addHero(hero: Hero): Observable<Hero> {
		let requestBody = HeroService.convertModelHeroToApi(hero);

		return this.http.post<Hero>(this.heroesUrl, requestBody, httpOptions).pipe(
			map(HeroService.convertApiHeroToModel),
			tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
			catchError(this.handleError<Hero>('addHero'))
		);
	}

	deleteHero(hero: Hero | number): Observable<Hero> {
		const id = typeof hero === 'number' ? hero : hero.id;
		const url = `${this.heroesUrl}/${id}`;

		return this.http.delete<Hero>(url, httpOptions).pipe(
			tap(_ => this.log(`deleted hero id=${id}`)),
			catchError(this.handleError<Hero>('deleteHero'))
		);
	}


	searchHeroes(term: string): Observable<Hero[]> {
		if (!term.trim()) {
			// if not search term, return empty hero array.
			return of([]);
		}
		return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
			map(value => value.map(HeroService.convertApiHeroToModel)),
			tap(_ => this.log(`found heroes matching "${term}"`)),
			catchError(this.handleError<Hero[]>('searchHeroes', []))
		);
	}

	private static convertModelHeroToApi(hero: any): any {
		if (!hero) {
			return null;
		}
		let copy = HeroService.deepCopy(hero);
		copy.birthday = moment(copy.birthday).format("YYYY-MM-DD");
		return copy;
	}

	private static convertApiHeroToModel(hero: Hero): Hero {
		hero.birthday = moment(hero.birthday, 'YYYY-MM-DD').toDate();
		return hero;
	}

	private static deepCopy<T>(obj: T): T {
		return JSON.parse(JSON.stringify(obj));
	}
}
