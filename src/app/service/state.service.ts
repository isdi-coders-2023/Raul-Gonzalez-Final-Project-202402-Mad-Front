import { Injectable } from '@angular/core';
import { RepoUsersService } from './users.repo.service';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

export type LoginState = 'idle' | 'logging' | 'logged' | 'error';

export type Payload = {
  id: string;
} & JwtPayload;

export type State = {
  loginState: LoginState;
  token: string | null;
  currenPayload: Payload | null;
  currenUser: unknown | null;
};

const initialState: State = {
  loginState: 'idle',
  token: null,
  currenPayload: null,
  currenUser: null,
};

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private state$ = new BehaviorSubject<State>(initialState);

  constructor(private repo: RepoUsersService) {
    const tokenValid = localStorage.getItem('proyectofronted');
    if (!tokenValid) {
      return;
    }
  }

  getState(): Observable<State> {
    return this.state$.asObservable();
  }

  setLoginState(loginState: LoginState): void {
    this.state$.next({ ...this.state$.value, loginState });
  }
  setLogin(token: string) {
    const currenPayload = jwtDecode(token) as Payload;
    localStorage.setItem('LOTR', JSON.stringify({ token }));
    this.repo.getById(currenPayload.id).subscribe((user) => {
      this.state$.next({
        ...this.state$.value,
        loginState: 'logged',
        token,
        currenPayload,
        currenUser: user,
      });
    });
  }
  setLogout() {
    localStorage.removeItem('LOTR');
    this.state$.next({
      ...this.state$.value,
      loginState: 'idle',
      token: null,
      currenPayload: null,
    });
  }
}
