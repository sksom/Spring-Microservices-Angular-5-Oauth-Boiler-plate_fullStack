import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../../../model/item';
import {ActivatedRoute, Params} from '@angular/router';
import {RegistryDetailsService} from '../../registry-details.service';

@Component({
  selector: 'app-registry-item',
  templateUrl: './registry-item.component.html',
  styleUrls: ['./registry-item.component.css']
})
export class RegistryItemComponent implements OnInit {

  @Input() item: Item;
  @Input() itemId: number;
  registryId: number;
  listOfItemsDeleted: number[] = [];

  constructor(private route: ActivatedRoute, private registryDetailService: RegistryDetailsService) {
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


  removeOne(item: Item) {
    this.listOfItemsDeleted.push(item.itemId);
    this.registryDetailService.removeItemsFromRegistry(this.registryId, this.listOfItemsDeleted);
  }
}
