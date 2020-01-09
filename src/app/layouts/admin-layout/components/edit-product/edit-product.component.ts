import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from '../../Services/app.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryImageSize, NgxGalleryAction } from 'ngx-gallery';
import { AddFieldsComponent } from '../add-fields/add-fields.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  imagesActions: NgxGalleryAction[];

  categories = [];
  dropDowns;
  types = ['Normal', 'Featured', 'On Sale', 'Top Rated', 'New Arrivals']

  constructor(public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private appService: AppService, public dialog: MatDialog) {
    console.log(data)
    this.appService.getDropDowns().subscribe((res: any) => {
      console.log(res.data[0])
      this.dropDowns = res.data[0];
    })
  }

  editForm = new FormGroup({
    images: new FormControl(''),
    color: new FormControl(this.data.product.color),
    size: new FormControl(this.data.product.size),
    name: new FormControl(this.data.product.name),
    oldPrice: new FormControl(this.data.product.oldPrice),
    newPrice: new FormControl(this.data.product.newPrice),
    discount: new FormControl(this.data.product.discount),
    description: new FormControl(this.data.product.description),
    availibilityCount: new FormControl(this.data.product.availibilityCount),
    weight: new FormControl(this.data.product.weight),
    categoryId: new FormControl(this.data.product.categoryId._id),
    type: new FormControl(this.data.product.type)
  });

  ngOnInit() {
    this.galleryOptions = [
      {},
      {
        width: '300px',
        height: '280px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
        imageSize: NgxGalleryImageSize.Contain,
        imageActions: [{ icon: 'fa fa-trash', onClick: this.deleteImage.bind(this), titleText: 'delete this image' }],
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '200%',
        height: '300px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
    this.galleryImages = [...this.data.product.images];
  }

  deleteImage(event, index): void {
    console.log(event, index)
    console.log(this.galleryImages)
    this.galleryImages.splice(index, 1);
  }

  editProduct() {
    if (this.editForm.valid) {
      console.log(this.editForm.value)
      const formData = new FormData();
      this.editForm.get('images').value.forEach(file => {
        console.log(file)
        formData.append('images', file.file, file.file.name);
      });
      formData.append('data', JSON.stringify(this.editForm.value))
      this.appService.updateProduct(this.data._id, formData).subscribe((res: any) => {
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
