import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StateService } from '../../service/state.service';
import { Character } from '../../models/character.data';
import { RepoCharacterService } from '../../service/character.service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-details',
  standalone: true,
  template: `
    <div>
      <img
        src="{{ this.state.constructImageUrl(character.imgUrl, '100', '100') }}"
        alt="logoCard"
      />
    </div>
  `,
  styleUrl: './details.component.css',
  imports: [RouterModule, CardComponent],
})
export default class DetailsComponent {
  @Input() character!: Character;
  route = inject(ActivatedRoute);
  state = inject(StateService);
  repo = inject(RepoCharacterService);
}
