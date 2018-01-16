import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SharedRegistriesComponent} from './shared-registries.component';

describe('SharedRegistriesComponent', () => {
  let component: SharedRegistriesComponent;
  let fixture: ComponentFixture<SharedRegistriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedRegistriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedRegistriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
