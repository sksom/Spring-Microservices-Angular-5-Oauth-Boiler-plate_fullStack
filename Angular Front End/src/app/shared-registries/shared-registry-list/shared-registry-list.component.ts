import {Component, OnInit} from '@angular/core';
import {RegistryService} from '../../registries/registry.service';
import {Subscription} from 'rxjs/Subscription';
import {Registry} from '../../model/registry';
import {Router} from '@angular/router';
import {SharedRegistryService} from '../shared-registry.service';

@Component({
  selector: 'app-shared-registry-list',
  templateUrl: './shared-registry-list.component.html',
  styleUrls: ['./shared-registry-list.component.css']
})
export class SharedRegistryListComponent implements OnInit {

  registryListChangedSubs = Subscription;
  registryList: Registry[];

  constructor(private registryService: RegistryService,private sharedRegistryService:SharedRegistryService, private router: Router) {
  }

  ngOnInit() {
    this.registryList = this.sharedRegistryService.registryList;
    this.sharedRegistryService.registryListChanged.subscribe((registryList: Registry[]) => {
      this.registryList = registryList;
    }, error => {
      console.log(error);
    });
  }

}
