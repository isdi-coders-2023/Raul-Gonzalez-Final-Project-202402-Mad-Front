import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-burger',
  standalone: true,
  imports: [RouterModule],
  template: `<a href="#" [routerLink]="'/menu'"
    ><img src="../assets/iconburger.png" alt="iconburger" width="70px"
  /></a> `,
  styleUrl: './burger.component.css',
})
export default class BurgerComponent {
  constructor() {}
}
