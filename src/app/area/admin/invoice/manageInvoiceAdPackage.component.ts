import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Invoice } from 'src/app/shared/invoice.model';
import { SettingModel } from 'src/app/shared/setting.model';

@Component({
  templateUrl: './manageInvoiceAdPackage.component.html'
})
export class AdminManageInvoiceAdPackageComponent implements OnInit {
  invoices : Invoice[] 
  invoiceDetail : Invoice 
  keyword : string 
  count = 0 

  // Pagination 
  setting : SettingModel;

  isFilter = false;

  NoNum: number = 10;

  currentPage: number = 0;

  listingLength: number = 0;

  listingLengthArray = Array<string>();

  listingPerPage: number = 10;

  listingPer: number = 0;

  allNewsLength: number = 0;
  constructor(
    private invoiceService : InvoiceService 
  ) {
    this.loadScripts();
  }
  ngOnInit(): void {
    this.loadData() ;
  }

  // Method to dynamically load JavaScript
  loadScripts() {

    // This array contains all the files/CDNs
    const dynamicScripts = [
      '../../../../assets/js/modernizr.min.js',
      '../../../../assets/js/jquery.min.js',
      '../../../../assets/js/moment.min.js',

      '../../../../assets/js/popper.min.js',
      '../../../../assets/js/bootstrap.min.js',

      '../../../../assets/js/detect.js',
      '../../../../assets/js/jquery.blockUI.js',
      '../../../../assets/js/jquery.nicescroll.js',

      '../../../../assets/js/jquery.dataTable.js',
      '../../../../assets/js/jquery.goToTop.js',
      '../../../../assets/plugins/datatables/datatables.min.js',

      '../../../../assets/plugins/waypoints/lib/jquery.waypoints.min.js',

      '../../../../assets/data/data_datatables.js',

      '../../../../assets/plugins/jquery.filer/js/jquery.filer.min.js',
      '../../../../assets/plugins/jquery.filer/js/temp.js',
      '../../../../assets/plugins/sweetalert/sweetalert.min.js',
      '../../../../assets/js/jquery.sweetalert.js'

    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      document.body.appendChild(node);
    }
  }
  loadData() {
    this.invoiceService.getAllInvoiceCount().subscribe( res => {
      console.log('res : ' + res) 
      //this.listing.length = res;
      this.listingLength = res;
      this.setPagination();
      this.getAllInvoice(1);
    })
  }
  getAllInvoice(page : number) {
    this.isFilter = false; 
    this.invoiceService.getAllInvoice(page).subscribe( res => {     
      this.invoices = res 
      this.invoiceDetail = this.invoices[0] ;
      this.isFilter = false
    })
  }
  getInvoiceDetail(invoice : Invoice) {
    this.invoiceDetail = invoice ; 
  }
  searchInvoice() {
    this.keyword = (<HTMLInputElement>document.getElementById('keywordInput')).value  as any as string
    if ( this.keyword == '') {
      this.keyword = 'all'
    }
    console.log('key : ' + this.keyword) ; 
    if( this.keyword == 'all' ) {
      this.invoiceService.getAllInvoiceCount().subscribe( res => {
        console.log('res : ' + res) 
        //this.listing.length = res;
        this.listingLength = res;
        this.setPagination();
        this.getAllInvoice(1);
      })
    }
    else {
      this.invoiceService.searchInvoiceCount(this.keyword).subscribe( res => {
        console.log('res : ' + res) 
        //this.listing.length = res;
        this.listingLength = res;
        this.setPagination();
        this.invoiceService.searchInvoice(this.keyword , 1).subscribe( res => {
          this.invoices = res 
          this.invoiceDetail = this.invoices[0] ;
          this.isFilter = true ;           
        })
      })
  }
}
  minusPage() {
    this.currentPage--;
    if (!this.isFilter) {
      this.invoiceService.getAllInvoice(this.currentPage).subscribe( res => {     
      this.invoices = res 
      this.invoiceDetail = this.invoices[0] ;
    })
    } else {
      this.invoiceService.searchInvoice(this.keyword , this.currentPage).subscribe(res => {
        this.invoices = res 
        this.invoiceDetail = this.invoices[0] ;
        })
    }
  }

  plusPage() {
    this.currentPage++;
    if (!this.isFilter) {
      this.invoiceService.getAllInvoice(this.currentPage).subscribe( res => {     
      this.invoices = res 
      this.invoiceDetail = this.invoices[0] ;
    })
    } else {
      this.invoiceService.searchInvoice(this.keyword , this.currentPage).subscribe(res => {
        this.invoices = res 
        this.invoiceDetail = this.invoices[0] ;
        })
    }
  }

  searchBtn() {
    this.isFilter = true;
    // this.sortFilterNews();
    // this.filterNewsPerPage(1);
  }

  executeNewsPerPage(page: number) {
    this.currentPage = page;
    if (!this.isFilter) {
      this.invoiceService.getAllInvoice(this.currentPage).subscribe( res => {     
      this.invoices = res 
      this.invoiceDetail = this.invoices[0] ;
    })
    } else {
      this.invoiceService.searchInvoice(this.keyword , this.currentPage).subscribe(res => {
        this.invoices = res 
        this.invoiceDetail = this.invoices[0] ;
        })
    }
  }
  setPagination() {    
    this.listingPer = Math.ceil(this.listingLength / this.listingPerPage);
    console.log( "listingPer : " + this.listingPer);
    this.listingLengthArray = new Array(this.listingPer);
    this.currentPage = 1;
  }
}
