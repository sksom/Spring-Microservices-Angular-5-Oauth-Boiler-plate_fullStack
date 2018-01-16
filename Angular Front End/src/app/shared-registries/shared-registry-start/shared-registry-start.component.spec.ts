import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SharedRegistryStartComponent} from './shared-registry-start.component';

describe('SharedRegistryStartComponent', () => {
  let component: SharedRegistryStartComponent;
  let fixture: ComponentFixture<SharedRegistryStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedRegistryStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedRegistryStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
