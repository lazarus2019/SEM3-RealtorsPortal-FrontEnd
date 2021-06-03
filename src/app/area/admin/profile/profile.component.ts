import { MemberAPIService } from './../../../services/member/memberAPI.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MemberAPI } from 'src/app/models/member/member.model';
import { ImageService } from 'src/app/services/admin/image/imageService.service';
import { PublicService } from 'src/app/services/publicService.service';
import { ResetPassword } from 'src/app/shared/forgotPassword.model';
import { Registration } from 'src/app/shared/registration.model';
import { LoginRequest } from 'src/app/shared/login.model';

// Declare Func custom
declare var alertFunction: any;

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  urlAvatar = "";

  resultMemberAPI: MemberAPI[] = [];

  currentMember: MemberAPI = new MemberAPI;

  // Form member
  formMemberGroup: FormGroup = new FormGroup({});

  formPasswordGroup: FormGroup = new FormGroup({});

  fileUpload: FormData[] = [];

  constructor(
    // Declare form builder
    private formBuilder: FormBuilder,

    private publicService: PublicService,
    private imageService: ImageService,
    private memberAPIService: MemberAPIService
  ) {
    this.loadScripts();
  }

  ngOnInit() {


    this.formMemberGroup = this.formBuilder.group({
      memberId: 0,
      photo: new FormControl(''),
      roleId: 0,
      email: new FormControl(''),
      isShowMail: false,
      phone: ['', [Validators.required, Validators.pattern("[0-9]{8,12}")]],
      description: ['', [Validators.required, Validators.maxLength(2000), Validators.minLength(10)]],
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      password: '',
      emailPassword: ''
    });

    this.formPasswordGroup = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.pattern('^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20})$')]],
      newPassword: ['', [Validators.required, Validators.pattern('^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20})$')]],
      confirmPassword: ['', [Validators.required, Validators.pattern('^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20})$')]]
    });

    this.findUser();
  }

  findUser() {
    var userId = localStorage.getItem('userId');

    this.memberAPIService.findUser(userId).then(
      res => {
        this.resultMemberAPI = res;
        this.currentMember = this.resultMemberAPI[0];
        this.formMemberGroup.get("email").setValue(this.currentMember.email);
        this.formMemberGroup.get("description").setValue(this.currentMember.description);
        this.formMemberGroup.get("photo").setValue(this.currentMember.photo);
        this.formMemberGroup.get("fullName").setValue(this.currentMember.fullName);
        this.formMemberGroup.get("phone").setValue(this.currentMember.phone);
        this.formMemberGroup.get("isShowMail").setValue(this.currentMember.isShowMail);
        this.formMemberGroup.get("memberId").setValue(this.currentMember.memberId);
      },
      err => {
        alertFunction.error("Cant not get your profile!");
      }
    )
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.formMemberGroup.controls[controlName].hasError(errorName)
  }

  public validateControl = (controlName: string) => {
    return this.formMemberGroup.controls[controlName].invalid && this.formMemberGroup.controls[controlName].touched
  }

  public hasErrorPassword = (controlName: string, errorName: string) => {
    return this.formPasswordGroup.controls[controlName].hasError(errorName)
  }

  public validateControlPassword = (controlName: string) => {
    return this.formPasswordGroup.controls[controlName].invalid && this.formPasswordGroup.controls[controlName].touched
  }

  updateMember() {
    var member: MemberAPI = this.formMemberGroup.value;
    this.memberAPIService.updateMember(member).then(
      res => {
        if (this.fileUpload.length > 0) {
          this.uploadImage();
        }
        alertFunction.success("All your changes are saved!");
      },
      err => {
        alertFunction.error("Can't update profile!");
      }
    )
  }

  uploadImage() {
    this.imageService.uploadImage(this.currentMember.memberId.toString(), "member", this.fileUpload[0]).then(
      res => {
        // Delete old photo
        this.imageService.deleteImage(1, this.currentMember.photo, "member").then(
          res => {
            this.findUser();
          },
          err => {
            alertFunction.error("Can not delete file in database and folder wwwroot");
          }
        )
      },
      err => {
        alertFunction.error("Can't update photo, please try it again.");
      }
    )
  }

  checkPassword(newPassword: string, confirmPassword: string) {
    if (newPassword === confirmPassword) {
      return true;
    } else {
      return false;
    }
  }

  checkPasswordDB(password: string) {

  }

  changePassword() {
    // Check password
    var newPassword = this.formPasswordGroup.get("newPassword")?.value;
    var confirmPassword = this.formPasswordGroup.get("confirmPassword")?.value;
    var oldPassword = this.formPasswordGroup.get("oldPassword")?.value;

    const loginRequest: LoginRequest = {
      username: this.currentMember.username,
      password: oldPassword
    }
    this.memberAPIService.checkPasswordDB(loginRequest).then(
      res => {
        if (this.checkPassword(newPassword, confirmPassword)) {
          const resetPassword: ResetPassword = {
            password: newPassword,
            confirmPassword: confirmPassword,
            token: "",
            email: this.currentMember.email
          }
          this.memberAPIService.updatePassword(resetPassword).then(
            res => {
              alertFunction.success("Your password had changed");
            },
            err => {
              alertFunction.error("Cant update your password!");
            }
          )
        } else {
          alertFunction.error("New password and confirm password must be match!");
        }
      },
      err => {
        alertFunction.error("Your password must match the old password!");
      }
    )

  }


  getUrlImage(imageName: string) {
    return this.publicService.getUrlImage("member", imageName);
  }

  detectFiles(event: any) {
    let files = event.target.files;
    if (files) {
      let status = this.imageService.validate(files[0]);
      if (status == null) {
        let fileTemp = new FormData();
        fileTemp.append('file', files[0], files[0].name);
        this.fileUpload[0] = fileTemp;
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urlAvatar = e.target.result;
        }
        reader.readAsDataURL(files[0]);
      } else {
        alertFunction.error(status);
      }
    }
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

      '../../../../assets/js/jquery.goToTop.js',

      '../../../../assets/plugins/waypoints/lib/jquery.waypoints.min.js',


      '../../../../assets/plugins/sweetalert/sweetalert.min.js',
      '../../../../assets/js/jquery.sweetalert.js',

    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      document.body.appendChild(node);
    }
  }

  test_success_alert() {
    alertFunction.success();
  }

  test_error_alert() {
    alertFunction.error();
  }
}
