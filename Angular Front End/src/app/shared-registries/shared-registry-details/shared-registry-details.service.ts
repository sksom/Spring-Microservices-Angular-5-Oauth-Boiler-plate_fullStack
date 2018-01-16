import {Injectable} from '@angular/core';
import {RegistryService} from '../../registries/registry.service';
import {RegistryComService} from '../../services/registry-com.service';
import {Subject} from 'rxjs/Subject';
import {AlertService} from '../../services/alert.service';
import {Registry} from '../../model/registry';
import {Router} from '@angular/router';
import {SharedRegistryService} from '../shared-registry.service';
import {SharedRegistryComService} from '../../services/shared-registry-com.service';

@Injectable()
export class SharedRegistryDetailsService {
  registry: Registry;
  registryIdChanged = new Subject<number>();

  registryChangedSub = new Subject<Registry>();

  selectedItemListChanged = new Subject<number[]>();

  constructor(private registryComService: RegistryComService, private registryService: RegistryService, private sharedRegistryComService:SharedRegistryComService,private sharedRegistryService:SharedRegistryService,
              private alertService: AlertService, private router: Router) {
  }

  assignItemsFromSharedRegistry(registryId: number, itemId: number, userId: number) {
    this.sharedRegistryComService.selfAssignItem(registryId, itemId, userId).subscribe((registry: Registry) => {
      this.registry = registry;
      this.registryChangedSub.next(registry);
      this.sharedRegistryService.assignItem(registryId,itemId,userId);
      this.alertService.success('Item assigned Successfully!');
    }, error => {
      this.alertService.error('Unable to assign Item !, please try again');
      console.log(error);
    });
  }
}
