import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportsService } from 'src/app/services/reports.service';
import { Invoice } from 'src/app/shared/invoice.model';
import { ReportModel } from 'src/app/shared/report.model';

declare var alertFunction: any;

@Component({
  templateUrl: './reports.component.html'
})
export class ReportComponent {

  report: ReportModel;
  invoicelist : Invoice[]
  invoiceDetail: Invoice;
  searchForm: FormGroup ;
  fromDate : string ; 
  toDate : string ; 
  durationInput : ''

  
  constructor(private reportService: ReportsService, private formBuilder: FormBuilder
  ) {

  }
  ngOnInit(): void {
    this.loadData() ; 
    this.searchForm = this.formBuilder.group({
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
      duration: new FormControl('select', [Validators.required])
    })

    this.loadScripts(); 
  }
  showData() {
    this.fromDate =  (<HTMLInputElement>document.getElementById('fromDateInput')).value  as any as string
    console.log( "From Date : " + this.fromDate )
    this.toDate =  (<HTMLInputElement>document.getElementById('toDateInput')).value  as any as string
    console.log( "To Date : " + this.fromDate ) 
  }

  invoiceDetailModal(i: Invoice) {
    this.invoiceDetail = i;
    console.log(this.invoiceDetail.invoiceId);
  }
  searchByDate() {
     this.toDate =  (<HTMLInputElement>document.getElementById('toDateInput')).value  as any as string
     this.fromDate =  (<HTMLInputElement>document.getElementById('fromDateInput')).value  as any as string
     this.reportService.getReportByDate(this.fromDate,this.toDate).subscribe( res => {
        this.report = res ; 
        this.loadScripts()
     })
     this.reportService.getPaymentByDate(this.fromDate,this.toDate).subscribe( res => {
      this.invoicelist = res ; 
      this.invoiceDetail = this.invoicelist[0];
      })
    }
   searchByDuration() {
    this.reportService.getReportByDuration(this.durationInput).subscribe( res => {
      this.report = res ; 
      this.loadScripts() 
   })
   this.reportService.getPaymentByDuration(this.durationInput).subscribe( res => {
    this.invoicelist = res ; 
    this.invoiceDetail = this.invoicelist[0];
    })
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
      '../../../../assets/plugins/counterup/jquery.counterup.min.js',
      '../../../../assets/js/jquery.counterup.js',

      '../../../../assets/plugins/jquery.filer/js/jquery.filer.min.js',
      '../../../../assets/plugins/jquery.filer/js/temp.js',
      '../../../../assets/plugins/sweetalert/sweetalert.min.js',
      '../../../../assets/js/jquery.sweetalert.js',
      '../../../../assets/plugins/datetimepicker/js/daterangepicker.js',
      '../../../../assets/js/jquery.datePicker.js',

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
    this.reportService.getReport().subscribe(res => {
      this.report = res;
    })
    this.reportService.getPayment().subscribe( res => {
      this.invoicelist = res ;
      this.invoiceDetail = this.invoicelist[0];
    })
  }
  test_success_alert() {
    alertFunction.success();
  }

  test_error_alert() {
    alertFunction.error();
  }
}
