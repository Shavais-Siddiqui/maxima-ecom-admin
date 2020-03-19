import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from '../../Services/app.service';

@Component({
  selector: 'app-add-fields',
  templateUrl: './add-fields.component.html',
  styleUrls: ['./add-fields.component.scss']
})
export class AddFieldsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddFieldsComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private appService: AppService) {

  }
  categoryForm = new FormGroup({
    name: new FormControl(''),
    hasSubCategory: new FormControl(false),
    parentId: new FormControl('')
  })

  colorForm = new FormGroup({
    name: new FormControl(''),
  })

  sizeForm = new FormGroup({
    name: new FormControl(''),
  })

  ngOnInit() {
  }

  addcategory() {
    if (this.categoryForm.valid) {
      this.appService.addCategory(this.categoryForm.value).subscribe((res: any) => {
        this.closeDialog(res.data);
      })
    }
  }

  addColor() {
    if (this.colorForm.valid) {
      this.closeDialog(this.colorForm.get('name').value);
    }
  }

  addSize() {
    if (this.sizeForm.valid) {
      this.closeDialog(this.sizeForm.get('name').value);
    }
  }

  closeDialog(data) {
    this.dialogRef.close({ event: 'close', data: data });
  }
  close() {
    this.dialogRef.close();
  }

}
