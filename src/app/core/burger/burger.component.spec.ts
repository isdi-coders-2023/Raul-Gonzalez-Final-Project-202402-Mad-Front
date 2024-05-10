// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import BurgerComponent from './burger.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';

// describe('BurgerComponent', () => {
//   let component: BurgerComponent;
//   let fixture: ComponentFixture<BurgerComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [BurgerComponent, HttpClientTestingModule],
//     }).compileComponents();

//     fixture = TestBed.createComponent(BurgerComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import BurgerComponent from './burger.component';
import { StateService } from '../../service/state.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('BurgerComponent', () => {
  let component: BurgerComponent;
  let fixture: ComponentFixture<BurgerComponent>;
  let stateServiceSpy: jasmine.SpyObj<StateService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let locationSpy: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    // Creamos spies para las dependencias del componente
    const stateServiceSpyObj = jasmine.createSpyObj('StateService', ['']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate', 'url']);
    const locationSpyObj = jasmine.createSpyObj('Location', ['back']);

    await TestBed.configureTestingModule({
      declarations: [BurgerComponent],
      providers: [
        { provide: StateService, useValue: stateServiceSpyObj },
        { provide: Router, useValue: routerSpyObj },
        { provide: Location, useValue: locationSpyObj },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BurgerComponent);
    component = fixture.componentInstance;

    // Obtenemos los spies de las dependencias
    stateServiceSpy = TestBed.inject(
      StateService
    ) as jasmine.SpyObj<StateService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    locationSpy = TestBed.inject(Location) as jasmine.SpyObj<Location>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "/menu" when not on "/menu"', () => {
    routerSpy.url = '/some-other-route';
    component.onClick();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/menu']);
  });

  it('should go back when on "/menu"', () => {
    routerSpy.url = '/menu';
    component.onClick();
    expect(locationSpy.back).toHaveBeenCalled();
  });
});
