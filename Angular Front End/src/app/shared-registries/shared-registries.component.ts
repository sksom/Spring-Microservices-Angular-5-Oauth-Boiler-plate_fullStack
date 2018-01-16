import {Component, OnInit} from '@angular/core';
import {SharedRegistryService} from './shared-registry.service';

@Component({
  selector: 'app-shared-registries',
  templateUrl: './shared-registries.component.html',
  styleUrls: ['./shared-registries.component.css']
})
export class SharedRegistriesComponent implements OnInit {

  constructor(private sharedRegistryService:SharedRegistryService) { }

  ngOnInit() {
    this.sharedRegistryService.getMySharedRegistries();
  }

}
