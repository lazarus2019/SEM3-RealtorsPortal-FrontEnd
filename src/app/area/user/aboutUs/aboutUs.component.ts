import { Component, OnInit } from '@angular/core';
import { MailboxModel } from 'src/app/models/mailbox.model';
import { SellerProfileModel } from 'src/app/models/sellerProfile.models';
import { SettingModel } from 'src/app/models/setting.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AboutUsService } from 'src/app/services/user/aboutus.service';
import { MailboxUserService } from 'src/app/services/user/mailbox.service';
import { ActivatedRoute } from '@angular/router';
import { PublicService } from 'src/app/services/publicService.service';
import { FAQAPI } from 'src/app/models/faqapi.model';
import { FAQUserService } from 'src/app/services/user/faqapi.service';

@Component({
  templateUrl: './aboutUs.component.html'
})
export class AboutUsComponent implements OnInit {

  formContact : FormGroup ;
  agents: SellerProfileModel[] = [];
  setting: SettingModel[] = [];
  mailbox: MailboxModel;

  rentCount:number;
  saleCount:number;
  // Declare FAQ Component
  listFAQ: FAQAPI[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private aboutUsService: AboutUsService,
    private formBuilder: FormBuilder,
    private mailboxService : MailboxUserService,
    private publicService : PublicService,
    private faqService : FAQUserService
  ) { }

  get Phone(){
    return this.formContact.get('phone')
  }
    
  ngOnInit(): void {
  
    this.aboutUsService.loadagentAU().then(
      res => {
        this.agents = res
      }, err => {
        console.log(err);
      }
    )

    this.getAllFAQ();

    this.aboutUsService.loadsetting().then(
      res => {
        this.setting = res
      }, err => {
        console.log(err);
      }
    )

    this.aboutUsService.loadSale().then(
      res => {
        this.saleCount = res
        console.log(this.saleCount);
      }, err => {
        console.log(err);
      }
    )

    this.aboutUsService.loadRent().then(
      res => {
        this.rentCount = res
        console.log(this.rentCount);
      }, err => {
        console.log(err);
      }
    )

    this.formContact = this.formBuilder.group({
      fullName : '', 
      phone : ['', [Validators.required, Validators.pattern("^((\\+84-?)|0)?[0-9]{10}$")]] ,
      message : '' 
    })
  }

  getAllFAQ() {
    this.faqService.getAllFAQ().then(
      res => {
        this.listFAQ = res;
      },
      err => {
        //alertFunction.error("Can not get all faq!");
      }
    )
  }

  // send Email
  send() {
    var mailbox: MailboxModel = this.formContact.value;
    
    this.mailboxService.addMailbox(mailbox).then(
      res => {
        if (res == true) {
          alert("Done");
        }
        else {
          alert("Failed");
        }

      },
      err => {
        console.log(err)
      }
    )
  }

  //Get Image
  getUrlImage(folderName: string, imageName: string) {
    return this.publicService.getUrlImage(folderName, imageName);
  }

}