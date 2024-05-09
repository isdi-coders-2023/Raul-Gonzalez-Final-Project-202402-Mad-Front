import { Component } from '@angular/core';
import BurgerComponent from '../../core/burger/burger.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BurgerComponent, RouterModule],
  template: `
    <header>
      <a href="#" [routerLink]="'/home'"
        ><video
          src="../assets/videoanillo.mp4"
          width="70px"
          height="65px"
          controls
          autoplay
          loop
        ></video
      ></a>

      <app-burger></app-burger>
    </header>
  `,
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
