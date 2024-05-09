import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule],
  template: `
    <menu>
      <section>
        <button>MAPA</button>
        <button>RAZAS</button>
        <button>HISTORIA</button>
        <button>FACCIONES</button>
        <a href="#" [routerLink]="'/login'"><button>LOGIN</button></a>
      </section>
    </menu>
  `,
  styleUrl: './menu.component.css',
})
export default class MenuComponent {}
