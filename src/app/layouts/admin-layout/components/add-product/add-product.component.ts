import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../../Services/app.service';
import { AddFieldsComponent } from '../add-fields/add-fields.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  categories = [];
  dropDowns;
  types = ['Normal', 'Featured', 'On Sale', 'Top Rated', 'New Arrivals']
  constructor(public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private appService: AppService, public dialog: MatDialog) {
    console.log(data)
    this.appService.getDropDowns().subscribe((res: any) => {
      console.log(res.data[0])
      this.dropDowns = res.data[0];
    })
  }

  addForm = new FormGroup({
    images: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
    size: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    oldPrice: new FormControl('', Validators.required),
    newPrice: new FormControl('', Validators.required),
    discount: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    availibilityCount: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required)
  });

  ngOnInit() {
  }

  addProduct() {
    if (this.addForm.valid) {
      console.log(this.addForm.value)
      const formData = new FormData();
      this.addForm.get('images').value.forEach(file => {
        console.log(file)
        formData.append('images', file.file, file.file.name);
      });
      formData.append('data', JSON.stringify(this.addForm.value))
      this.appService.addProduct(formData).subscribe((res: any) => {
        console.log(res);
        this.closeDialog(res.data);
      })
    }
  }
  addCategory() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%'
    dialogConfig.height = '50%'

    dialogConfig.data = {
      type: 'category',
      categories: this.data.categories
    };

    let dialogRef = this.dialog.open(AddFieldsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(cat => {
      if (cat) {
        console.log('Added', cat.data)

      }
    });
  }

  addColor() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%'
    dialogConfig.height = '35%'

    dialogConfig.data = {
      type: 'color',
    };

    let dialogRef = this.dialog.open(AddFieldsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(col => {
      if (col) {
        this.dropDowns.colors.unshift(col.data);
        this.appService.updateDropDowns({ colors: this.dropDowns.colors }, this.dropDowns._id).subscribe((res: any) => {
          console.log(res)
        })
      }
    });
  }

  addSize() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%'
    dialogConfig.height = '35%'

    dialogConfig.data = {
      type: 'size',
    };

    let dialogRef = this.dialog.open(AddFieldsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(size => {
      if (size) {
        this.dropDowns.sizes.unshift(size.data);
        this.appService.updateDropDowns({ sizes: this.dropDowns.sizes }, this.dropDowns._id).subscribe((res: any) => {
          console.log(res)
        })
        console.log('Added', size.data)
      }
    });
  }

  closeDialog(data) {
    this.dialogRef.close({ event: 'close', data: data });
  }

  close() {
    this.dialogRef.close();
  }
}
