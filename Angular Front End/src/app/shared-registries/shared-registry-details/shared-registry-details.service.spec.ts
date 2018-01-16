import {inject, TestBed} from '@angular/core/testing';

import {SharedRegistryDetailsService} from './shared-registry-details.service';

describe('SharedRegistryDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedRegistryDetailsService]
    });
  });

  it('should be created', inject([SharedRegistryDetailsService], (service: SharedRegistryDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
