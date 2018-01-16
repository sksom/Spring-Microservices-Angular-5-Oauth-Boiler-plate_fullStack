import {Component, Input, OnChanges} from '@angular/core';
import {Registry} from '../../../model/registry';
import {SharedRegistryDetailsService} from '../../shared-registry-details/shared-registry-details.service';


@Component({
  selector: 'app-shared-registry',
  templateUrl: './shared-registry.component.html',
  styleUrls: ['./shared-registry.component.css']
})
export class SharedRegistryComponent implements OnChanges {

  @Input() registry: Registry;
  @Input() id: number;


  constructor(private sharedRegistryDetailService: SharedRegistryDetailsService) {
  }

  ngOnChanges() {
    this.sharedRegistryDetailService.registryIdChanged.next(this.registry.registryId);
  }

}
