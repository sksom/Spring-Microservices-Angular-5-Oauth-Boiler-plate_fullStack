import {Component, OnInit} from '@angular/core';
import {RegistryService} from './registry.service';

@Component({
  selector: 'app-registries',
  templateUrl: './registries.component.html',
  styleUrls: ['./registries.component.css']
})
export class RegistriesComponent implements OnInit {

  constructor(private registryService: RegistryService) {
  }

  ngOnInit() {
    this.registryService.getMyRegistries();
  }

}
