import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import RegisterComponent from './register.component';
import { RepoUsersService } from '../../service/users.repo.service';
import { StateService } from '../../service/state.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockRepoUsersService: jasmine.SpyObj<RepoUsersService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockStateService: jasmine.SpyObj<StateService>;

  beforeEach(async () => {
    mockRepoUsersService = jasmine.createSpyObj('RepoUsersService', ['create']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockStateService = jasmine.createSpyObj('StateService', ['setLoginState']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RegisterComponent],
      providers: [
        { provide: RepoUsersService, useValue: mockRepoUsersService },
        { provide: Router, useValue: mockRouter },
        { provide: StateService, useValue: mockStateService },
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize registerForm with empty fields', () => {
    expect(component.registerForm.get('email')?.value).toEqual('');
    expect(component.registerForm.get('password')?.value).toEqual('');
    expect(component.registerForm.get('userName')?.value).toEqual('');
  });

  it('should call onSubmit and create user when form is submitted', () => {
    const userData = {
      email: 'test@example.com',
      password: 'test123',
      userName: 'testuser',
    };
    const createUserSpy = mockRepoUsersService.create.and.returnValue(of({}));

    component.registerForm.setValue(userData);
    component.onSubmit();

    expect(createUserSpy).toHaveBeenCalledWith(userData);
    expect(mockStateService.setLoginState).toHaveBeenCalledWith('logged');
  });
});
