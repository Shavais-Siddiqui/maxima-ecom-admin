import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from '../../Services/app.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryImageSize, NgxGalleryAction } from 'ngx-gallery';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  categories = [];
  dropDowns;
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
    categoryId: new FormControl(this.data.product.categoryId._id)
  });

  ngOnInit() {
    this.galleryOptions = [
      {
        width: '300px',
        height: '280px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
        imageSize: NgxGalleryImageSize.Contain,
        // imageActions: NgxGalleryAction[]
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


    this.galleryImages = this.data.product.images
    console.log(this.data.product.images)
    // this.galleryImages = [
    //   {
    //     small: "https://res.cloudinary.com/dwum3bngw/image/upload/c_scale,h_135,w_180/v1577967683/koopzettqg7ujg2q4ycs.jpg",
    //     medium: "https://res.cloudinary.com/dwum3bngw/image/upload/c_scale,h_360,w_480/v1577967683/koopzettqg7ujg2q4ycs.jpg",
    //     big: "https://res.cloudinary.com/dwum3bngw/image/upload/c_scale,h_720,w_960/v1577967683/koopzettqg7ujg2q4ycs.jpg"
    //   },
    //   {
    //     small: "https://res.cloudinary.com/dwum3bngw/image/upload/c_scale,h_135,w_180/v1577967685/zexrs58vklkokbhmpv8v.jpg",
    //     medium: "https://res.cloudinary.com/dwum3bngw/image/upload/c_scale,h_360,w_480/v1577967685/zexrs58vklkokbhmpv8v.jpg",
    //     big: "https://res.cloudinary.com/dwum3bngw/image/upload/c_scale,h_720,w_960/v1577967685/zexrs58vklkokbhmpv8v.jpg"
    //   },
    //   {
    //     small: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/3-small.jpeg',
    //     medium: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/3-medium.jpeg',
    //     big: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/3-big.jpeg'
    //   },
    //   {
    //     small: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/4-small.jpeg',
    //     medium: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/4-medium.jpeg',
    //     big: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/4-big.jpeg'
    //   },
    //   {
    //     small: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/5-small.jpeg',
    //     medium: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/5-medium.jpeg',
    //     big: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/5-big.jpeg'
    //   }      
    // ]
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
      this.appService.addProduct(formData).subscribe((res: any) => {
        console.log(res);
        this.closeDialog(res.data);
      })
    }
  }

  closeDialog(data) {
    this.dialogRef.close({ event: 'close', data: data });
  }


}
