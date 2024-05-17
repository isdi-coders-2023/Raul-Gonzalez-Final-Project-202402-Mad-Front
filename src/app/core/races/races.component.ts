import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StateService } from '../../service/state.service';

@Component({
  selector: 'app-races',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div>
      @for (race of races; track $index) {
      <button type="submit" [routerLink]="['/races', race.path]">
        {{ race.title }}
      </button>
      }

      <button type="submit" [routerLink]="'/create'">Crea tu personaje</button>
    </div>
  `,
  styleUrl: './races.component.css',
})
export default class RacesComponent {
  state = inject(StateService);

  races = [
    { path: 'men', title: 'hombre' },
    { path: 'elve', title: 'elfo' },
    { path: 'dwarf', title: 'enano' },
    { path: 'urukhai', title: 'urukhai' },
    { path: 'orc', title: 'orco' },
    { path: 'hobbit', title: 'hobbit' },
  ];
}
