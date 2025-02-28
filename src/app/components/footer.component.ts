import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      <p>🚀 Coded with ❤️ by _J</p>
    </footer>
  `,
  styles: [
    `
      :host {
        flex-shrink: 0; /* No permite que el footer se reduzca */
        background-color: #333;
        color: white;
        text-align: center;
        padding: 10px;

        footer {
          background-color: #333;
          color: white;
          padding: 10px;
          margin-top: 20px;
          font-size: 0.9rem;
        }
      }
    `,
  ],
  standalone: true,
})
export class FooterComponent {}
