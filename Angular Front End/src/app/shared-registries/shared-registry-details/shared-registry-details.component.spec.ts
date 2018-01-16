import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SharedRegistryDetailsComponent} from './shared-registry-details.component';

describe('SharedRegistryDetailsComponent', () => {
  let component: SharedRegistryDetailsComponent;
  let fixture: ComponentFixture<SharedRegistryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedRegistryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedRegistryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
