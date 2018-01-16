import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SharedRegistryComService {
  private registryPathURL = 'https://localhost:8443/registry/';

  private serverURL = 'https://localhost:8443/';

  constructor(private http: HttpClient) {
  }


  getItems() {
    return this.http.get(this.serverURL + 'item', {withCredentials: true});
  }

  // getAllRegistry(ids: number[]) {
  //   return this.http.post(this.serverURL + 'registry/create', ids, {withCredentials: true});
  // }

  getMySharedRegistries(userId: number) {
    return this.http.get(this.registryPathURL + 'sharedto' , {withCredentials: true});
  }


  selfAssignItem(registryId: number, itemId: number, userId: number)
  {
    return this.http.post(this.registryPathURL + registryId + '/'+itemId+ '/'+userId, null, {withCredentials: true});
  }

}
