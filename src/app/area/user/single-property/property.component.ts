import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PropertyModel } from 'src/app/models/property.model';
import { ListingService } from 'src/app/services/user/listing.service';
import { MailboxUserService } from 'src/app/services/user/mailbox.service';
import { NgImageSliderComponent, NgImageSliderModule } from 'ng-image-slider';
import { PropertyService } from 'src/app/services/property.service';
import { PublicService } from 'src/app/services/publicService.service';
import { ImageModel } from 'src/app/models/image.model';
import { MailboxModel } from 'src/app/models/mailbox.model';

declare var alertFunction: any
@Component({
  templateUrl: './property.component.html'
})
export class PropertyComponent implements OnInit {


  propertyId: number
  property: PropertyModel
  popularpost: PropertyModel[]
  formContact: FormGroup
  imagesList: ImageModel[]
  imageObject : Array<object> = []
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private listingService: ListingService,
    private mailboxService: MailboxUserService,
    private propertyService: PropertyService,
    private publicService: PublicService,


  ) {
    this.loadScripts();
    this.loadStyle();
  }

  get Email() {
    return this.formContact.get('email')
  }
  get Phone() {
    return this.formContact.get('phone')
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.propertyId = Number.parseInt(params.get('propertyId'));
      console.log("propertyId : " + this.propertyId);
    })

    this.getProperty();

    this.getGallery(); 
    this.formContact = this.formBuilder.group({
      fullName: '',
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      phone: ['', [Validators.required, Validators.pattern("^((\\+84-?)|0)?[0-9]{10}$")]],
      message: ''
    })
  }
  // Method to dynamically load JavaScript
  loadScripts() {

    // This array contains all the files/CDNs
    const dynamicScripts = [
      '../../../../assets/user/js/jquery.start.js',
      '../../../assets/user/js/sweetalert.min.js'

    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      document.body.appendChild(node);
    }
  }
  loadStyle() {
    const dynamicStyles = [
      '../../../assets/user/css/style-starter.css',
      '../../../assets/user/css/sweetalert.css',

    ];
  }
  // send Email
  send() {
    var mailbox: MailboxModel = this.formContact.value;
    mailbox.propertyId = this.propertyId;
    mailbox.time = new Date();
    mailbox.isRead = false
    this.mailboxService.addMailbox(mailbox).then(
      res => {
        if (res == true) {
          alertFunction.success("We will contact you as soon as possible.");
        }
        else {
          alertFunction.error("Maybe something went wrong .Please try again !");
        }

      },
      err => {
        console.log(err)
      }
    )

  }

  getProperty() {
    this.listingService.propertyDetail(this.propertyId).then(
      res => {
        this.property = res;
        res.images.forEach(image => {
          this.imageObject.push({
            image: this.getUrlImage(image.name) , 
            thumbImage : this.getUrlImage(image.name) 
          })
        });
        this.propertyService.getPopularPost(this.property.memberId).then(
          res => {
            this.popularpost = res
          },
          err => {
            console.log(err)
          });
      },
      err => {
        console.log(err)
      });
  }

  goDetails(propertyId: number){
    this.imagesList = [];
    this.imageObject = [];
    this.listingService.getGallery(propertyId).then(
      res => {
        this.imagesList = res;
        console.table(this.imagesList)
      },
      err => {
        console.log(err)
      });
    this.listingService.propertyDetail(propertyId).then(
      res => {
        this.property = res;
        res.images.forEach(image => {
          this.imageObject.push({
            image: this.getUrlImage(image.name) , 
            thumbImage : this.getUrlImage(image.name) 
          })
        });
        this.propertyService.getPopularPost(this.property.memberId).then(
          res => {
            this.popularpost = res
          },
          err => {
            console.log(err)
          });
      },
      err => {
        console.log(err)
      });
  }

  getGallery() {
    this.listingService.getGallery(this.propertyId).then(
      res => {
        this.imagesList = res;
        console.table(this.imagesList)
      },
      err => {
        console.log(err)
      });
  }

  getUrlImage(imageName: string) {
    return this.publicService.getUrlImage("property", imageName);
  }
  readMoreFunc(message: string) {
    if(message.length > 25) {
      return message.substr(0, 25) + '...';
    }
    else return message
  }

}