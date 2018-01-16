import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert.service';
import {Item} from '../../model/item';
import {ItemComService} from '../../services/item-com.service';

@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.css']
})
export class AddNewItemComponent implements OnInit {

  newItem: Item = new Item();
  itemAdded = false;


  constructor(private itemComService: ItemComService, private alertService: AlertService, private router: Router) {
  }

  onSubmit() {
    this.itemComService.addItem(this.newItem).subscribe(
      res => {
        this.router.navigate(['/admin/addNewItem']);
        this.alertService.success('Item added Successfully! ');
        this.newItem = new Item();
      },
      error => {
        console.log(error);
        this.alertService.error('Unable to add Item!');

      }
    );
  }

  ngOnInit() {
    this.itemAdded = false;
  }
}


