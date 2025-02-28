import { Pipe } from '@angular/core';

@Pipe({
  name: 'pokemonImage',
  pure: true,
  standalone: true,
})
export class PokemonImagePipe {
  transform(url: string): string {
    const parts = url.split('/');
    const id = parts[parts.length - 2];
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }
}
