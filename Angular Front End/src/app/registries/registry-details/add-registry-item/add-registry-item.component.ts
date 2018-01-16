import {Component, OnInit} from '@angular/core';
import {AlertService} from '../../../services/alert.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RegistryDetailsService} from '../registry-details.service';
import {Registry} from '../../../model/registry';

@Component({
  selector: 'app-add-registry-item',
  templateUrl: './add-registry-item.component.html',
  styleUrls: ['./add-registry-item.component.css']
})
export class AddRegistryItemComponent implements OnInit {

  registryId;

  selectedItemList: number[] = [];


  constructor(private registryDetailsService: RegistryDetailsService, private alertService: AlertService,
              private router: Router, private route: ActivatedRoute, private registryDetailService: RegistryDetailsService) {
  }

  onSubmit() {
    this.registryDetailsService.addItemsToRegistry(this.registryId, this.selectedItemList);
  }

  ngOnInit() {
    this.registryDetailService.registryChangedSub.subscribe((registry: Registry) => {
      if (registry !== undefined) {
        this.registryId = registry.registryId;
      }
    });
    this.registryDetailService.selectedItemListChanged.subscribe((selectedItemList: number[]) => {
      this.selectedItemList = selectedItemList;
    });
    this.route.params.subscribe(
      (params: Params) => {
        if (+params['id'] !== undefined) {
          this.registryId = +params['id'];
          this.registryDetailService.registryIdChanged.next(this.registryId);
        }
      }
    );
  }
}
