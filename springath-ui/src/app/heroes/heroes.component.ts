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

  constructor(private heroService: HeroService) {
    log("Instancirana klasa: " + this.constructor.name);
  }

  ngOnInit() {
    this.heroService.getHeroes().subscribe(value => this.heroes = value);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({name} as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero).subscribe(
      _ => this.heroes = this.heroes.filter(h => h !== hero));
  }
}
