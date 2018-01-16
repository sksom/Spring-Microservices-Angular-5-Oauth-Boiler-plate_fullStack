import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SharedRegistryItemComponent} from './shared-registry-item.component';

describe('SharedRegistryItemComponent', () => {
  let component: SharedRegistryItemComponent;
  let fixture: ComponentFixture<SharedRegistryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedRegistryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedRegistryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
