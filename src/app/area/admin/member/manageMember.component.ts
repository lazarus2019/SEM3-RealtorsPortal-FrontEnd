import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';
import { MailRequest } from '../shared/mailrequest.model';
import { Member } from '../shared/member.model';
import { FormBuilder, FormGroup } from "@angular/forms";
declare var alertFunction: any;

@Component({
  templateUrl: './manageMember.component.html'
})
export class AdminManageMemberComponent implements OnInit {

  constructor(private memberService: MemberService, private formBuilder: FormBuilder) {
    this.loadScripts();
  }

  members: Member[] = [];
  mailRequest: MailRequest;
  emailFormGroup: FormGroup;

  ngOnInit(): void {
    //get member
    this.memberService.getAllMember().subscribe((members) => {
      this.members = members;
    });

    this.emailFormGroup = this.formBuilder.group({
      email: '',
      subject: '',
      content: ''
    });
  }
  sendAlert(){
    alertFunction.success();
  }

  sendEmail() {
    this.mailRequest = this.emailFormGroup.value;
    this.memberService.SendEmail(this.mailRequest).subscribe();
    console.log("subject: " + this.mailRequest.subject);
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
      '../../../../assets/js/fastclick.js',
      '../../../../assets/js/jquery.blockUI.js',
      '../../../../assets/js/jquery.nicescroll.js',

      '../../../../assets/js/jquery.dataTable.js',
      '../../../../assets/js/jquery.goToTop.js',
      '../../../../assets/js/jquery.lightBox.js',
      '../../../../assets/plugins/datatables/datatables.min.js',

      '../../../../assets/plugins/waypoints/lib/jquery.waypoints.min.js',

      '../../../../assets/data/data_datatables.js',

      '../../../../assets/data/data_charts_dashboard.js',
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

  blockAlert() {
    var title = "Block member!";
    var content = "Are you sure you want to block member?";
  }

  unblockAlert() {
    var title = "Unblock member!";
    var content = "Are you sure you want to unblock member?";
  }
}
