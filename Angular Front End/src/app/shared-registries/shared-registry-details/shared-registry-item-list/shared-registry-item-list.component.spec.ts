import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SharedRegistryItemListComponent} from './shared-registry-item-list.component';

describe('SharedRegistryItemListComponent', () => {
  let component: SharedRegistryItemListComponent;
  let fixture: ComponentFixture<SharedRegistryItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedRegistryItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedRegistryItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
