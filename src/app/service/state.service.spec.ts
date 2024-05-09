import { TestBed } from '@angular/core/testing';
import { StateService, State, LoginState } from './state.service';
import { RepoUsersService } from './users.repo.service';
import { of } from 'rxjs';
import jwtEncode from 'jwt-encode';

describe('StateService', () => {
  let service: StateService;
  let mockRepoUsersService: jasmine.SpyObj<RepoUsersService>;

  beforeEach(() => {
    const repoSpy = jasmine.createSpyObj('RepoUsersService', ['getById']);
    TestBed.configureTestingModule({
      providers: [
        StateService,
        { provide: RepoUsersService, useValue: repoSpy },
      ],
    });
    service = TestBed.inject(StateService);
    mockRepoUsersService = TestBed.inject(
      RepoUsersService
    ) as jasmine.SpyObj<RepoUsersService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setLoginState', () => {
    it('should set login state correctly', () => {
      const newState: LoginState = 'logging';
      service.setLoginState(newState);
      service.getState().subscribe((state: State) => {
        expect(state.loginState).toEqual(newState);
      });
    });
  });

  describe('setLogin', () => {
    it('should set login state to logged and set token, payload, and current user', () => {
      const payload = { id: 'mockId', exp: 1234567890 };
      const token = jwtEncode(payload, 'mockSecretKey');

      const mockUser = { id: 'mockId', name: 'John Doe' };
      spyOn(localStorage, 'setItem');

      mockRepoUsersService.getById.and.returnValue(of(mockUser));
      service.setLogin(token);

      service.getState().subscribe((state: State) => {
        expect(state.loginState).toEqual('logged');
        expect(state.token).toEqual(token);
        expect(state.currenPayload).toEqual(payload);
        expect(state.currenUser).toEqual(mockUser);
        expect(localStorage.setItem).toHaveBeenCalledWith(
          'LOTR',
          JSON.stringify({ token })
        );
      });
    });
  });

  describe('setLogout', () => {
    it('should reset state and remove token from local storage', () => {
      spyOn(localStorage, 'removeItem');
      service.setLogout();

      service.getState().subscribe((state: State) => {
        expect(state.loginState).toEqual('idle');
        expect(state.token).toBeNull();
        expect(state.currenPayload).toBeNull();
        expect(localStorage.removeItem).toHaveBeenCalledWith('LOTR');
      });
    });
  });
});