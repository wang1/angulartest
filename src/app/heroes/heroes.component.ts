import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];

  constructor(
    private heroService: HeroService,
    private messageService: MessageService) {
    
   }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.messageService.add(`Heroes: ${hero.name} is selected!`);
    this.selectedHero = hero;
  }

  getHeroes():void {
    this.heroService.getHeroes()
      .subscribe(xx => this.heroes = xx);
  }

  createHero(no: string, name: string): void {
    this.heroService.createHero({no,name} as Hero)
      .subscribe(hero => this.heroes.push(hero));
  }

  deleteHero(id: number): void {
    this.heroService.deleteHero(id)
      .subscribe(_ => this.heroes = this.heroes.filter(hero => hero.id !== id));
  }

}
