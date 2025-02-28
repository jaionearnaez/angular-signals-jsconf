import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { PokeImgComponent } from '../components/poke-img.component';
import { PokeResponse } from '../models/poke-api';
import { PokemonImagePipe } from '../pipes/pokemon-image.pipe';

@Component({
  selector: 'app-home',
  imports: [PokemonImagePipe, JsonPipe, PokeImgComponent],
  template: `
    @if (pokedex.isLoading()) {
      <p>LOADING...</p>
    } @else if (pokedex.error()) {
      <p>{{ pokedex.error() | json }}</p>
    } @else if (pokedex.hasValue()) {
      <div class="pokemon-grid">
        @for (pokemon of pokedex.value(); track pokemon.name) {
          <div class="pokemon-card" #pokecard>
            <p class="pokemon-name">{{ pokemon.name }}</p>
            @defer (on viewport(pokecard)) {
              <app-poke-img [url]="pokemon.url | pokemonImage" />
            }
          </div>
        }
      </div>
    }
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private http = inject(HttpClient);

  pokedex = rxResource({
    loader: () => {
      console.log('loading???');
      const limit = 1000000;
      return this.http
        .get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`)
        .pipe(
          // tap((_) => console.log('Not selected', _)),
          map((resp) => {
            return resp.results;
          }),
        );
    },
  });
}
