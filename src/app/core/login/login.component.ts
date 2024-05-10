import { Component, inject } from '@angular/core';
import { RepoUsersService } from '../../service/users.repo.service';
import { StateService } from '../../service/state.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserLoginDto } from '../../models/user.data';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <section>
      <form [formGroup]="formLogin" (ngSubmit)="submit()">
        <h2>Iniciar sesión</h2>
        <div class="email">
          <label
            >Email
            <input
              id="user"
              type="text"
              formControlName="user"
              placeholder="Insert your email"
          /></label>
        </div>
        <div>
          <label
            >Password
            <input
              id="password"
              type="password"
              formControlName="password"
              placeholder="Insert you password"
          /></label>
        </div>
        <button type="submit" [disabled]="formLogin.invalid">LOGIN</button>
        No tienes cuenta? <a href="#" [routerLink]="'/register'">Regístrate</a>
      </form>
    </section>
  `,
  styles: `
  :host {
    display: flex;
    justify-content: center;
    flex: 2 0 auto;
  }

  section {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    color: white;
    height: 60vh;
    width: 80vw;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.6)
    );
    border-radius: 10px;
    }

`,
  imports: [ReactiveFormsModule, FooterComponent, RouterModule],
})
export default class LoginComponent {
  private repoUser = inject(RepoUsersService);
  private state = inject(StateService);
  private fb = inject(FormBuilder);
  router = inject(Router);
  formLogin = this.fb.group({
    user: ['', Validators.required],
    password: ['', Validators.required],
  });
  submit() {
    const { user, password } = this.formLogin.value;
    const userLogin = { password } as UserLoginDto;

    if (user!.includes('@')) {
      userLogin.email = this.formLogin.value.user as string;
    }

    this.repoUser.login(userLogin).subscribe({
      next: ({ token }) => {
        this.state.setLogin(token);
        console.log('Logged in', token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
        this.state.setLoginState('error');
      },
    });
  }
}
