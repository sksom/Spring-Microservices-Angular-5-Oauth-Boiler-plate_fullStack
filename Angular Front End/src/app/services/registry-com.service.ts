import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RegistryComService {

  private registryPathURL = 'https://localhost:8443/registry/';

  private serverURL = 'https://localhost:8443/';

  constructor(private http: HttpClient) {
  }


  getItems() {
    return this.http.get(this.serverURL + 'item', {withCredentials: true});
  }

  createRegistry(registryName: string, itemIds: number[]) {
    return this.http.post(this.registryPathURL + 'create/' + registryName, itemIds, {withCredentials: true});
  }

  // getAllRegistry(ids: number[]) {
  //   return this.http.post(this.serverURL + 'registry/create', ids, {withCredentials: true});
  // }

  addItemsToRegistry(registryId: number, itemList: number[]) {
    return this.http.post(this.registryPathURL + 'add/' + registryId, itemList, {withCredentials: true});
  }

  getMyRegistries(userId: number) {
    return this.http.get(this.registryPathURL + 'user/' + userId, {withCredentials: true});
  }

  removeItemsFromRegistry(registryId: number, itemList: number[]) {
    return this.http.post(this.registryPathURL + 'delete/' + registryId, itemList, {withCredentials: true});
  }

  shareToUsers(registryId: number, selectedUserList: number[]) {
    return this.http.post(this.registryPathURL + registryId + '/sharespecific', selectedUserList, {withCredentials: true});
  }

  shareToPublic(registryId: number) {
    return this.http.post(this.registryPathURL + registryId + '/sharepublic', null, {withCredentials: true});
  }
}
