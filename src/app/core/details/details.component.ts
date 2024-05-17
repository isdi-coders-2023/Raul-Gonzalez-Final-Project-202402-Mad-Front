import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StateService } from '../../service/state.service';
import { Character } from '../../models/character.data';
import { CardComponent } from '../card/card.component';
import { RepoCharacterService } from '../../service/character.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  template: `
    <div>
      @if (character) {
      <img
        src="{{ this.state.constructImageUrl(character.imgUrl, '100', '100') }}"
        alt="logoCard"
      />
      <p>Nombre: {{ character.name }}</p>
      <p>Raza: {{ character.race }}</p>
      <p>Descripcion {{ character.description }}</p>
      }
      <section>
        <img
          src="../assets/update.png"
          alt="logoUpdate"
          width="40"
          (click)="toggleUpdateForm()"
          (keyup)="toggleUpdateForm()"
          tabindex="0"
        />

        <img
          src="../assets/delete.png"
          alt="LogoDelete"
          width="30"
          height="30"
          (click)="deleteCharacter()"
          (keyup)="deleteCharacter()"
          tabindex="0"
        />
      </section>
    </div>
    @if (showUpdateForm) {
    <div>
      <form [formGroup]="updateForm" (ngSubmit)="updateCharacter()">
        <label for="name">Name:</label>
        <input id="name" formControlName="name" />
        <label for="race">Race:</label>
        <input id="race" formControlName="race" />
        <label for="description">Description:</label>
        <textarea id="description" formControlName="description"></textarea>
        <label for="faction"></label>
        <input type="text" formControlName="faction" />

        <input type="file" id="imgUrl" #imgUrl (change)="onChangeImg()" />
        <button type="submit">Update Character</button>
      </form>
    </div>
    }
  `,
  styleUrl: './details.component.css',
  imports: [RouterModule, CardComponent, ReactiveFormsModule],
})
export default class DetailsComponent {
  route = inject(ActivatedRoute);
  repo = inject(RepoCharacterService);
  state = inject(StateService);
  router = inject(Router);
  fb = inject(FormBuilder);
  @ViewChild('imgUrl') imgUrl!: ElementRef;

  character!: Character | undefined;
  showUpdateForm = false;
  updateForm: FormGroup;

  constructor() {
    this.updateForm = this.fb.group({
      name: [''],
      race: [''],
      description: [''],
      imgUrl: [''],
    });

    const characterId = this.route.snapshot.paramMap.get('id');
    this.state.getState().subscribe((data) => {
      console.log(data);
      this.character = data.characters.find(
        (character) => character.id === characterId
      );
      console.log(this.character);
    });
  }

  deleteCharacter() {
    if (!this.character) return;

    this.repo.getDelete(this.character.id).subscribe(() => {
      this.state.setCharacters(
        this.state.state.characters.filter(
          (char) => char.id !== this.character!.id
        )
      );
      this.router.navigate(['/characters']);
    });
  }
  toggleUpdateForm() {
    this.showUpdateForm = !this.showUpdateForm;
  }
  updateCharacter() {
    if (!this.character) return;

    const updatedData = new FormData();
    updatedData.append('name', this.updateForm.value.name);
    updatedData.append('race', this.updateForm.value.race);
    updatedData.append('description', this.updateForm.value.description);
    updatedData.append('imgUrl', this.updateForm.value.imgUrl);
    updatedData.append('faction', this.updateForm.value.faction);

    this.repo
      .updateCharacter(this.character.id, updatedData)
      .subscribe((updatedCharacter) => {
        const updatedCharacters = this.state.state.characters.map((char) =>
          char.id === this.character!.id ? updatedCharacter : char
        );
        this.state.setCharacters(updatedCharacters);
        this.showUpdateForm = false;
      });
  }

  onChangeImg() {
    const htmlElement: HTMLInputElement = this.imgUrl.nativeElement;
    const file = htmlElement.files![0];
    this.updateForm.patchValue({ imgUrl: file });
  }
}
