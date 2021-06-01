import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ImageModel } from 'src/app/models/image.model';
import { MailboxModel } from 'src/app/models/mailbox.model';
import { NewCategoryModel } from 'src/app/models/newcategory.model';
import { PropertyModel } from 'src/app/models/property.model';
import { PublicService } from 'src/app/services/publicService.service';
import { MailboxService } from 'src/app/services/user/mailbox.service';
import { NewsService } from 'src/app/services/user/news.service';
import { NewsPropertyService } from 'src/app/services/user/newsproperty.service';

declare var alertFunction: any;

@Component({
  templateUrl: './newsproperty.component.html'
})
export class NewsPropertyComponent implements OnInit {

  newPropertyId: NewCategoryModel;
  propertyNew: PropertyModel[];
  memberId: number;
  galleryNews: ImageModel[];
  formContact : FormGroup ;
  constructor(
    private activatedRoute: ActivatedRoute,
    private newPropertyService: NewsPropertyService,
    private publicService: PublicService,
    private formBuilder: FormBuilder,
    private mailboxService : MailboxService
  ) { 
    this.loadScripts();
  }

  get Phone(){
    return this.formContact.get('phone')
  }

  ngOnInit(): void {
    this.formContact = this.formBuilder.group({
      fullName : '', 
      phone : ['', [Validators.required, Validators.pattern("^((\\+84-?)|0)?[0-9]{10}$")]] ,
      message : '' 
    })

    this.activatedRoute.paramMap.subscribe(params => {
      this.memberId = Number.parseInt(params.get('Id'));
    })

    this.newPropertyService.loadPropertyId(this.memberId).then(
      res => {
        this.newPropertyId = res;
        this.getGalleryNews(this.newPropertyId.newsId);
      },
      err => {
        console.log(err)
      }
    )

    this.newPropertyService.getAllProperty(this.memberId).then(
      res => {
        this.propertyNew = res;
      },
      err => {
        console.log(err)
      }
    )
  }

  getGalleryNews(newsId: number) {
    this.newPropertyService.getGalleryNews(newsId).then(
      res => {
        this.galleryNews = res;
      },
      err => {
        alertFunction.error("This query is cancel cause cant get news gallery");
      }
    )
  }
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

  // getUrlImage(imageName:string){
  //   return this.publicService.getUrlImage("news", imageName);
  // }

  getUrlImage(imageName: string, folderName: string) {
    return this.publicService.getUrlImage(folderName, imageName);
  }

    // Method to dynamically load JavaScript
    loadScripts() {

      // This array contains all the files/CDNs
      const dynamicScripts = [
        '../../../../assets/user/js/jquery-3.3.1.min.js',
        '../../../../assets/user/js/jquery.waypoints.min.js',
        '../../../../assets/user/js/owl.carousel.js',
        '../../../../assets/user/js/jquery.magnific-popup.min.js',
  
      ];
      for (let i = 0; i < dynamicScripts.length; i++) {
        const node = document.createElement('script');
        node.src = dynamicScripts[i];
        node.type = 'text/javascript';
        node.async = false;
        document.body.appendChild(node);
      }
    }

}