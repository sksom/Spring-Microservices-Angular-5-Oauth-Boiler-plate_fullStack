import {Component, OnInit} from '@angular/core';
import {Registry} from '../../model/registry';
import {Subscription} from 'rxjs/Subscription';
import {RegistryService} from '../registry.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registry-list',
  templateUrl: './registry-list.component.html',
  styleUrls: ['./registry-list.component.css']
})
export class RegistryListComponent implements OnInit {

  registryListChangedSubs = Subscription;
  registryList: Registry[];

  constructor(private registryService: RegistryService, private router: Router) {
  }

  ngOnInit() {
    this.registryList = this.registryService.registryList;
    this.registryService.registryListChanged.subscribe((registryList: Registry[]) => {
      this.registryList = registryList;
    }, error => {
      console.log(error);
    });
  }

}
