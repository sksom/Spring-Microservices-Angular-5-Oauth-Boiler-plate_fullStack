import {Injectable} from '@angular/core';
import {Registry} from '../model/registry';
import {Subject} from 'rxjs/Subject';
import {AuthService} from '../auth/auth.service';
import {RegistryComService} from '../services/registry-com.service';
import {AlertService} from '../services/alert.service';
import {Router} from '@angular/router';
import {User} from '../model/user';
import {UserComService} from '../services/user-com.service';

@Injectable()
export class RegistryService {

  registryListChanged = new Subject<Registry[]>();
  registryList: Registry[];
  userListChanged = new Subject<User[]>();
  userList: User[];


  constructor(private authService: AuthService, private registryComService: RegistryComService,
              private alertService: AlertService, private router: Router, private userComService: UserComService) {
  }

  getMyRegistries() {
    this.registryComService.getMyRegistries(this.authService.user.userId).subscribe((registryList: Registry[]) => {
      this.registryList = registryList;
      this.registryListChanged.next(registryList);
      if (registryList.length === 0) {
        this.alertService.info('No registries available for you, create it!');
      }
    }, error => {
      console.log(error);
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

  removeItem(newRegistry: Registry) {
    const registryIndex = this.registryList.findIndex(registry => registry.registryId === newRegistry.registryId);
    this.registryList.splice(registryIndex, 1);
    this.registryList.unshift(newRegistry);
    this.registryListChanged.next(this.registryList);
  }

  createRegistry(registryName: string, itemIds: number[]) {
    this.registryComService.createRegistry(registryName, itemIds).subscribe((registry: Registry) => {
        this.registryList.unshift(registry);
        this.registryListChanged.next(this.registryList);
        this.router.navigate(['/myRegistries/' + registry.registryId]);
        this.alertService.success('Successfully created a registry');
      },
      error => {
        console.log(error);
        this.alertService.error('Unable to create registry, please try again!');
      });
  }

  getAllUsers() {
    this.userComService.getAllUsers().subscribe((users: User[]) => {
        this.userList = users;
        this.userListChanged.next(users);
      },
      error => {
        console.log(error);
      });
  }

  shareToUsers(registryId: number, selectedUserList: number[]) {
    this.registryComService.shareToUsers(registryId, selectedUserList).subscribe((registry: Registry) => {
        this.router.navigate(['/myRegistries']);
        this.alertService.success('Successfully shared the registry to specific Users');
      },
      error => {
        console.log(error);
        this.alertService.error('Unable to share registry, please try again!');
      });
  }

  shareToPublic(registryId: number) {
    this.registryComService.shareToPublic(registryId).subscribe((registry: Registry) => {
        this.router.navigate(['/myRegistries/' + registry.registryId]);
        this.alertService.success('Successfully shared the registry to public!');
      },
      error => {
        console.log(error);
        this.alertService.error('Unable to share registry, please try again!');
      });
  }
}
