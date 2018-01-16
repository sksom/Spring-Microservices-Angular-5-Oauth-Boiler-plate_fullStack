import {User} from './user';
import {RegistryItem} from './registryitem';

export class Registry {
  public registryId: number;
  public registryItemList: RegistryItem[];
  public user: User;
  public registryName: string;
  public shared: string;
  public sharedUserList: User[];


  constructor(registryItemList: RegistryItem[], user: User, registryName: string, registryId?: number) {
    this.registryId = registryId;
    this.registryItemList = registryItemList;
    this.user = user;
    this.registryName = registryName;
  }
}
