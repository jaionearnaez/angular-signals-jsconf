import { JsonPipe, TitleCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { PokeImgComponent } from '../components/poke-img.component';
import { Abilities, PokeResponse, RootAbilities } from '../models/poke-api';
import { PokemonImagePipe } from '../pipes/pokemon-image.pipe';

@Component({
  selector: 'app-home',
  imports: [PokemonImagePipe, JsonPipe, PokeImgComponent, TitleCasePipe],
  template: `
    <div class="controls-container">
      <label
        >Selecciona la habilidad:
        <select (change)="onSelectAbility($event)">
          @if (abilities.value()) {
            <option [value]="''">None</option>

            @for (ability of abilities.value()?.results; track ability) {
              <option [value]="ability.url">
                {{ ability.name | titlecase }}
              </option>
            }
          }
          @if (abilities.isLoading()) {
            <option class="loading-text">Loading...</option>
          }
        </select>
      </label>
    </div>

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
  // from Angular Router's withComponentInputBinding
  queryLimit = input<number>();
  defaultLimit: Readonly<number> = 6;

  selectedAbility = signal<string | null>(null);

  private http = inject(HttpClient);

  pokedex = rxResource({
    request: () => ({
      selectedAbility: this.selectedAbility(),
      limit: this.queryLimit(),
    }),
    loader: ({ request }) => {
      const limit = request.limit ?? 1000000;
      if (request.selectedAbility) {
        return this.http.get<RootAbilities>(`${request.selectedAbility}`).pipe(
          // tap((_) => console.log('selected', _)),
          // reduce
          map((resp) => {
            return resp.pokemon
              .map(({ pokemon }) => pokemon)
              .filter((_, index) => index < limit);
          }),
        );
      }
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

  abilities = rxResource({
    loader: () => {
      return this.http.get<Abilities>(
        `https://pokeapi.co/api/v2/ability/?limit=100000000`,
      );
      // .pipe(tap((_) => console.log(_)));
    },
  });

  onSelectAbility(event: Event) {
    const target = event.target as HTMLSelectElement; // 💕typescript
    this.selectedAbility.set(target.value);
  }
}
