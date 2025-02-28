import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-poke-img',
  template: `
    @if (loading()) {
      <div class="spinner"></div>
    }
    <img
      [src]="url()"
      (load)="this.loading.set(false)"
      (error)="this.loading.set(false)"
      [style.opacity]="this.loading() ? '0' : '1'"
    />
  `,
  styles: [
    `
      :host {
        display: block;
        position: relative;
        width: 220px; /* Ajusta según necesites */
        height: 220px;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          transition: opacity 1s ease-in-out;
        }
      }
    `,
  ],
  standalone: true,
})
export class PokeImgComponent {
  url = input.required<string>();
  loading = signal<boolean>(true);
}
