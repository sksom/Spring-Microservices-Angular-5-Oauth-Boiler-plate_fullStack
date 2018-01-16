import {Component, OnInit} from '@angular/core';
import {Registry} from '../../model/registry';
import {User} from '../../model/user';
import {Router} from '@angular/router';
import {RegistryDetailsService} from '../registry-details/registry-details.service';
import {RegistryService} from '../registry.service';

@Component({
  selector: 'app-registry-edit',
  templateUrl: './registry-edit.component.html',
  styleUrls: ['./registry-edit.component.css']
})
export class RegistryEditComponent implements OnInit {
  user: User;
  newRegistry: Registry = new Registry([], this.user, '');
  selectedItemList: number[] = [];

  constructor(private router: Router, private registryDetailService: RegistryDetailsService, private registryService: RegistryService) {
  }

  ngOnInit() {
    this.registryDetailService.selectedItemListChanged.subscribe((selectedItemList: number[]) => {
      this.selectedItemList = selectedItemList;
    });
  }

  onSubmit() {
    this.registryService.createRegistry(this.newRegistry.registryName, this.selectedItemList);
  }
}
