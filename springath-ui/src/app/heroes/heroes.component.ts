import {Component, OnInit} from '@angular/core';
import {Hero} from "../hero";
import {HeroService} from '../hero.service';
import {log} from "util";

@Component({
	selector: 'app-heroes',
	templateUrl: './heroes.component.html',
	styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
	heroes: Hero[];
	newHero: Hero = {id: null, name: '', birthday: null};

	constructor(private heroService: HeroService) {
		log("Instancirana klasa: " + this.constructor.name);
	}

	ngOnInit() {
		this.heroService.getHeroes().subscribe(value => this.heroes = value);
	}

	add(): void {
		this.heroService.addHero(this.newHero as Hero)
			.subscribe(hero => {
				this.heroes.push(hero);
			});
		this.newHero = {id: null, name: '', birthday: null};
	}

	delete(hero: Hero): void {
		this.heroService.deleteHero(hero).subscribe(
			_ => this.heroes = this.heroes.filter(h => h !== hero));
	}
}
