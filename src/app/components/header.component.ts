import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <h1>POKEDEX - ng - EXPLORER</h1>
    </header>
  `,
  styles: [
    `
      :host {
        flex-shrink: 0; /* No permite que el header se reduzca */

        header {
          background-color: #ff4444;
          color: white;
          padding: 20px;
          font-size: 1.5rem;
        }
      }
    `,
  ],
  standalone: true,
})
export class HeaderComponent {}
