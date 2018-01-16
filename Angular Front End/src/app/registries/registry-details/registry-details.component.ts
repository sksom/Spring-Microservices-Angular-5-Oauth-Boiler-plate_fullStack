import {Component, OnInit} from '@angular/core';
import {Registry} from '../../model/registry';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RegistryService} from '../registry.service';
import {RegistryDetailsService} from './registry-details.service';
import {Item} from '../../model/item';

@Component({
  selector: 'app-registry-details',
  templateUrl: './registry-details.component.html',
  styleUrls: []
})
export class RegistryDetailsComponent implements OnInit {

  registry: Registry;
  id: number;
  itemList: Item[] = new Array();

  constructor(private route: ActivatedRoute, private router: Router, private registryService: RegistryService,
              private registryDetailService: RegistryDetailsService) {
  }

  ngOnInit() {
    this.registryDetailService.registryChangedSub.subscribe((registry: Registry) => {
      this.registry = registry;
    });
    this.route.params.subscribe(
      (params: Params) => {
        if (+params['id'] !== undefined) {
          this.id = +params['id'];
          this.registry = this.registryService.getRegistryByID(this.id);
          this.registryDetailService.registryChangedSub.next(this.registry);
          this.registryDetailService.registry = this.registry;
          this.setItemList();
        }
      }
    );
  }

  setItemList() {
    this.itemList = new Array();
    for (const registryItem of this.registry.registryItemList) {
      this.itemList.push(registryItem.item);
    }
  }

}
