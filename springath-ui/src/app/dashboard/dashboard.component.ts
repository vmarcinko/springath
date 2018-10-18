import {Component, OnInit} from '@angular/core';
import {Hero} from "../hero";
import {HeroService} from "../hero.service";
import {log} from "util";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {
    log("Instantiated class: " + this.constructor.name);
  }

  ngOnInit() {
    this.heroService.getHeroes().subscribe(
      heroes => {
        this.heroes = heroes.slice(0, 4);
        log("Heroes loaded by dashboard: " + JSON.stringify(this.heroes));
      }
    )
  }
}
