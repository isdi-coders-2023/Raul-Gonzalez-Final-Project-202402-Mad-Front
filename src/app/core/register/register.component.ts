import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { RepoUsersService } from '../../service/users.repo.service';
import { Router } from '@angular/router';
import { StateService } from '../../service/state.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section>
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <h2>Signup</h2>
        <div class="form-control">
          <label
            >Email
            <input
              id="email"
              type="text"
              formControlName="email"
              placeholder="Insert your email"
          /></label>
        </div>
        <div class="form-control">
          <label
            >Password
            <input
              id="password"
              type="password"
              formControlName="password"
              placeholder="Insert you password"
          /></label>
        </div>
        <div class="form-control">
          <label
            >User Name
            <input
              id="username"
              type="text"
              formControlName="userName"
              placeholder="Insert you user name"
          /></label>
        </div>
        <button type="submit" [disabled]="registerForm.invalid">Signup</button>
      </form>
    </section>
  `,
  styles: `
    section {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
    form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    border: 3px solid white;
    color: white;
    height: 60vh;
    width: 80vw;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.3)
    );
    border-radius: 10px;
    }`,
})
export default class RegisterComponent {
  fb = inject(FormBuilder);
  repo = inject(RepoUsersService);
  router = inject(Router);
  state = inject(StateService);
  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required),
  });

  constructor() {}

  onSubmit() {
    const userData = this.registerForm.value;
    return this.repo.create(userData).subscribe(() => {
      this.state.setLoginState('logged');
    });
  }
}
