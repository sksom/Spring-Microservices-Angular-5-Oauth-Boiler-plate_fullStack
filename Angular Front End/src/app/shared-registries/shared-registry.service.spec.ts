import {inject, TestBed} from '@angular/core/testing';

import {SharedRegistryService} from './shared-registry.service';

describe('SharedRegistryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedRegistryService]
    });
  });

  it('should be created', inject([SharedRegistryService], (service: SharedRegistryService) => {
    expect(service).toBeTruthy();
  }));
});
