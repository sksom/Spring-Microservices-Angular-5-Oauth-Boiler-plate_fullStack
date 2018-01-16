import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {UserComService} from '../services/user-com.service';
import {RegistryComService} from '../services/registry-com.service';
import {SharedRegistryComService} from '../services/shared-registry-com.service';
import {Subject} from 'rxjs/Subject';
import {AlertService} from '../services/alert.service';
import {Registry} from '../model/registry';
import {Router} from '@angular/router';
import {User} from '../model/user';

@Injectable()
export class SharedRegistryService {
  registryListChanged = new Subject<Registry[]>();
  registryList: Registry[];
  userListChanged = new Subject<User[]>();
  userList: User[];


  constructor(private authService: AuthService, private registryComService: RegistryComService,
              private alertService: AlertService, private router: Router, private userComService: UserComService, private sharedRegistryComService:SharedRegistryComService) {
  }

  getMySharedRegistries() {
    this.sharedRegistryComService.getMySharedRegistries(this.authService.user.userId).subscribe((registryList: Registry[]) => {
      this.registryList = registryList;
      this.registryListChanged.next(registryList);
      if (registryList.length === 0) {
        this.alertService.info('No registries shared to you!');
      }
    }, error => {
      console.log(error);
    });
  }

  assignItem(registryId: number, itemId: number, userId: number) {
    this.sharedRegistryComService.selfAssignItem(registryId,itemId,userId).subscribe((registry: Registry) => {
        this.alertService.success('Successfully assigned the item to you !');
      },
      error => {
        console.log(error);
        this.alertService.error('Unable to assign item, please try again!');
      });
  }


  getRegistryByID(registryId: number) {
    for (const registry of  this.registryList) {
      if (registry.registryId === registryId) {
        return registry;
      }
    }
  }

  setRegistry(newRegistry: Registry) {
    const registryIndex = this.registryList.findIndex(registry => registry.registryId === newRegistry.registryId);
    this.registryList[registryIndex] = newRegistry;
    this.registryListChanged.next(this.registryList);
  }

}
