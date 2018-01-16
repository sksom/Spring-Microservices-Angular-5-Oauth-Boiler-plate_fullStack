import {Component, Input, OnChanges} from '@angular/core';
import {Registry} from '../../../model/registry';
import {RegistryDetailsService} from '../../registry-details/registry-details.service';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnChanges {

  @Input() registry: Registry;
  @Input() id: number;


  constructor(private registryDetailService: RegistryDetailsService) {
  }

  ngOnChanges() {
    this.registryDetailService.registryIdChanged.next(this.registry.registryId);
  }

}
