import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Registry} from '../../../model/registry';
import {RegistryService} from '../../../registries/registry.service';
import {RegistryDetailsService} from '../../../registries/registry-details/registry-details.service';
import {Item} from '../../../model/item';
import {RegistryItem} from '../../../model/registryitem';
import {SharedRegistryDetailsService} from '../shared-registry-details.service';
import {SharedRegistryService} from '../../shared-registry.service';

@Component({
  selector: 'app-shared-registry-item-list',
  templateUrl: './shared-registry-item-list.component.html',
  styleUrls: ['./shared-registry-item-list.component.css']
})
export class SharedRegistryItemListComponent implements OnInit {
  @Input() registryItemList: RegistryItem[];

  @Input() registryId;

  @Input() itemList: Item[];

  constructor(private router: Router, private registryDetailService: RegistryDetailsService,private sharedRegistryDetailsService:SharedRegistryDetailsService, private registryService: RegistryService, private sharedRegistryService:SharedRegistryService) {
  }

  ngOnInit() {
    // Big Change
    this.sharedRegistryDetailsService.registryChangedSub.subscribe((registry: Registry) => {
      this.registryItemList = registry.registryItemList;
      this.setItemList();
    });
  }

  setItemList() {
    this.itemList = new Array();
    for (const registryItem of this.registryItemList) {
      if (registryItem.giftUser !== null) {
        if (registryItem.giftUser.username !== undefined && registryItem.giftUser.username !== null) {
          registryItem.item.giftUser = registryItem.giftUser.username;
        }
      } else{
        registryItem.item.giftUser = "None"
      }
      this.itemList.push(registryItem.item);
    }
  }

}
