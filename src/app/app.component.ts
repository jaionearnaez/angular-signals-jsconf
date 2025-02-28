import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer.component';
import { HeaderComponent } from './components/header.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  template: `
    <app-header />
    <main>
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        min-height: 100vh;

        /* Main ocupa el espacio restante con scroll si es necesario */
        main {
          flex-grow: 1;
          overflow: auto;
          padding: 20px;
        }
      }
    `,
  ],
})
export class AppComponent {}
