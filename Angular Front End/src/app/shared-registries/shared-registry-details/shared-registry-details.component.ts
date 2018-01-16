import {Component, OnInit} from '@angular/core';
import {RegistryDetailsService} from '../../registries/registry-details/registry-details.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Item} from '../../model/item';
import {RegistryService} from '../../registries/registry.service';
import {Registry} from '../../model/registry';
import {SharedRegistryComService} from '../../services/shared-registry-com.service';
import {SharedRegistryService} from '../shared-registry.service';
import {SharedRegistryDetailsService} from './shared-registry-details.service';

@Component({
  selector: 'app-shared-registry-details',
  templateUrl: './shared-registry-details.component.html',
  styleUrls: ['./shared-registry-details.component.css']
})
export class SharedRegistryDetailsComponent implements OnInit {
  registry: Registry;
  id: number;
  itemList: Item[] = new Array();

  constructor(private route: ActivatedRoute, private router: Router, private registryService: RegistryService, private sharedRegistryComService:SharedRegistryComService,private sharedRegistryService:SharedRegistryService, private sharedRegistryDetailsService:SharedRegistryDetailsService,
              private registryDetailService: RegistryDetailsService) {
  }

  ngOnInit() {
    this.sharedRegistryDetailsService.registryChangedSub.subscribe((registry: Registry) => {
      this.registry = registry;
    });
    this.route.params.subscribe(
      (params: Params) => {
        if (+params['id'] !== undefined) {
          this.id = +params['id'];
          this.registry = this.sharedRegistryService.getRegistryByID(this.id);
          this.sharedRegistryDetailsService.registryChangedSub.next(this.registry);
          this.sharedRegistryDetailsService.registry = this.registry;
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
