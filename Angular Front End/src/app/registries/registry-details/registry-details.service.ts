import {Injectable} from '@angular/core';
import {RegistryComService} from '../../services/registry-com.service';
import {Registry} from '../../model/registry';
import {Subject} from 'rxjs/Subject';
import {RegistryService} from '../registry.service';
import {AlertService} from '../../services/alert.service';
import {Router} from '@angular/router';


@Injectable()
export class RegistryDetailsService {

  registry: Registry;
  registryIdChanged = new Subject<number>();

  registryChangedSub = new Subject<Registry>();

  selectedItemListChanged = new Subject<number[]>();

  constructor(private registryComService: RegistryComService, private registryService: RegistryService,
              private alertService: AlertService, private router: Router) {
  }


  addItemsToRegistry(registryId: number, itemList: number[]) {
    this.registryComService.addItemsToRegistry(registryId, itemList).subscribe((registry: Registry) => {
      this.registry = registry;
      this.registryChangedSub.next(registry);
      this.registryService.setRegistry(registry);
      this.router.navigate(['/myRegistries/' + registry.registryId]);
      this.alertService.success('Items added Successfully!');
    }, error => {
      this.alertService.error('Unable to add Items!, please try again');
      console.log(error);
    });
  }

  removeItemsFromRegistry(registryId: number, itemList: number[]) {
    this.registryComService.removeItemsFromRegistry(registryId, itemList).subscribe((registry: Registry) => {
      this.registry = registry;
      this.registryChangedSub.next(registry);
      this.registryService.removeItem(registry);
      this.alertService.success('Item deleted Successfully!');
    }, error => {
      this.alertService.error('Unable to remove Item!, please try again');
      console.log(error);
    });
  }


}
