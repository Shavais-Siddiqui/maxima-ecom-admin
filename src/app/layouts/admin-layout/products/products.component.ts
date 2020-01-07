import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { AppService } from '../Services/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddProductComponent } from '../components/add-product/add-product.component';
import { EditProductComponent } from '../components/edit-product/edit-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @ViewChild('sidenav', { static: false }) sidenav: any;
  public sidenavOpen: boolean = false;
  private sub: any;
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public counts = [12, 24, 36];
  public count: any;
  public sortings = ['Sort by Default', 'Best match', 'Lowest first', 'Highest first'];
  public sort: any;
  public products = [];
  public categories = [];
  public brands = [];
  public priceFrom: number = 750;
  public priceTo: number = 1599;
  public colors = ["#5C6BC0", "#66BB6A", "#EF5350", "#BA68C8", "#FF4081", "#9575CD", "#90CAF9", "#B2DFDB", "#DCE775", "#FFD740", "#00E676", "#FBC02D", "#FF7043", "#F5F5F5", "#000000"];
  public sizes = ["S", "M", "L", "XL", "2XL", "32", "36", "38", "46", "52", "13.3\"", "15.4\"", "17\"", "21\"", "23.4\""];
  public page: any;

  constructor(private activatedRoute: ActivatedRoute, public appService: AppService, public dialog: MatDialog, private router: Router) {
    this.appService.getProdcuts().subscribe((res: any) => {
      console.log(res)
      this.products = res.data;
    })
    this.appService.getCategories().subscribe((res: any) => {
      this.categories = res.data;
      console.log(this.categories)
    })
  }

  ngOnInit() {
    this.count = this.counts[0];
    this.sort = this.sortings[0];
    this.sub = this.activatedRoute.params.subscribe(params => {
    });
    if (window.innerWidth < 960) {
      this.sidenavOpen = false;
    };
    if (window.innerWidth < 1280) {
      this.viewCol = 33.3;
    };

    // this.getBrands();
    // this.getAllProducts();
  }


  // public getBrands(){
  //   this.brands = this.appService.getBrands();
  // }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
    (window.innerWidth < 1280) ? this.viewCol = 33.3 : this.viewCol = 25;
  }

  public changeCount(count) {
    this.count = count;
    // this.getAllProducts(); 
  }

  public changeSorting(sort) {
    this.sort = sort;
  }

  public changeViewType(viewType, viewCol) {
    this.viewType = viewType;
    this.viewCol = viewCol;
  }

  public openProductDialog(product) {
    // let dialogRef = this.dialog.open(ProductDialogComponent, {
    //     data: product,
    //     panelClass: 'product-dialog'
    // });
    // dialogRef.afterClosed().subscribe(product => {
    //   if(product){
    //     this.router.navigate(['/products', product.id, product.name]); 
    //   }
    // });
  }

  public onPageChanged(event) {
    this.page = event;
    // this.getAllProducts();
    window.scrollTo(0, 0);
  }

  public onChangeCategory(event) {
    if (event.target) {
      this.router.navigate(['/products', event.target.innerText.toLowerCase()]);
    }
  }

  public addProduct() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '85%'
    dialogConfig.height = '80%'

    dialogConfig.data = {
      categories: this.categories
    };

    let dialogRef = this.dialog.open(AddProductComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(product => {
      if (product) {
        console.log('Added 2', product.data)
        this.products.unshift(product.data)
        // this.router.navigate(['/products', product.id, product.name]);
      }
    });
  }

  editProduct(product) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '85%'
    dialogConfig.height = '80%'

    dialogConfig.data = {
      categories: this.categories,
      product: product,

    };

    let dialogRef = this.dialog.open(EditProductComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(product => {
      if (product) {
        console.log('Added 2', product.data)
        this.products.unshift(product.data)
      }
    });
  }
}
