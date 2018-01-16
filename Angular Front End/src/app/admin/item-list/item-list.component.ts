import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Item} from '../../model/item';
import {ItemComService} from '../../services/item-com.service';
import {AlertService} from '../../services/alert.service';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  selectedItem: Item;
  checked: boolean;
  itemList: Item[];
  allChecked: boolean;
  removeItemList: Item[] = [];

  constructor(private itemComService: ItemComService, private router: Router, private alertService: AlertService) {
  }

  onSelect(item: Item) {
    this.selectedItem = item;
    this.router.navigate(['/viewItem', this.selectedItem.itemId]);
  }

  updateRemoveItemList(checked: boolean, item: Item) {
    if (checked) {
      this.removeItemList.push(item);
    } else {
      this.removeItemList.splice(this.removeItemList.indexOf(item), 1);
    }
  }


  getItemList() {
    this.itemComService.getItemList().subscribe(
      res => {
        this.itemList = res;
      },
      error => {
        console.log(error);
      }
    );
  }

  removeSelectedItems() {
    for (const item of this.removeItemList) {
      this.itemComService.removeItem(item.itemId).subscribe(
        res => {
          this.itemList.splice(this.itemList.indexOf(item), 1);
          this.alertService.success('Removed Selected Items!');
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  removeOne(item: Item) {
    this.itemComService.removeItem(item.itemId).subscribe(
      res => {
        this.itemList.splice(this.itemList.indexOf(item), 1);
        this.alertService.success('Removed Selected Item!');
      },
      error => {
        console.log(error);
      }
    );
  }


  ngOnInit() {
    this.getItemList();
  }
}

