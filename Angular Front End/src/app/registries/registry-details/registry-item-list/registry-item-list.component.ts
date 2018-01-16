import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RegistryDetailsService} from '../registry-details.service';
import {RegistryService} from '../../registry.service';
import {Registry} from '../../../model/registry';
import {Item} from '../../../model/item';
import {RegistryItem} from '../../../model/registryitem';

@Component({
  selector: 'app-registry-item-list',
  templateUrl: './registry-item-list.component.html',
  styleUrls: ['./registry-item-list.component.css']
})
export class RegistryItemListComponent implements OnInit {

  @Input() registryItemList: RegistryItem[];

  @Input() registryId;

  @Input() itemList: Item[];

  constructor(private router: Router, private registryDetailService: RegistryDetailsService, private registryService: RegistryService) {
  }

  ngOnInit() {
    // Big Change
    this.registryDetailService.registryChangedSub.subscribe((registry: Registry) => {
      this.registryItemList = registry.registryItemList;
      this.setItemList();
    });
  }

  onAddItem() {
    this.registryDetailService.registryIdChanged.next(this.registryId);
    this.registryDetailService.registryChangedSub.next(this.registryService.getRegistryByID(this.registryId));
    this.router.navigate(['/myRegistries/addItems/' + this.registryId]);
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


  shareRegistry() {
    this.router.navigate(['/myRegistries/share/' + this.registryId]);
  }
}
