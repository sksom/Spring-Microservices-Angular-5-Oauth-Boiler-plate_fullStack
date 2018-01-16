import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {User} from '../../model/user';
import {RegistryService} from '../registry.service';

@Component({
  selector: 'app-registry-share',
  templateUrl: './registry-share.component.html',
  styleUrls: ['./registry-share.component.css']
})
export class RegistryShareComponent implements OnInit {

  registryId: number;

  sharePublic = true;

  userList: User[];

  selectedUserList: number[] = new Array();

  constructor(private route: ActivatedRoute, private registryService: RegistryService) {
  }

  ngOnInit() {
    this.registryService.getAllUsers();
    this.route.params.subscribe(
      (params: Params) => {
        if (+params['id'] !== undefined) {
          this.registryId = +params['id'];
        }
      }
    );
    this.registryService.userListChanged.subscribe((users: User[]) => {
      this.userList = users;
    });
  }

  addToSelectedUserList(checked: boolean, userId) {
    if (checked) {
      this.selectedUserList.push(userId);
    } else {
      this.selectedUserList.splice(this.selectedUserList.indexOf(userId), 1);
    }
  }

  shareToPublic() {
    this.registryService.shareToPublic(this.registryId);
  }

  shareToUsers() {
    this.registryService.shareToUsers(this.registryId, this.selectedUserList);
  }
}
