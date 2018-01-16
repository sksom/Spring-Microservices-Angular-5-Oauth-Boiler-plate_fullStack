import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SharedRegistryComponent} from './shared-registry.component';

describe('SharedRegistryComponent', () => {
  let component: SharedRegistryComponent;
  let fixture: ComponentFixture<SharedRegistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedRegistryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
