import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SharedRegistryListComponent} from './shared-registry-list.component';

describe('SharedRegistryListComponent', () => {
  let component: SharedRegistryListComponent;
  let fixture: ComponentFixture<SharedRegistryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedRegistryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedRegistryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
