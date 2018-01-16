import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../../../model/item';
import {RegistryDetailsService} from '../../../../registries/registry-details/registry-details.service';
import {ActivatedRoute, Params} from '@angular/router';
import {SharedRegistryDetailsService} from '../../shared-registry-details.service';
import {UserComService} from '../../../../services/user-com.service';
import {AuthService} from '../../../../auth/auth.service';

@Component({
  selector: 'app-shared-registry-item',
  templateUrl: './shared-registry-item.component.html',
  styleUrls: ['./shared-registry-item.component.css']
})
export class SharedRegistryItemComponent implements OnInit {
  @Input() item: Item;
  @Input() itemId: number;
  registryId: number;

  constructor(private authService: AuthService,private route: ActivatedRoute, private registryDetailService: RegistryDetailsService,private sharedRegistryDetailsService:SharedRegistryDetailsService, private userComService:UserComService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (+params['id'] !== undefined) {
          this.registryId = +params['id'];
        }
      }
    );
  }

  onSelect(item: Item) {

  }

  selfAssign(item: Item) {
    this.sharedRegistryDetailsService.assignItemsFromSharedRegistry(this.registryId, item.itemId, this.authService.user.userId);
  }


}
