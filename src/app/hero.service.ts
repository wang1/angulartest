import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  url = 'http://localhost:3001/hero';
  // httpOptions = {
  //   headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
  // };
  constructor(private messageService: MessageService, private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.url);
  }
  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return this.http.get<Hero>(`${this.url}/${id}`);
  }
  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(this.url, hero);
  }
  createHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.url, hero);
  }

  deleteHero(id: number): Observable<Hero> {
    return this.http.delete<Hero>(`${this.url}/${id}`);
  }
}
