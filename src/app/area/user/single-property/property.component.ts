import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MailboxModel } from 'src/app/models/maibox.model';
import { PropertyModel } from 'src/app/models/property.model';
import { ListingService } from 'src/app/services/user/listing.service';
import { MailboxService } from 'src/app/services/user/mailbox.service';
import { NgImageSliderModule } from 'ng-image-slider';

@Component({
  templateUrl: './property.component.html'
})
export class PropertyComponent implements OnInit {
  propertyId : number
  property : PropertyModel 
  formContact : FormGroup  
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private listingService : ListingService ,
    private mailboxService : MailboxService 

  ) {
    this.loadScripts();
  }

  get Email(){
    return this.formContact.get('email')
    }
  get Phone(){
    return this.formContact.get('phone')
    }
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.propertyId = Number.parseInt(params.get('propertyId'));
      console.log("propertyId : " + this.propertyId);
    })     
    this.listingService.propertyDetail(this.propertyId).then(
      res => { 
        this.property = res
      },
      err => {
        console.log(err)
      }
    ); 

    this.formContact = this.formBuilder.group({
      fullName : '',
      email : new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]), 
        phone : ['', [Validators.required, Validators.pattern("^((\\+84-?)|0)?[0-9]{10}$")]] ,
      message : '' 
    })
  }
  // Method to dynamically load JavaScript
  loadScripts() {

    // This array contains all the files/CDNs
    const dynamicScripts = [
      '../../../../assets/user/js/jquery.start.js',

    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      document.body.appendChild(node);
    }
  }
  // send Email
  send() {
    var mailbox : MailboxModel = this.formContact.value ;
    mailbox.propertyId = this.propertyId ;
    mailbox.time = new Date() ;
    mailbox.isRead = false 
    this.mailboxService.addMailbox(mailbox).then(
      res => {
        if( res == true) {
          alert("Done") ; 
        }
        else {
          alert("Failed") ;
        }
           
      },
      err => {
          console.log(err)
      }
  )

  }

}