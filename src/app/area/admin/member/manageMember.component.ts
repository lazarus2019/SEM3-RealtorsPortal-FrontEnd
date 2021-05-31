import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';
import { MailRequest } from '../../../shared/mailrequest.model';
import { Member } from '../../../shared/member.model';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Role } from '../../../shared/role.model';
import { RoleService } from 'src/app/services/role.service';
import Swal from 'sweetalert2';
import { AccountService } from 'src/app/services/account.service';
declare var alertFunction: any;

@Component({
  templateUrl: './manageMember.component.html'
})
export class AdminManageMemberComponent implements OnInit {

  constructor(
    private memberService: MemberService, 
    private formBuilder: FormBuilder, 
    private roleService: RoleService,
    private accountService: AccountService 
    ) {
    this.loadScripts();
  }

  // Pagination 
  isFilter = false;

  NoNum: number = 10;

  currentPage: number = 0;

  memberLength: number = 0;

  memberLengthArray = Array<string>();

  memberPerPage: number = 10;

  memberPer: number = 0;

  members: Member[] = [];

  roles: Role[] = [];

  mailRequest: MailRequest;

  emailFormGroup: FormGroup;

  searchFormGroup: FormGroup;

  member: Member;

  ngOnInit(): void {
    //get member
    this.loadData();

    //get role
    this.roleService.getAllRole().subscribe((roles) => {
      this.roles = roles;
    });

    //get emailRequest to sendMail
    this.emailFormGroup = this.formBuilder.group({
      email: '',
      subject: '',
      content: ''
    });

    //get member to search
    this.searchFormGroup = this.formBuilder.group({
      fullName: new FormControl('', [Validators.required]),
      roleId: new FormControl('all', [Validators.required]),
      status: new FormControl('all', [Validators.required])
    });
  } 

  loadData() {
    this.memberService.getAllMember().subscribe((result) => {
      this.members.length = result;
      this.setPagination();
      this.getAllMemberPage(1);
    });
  }

  
  minusPage() {
    this.currentPage--;
    if(!this.isFilter){
      this.getAllMemberPage(this.currentPage);
    }else{
      this.searchPage(this.currentPage);
    }
  }

  plusPage() {
    this.currentPage++;
    if(!this.isFilter){
      this.getAllMemberPage(this.currentPage);
    }else{
      this.searchPage(this.currentPage);
    }
  }

  onSearch() {
    this.isFilter = true;
    this.search();
    this.searchPage(1);
  }

  executeMemberPerPage(page:number){
    this.currentPage = page;
    if(!this.isFilter){
      this.getAllMemberPage(this.currentPage);
    }else{
      this.searchPage(this.currentPage);
    }
  }

  getAllMemberPage(page: number){
    this.memberService.getAllMemberPage(page).subscribe((adsPackages) => {
      this.members = adsPackages;
    })
  }

  setPagination() {
    this.memberLength = this.members.length;
    this.memberPer = Math.ceil(this.memberLength / this.memberPerPage);
    this.memberLengthArray = new Array(this.memberPer);
    this.currentPage = 1;
  }

  search() {
    var fullName = this.searchFormGroup.get('fullName').value;
    var roleId = this.searchFormGroup.get('roleId').value;
    var status = this.searchFormGroup.get('status').value;
    if (fullName == '') {
      fullName = '.all';
    }
    console.log("id:" + roleId);
    this.memberService.search(fullName, roleId, status).subscribe(result => {
      this.members.length = result;
      this.setPagination();
    });
  }

  searchPage(page: number) {
    var fullName = this.searchFormGroup.get('fullName').value;
    var roleId = this.searchFormGroup.get('roleId').value;
    var status = this.searchFormGroup.get('status').value;
    if (fullName == '') {
      fullName = '.all';
    }
    console.log("id:" + roleId);
    this.memberService.searchPage(fullName, roleId, status, page).subscribe(members => {
      this.members = members;
    });
  }

  blockAlert(member: Member) {
    console.log("status block: " + member.status);

    Swal.fire({
      title: 'Block member!',
      text: 'Are you sure you want to block member?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        //update action        
        this.memberService.updateStatus(member.memberId, member.status).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Block successful!',
            showConfirmButton: false,
            timer: 2000
          });
          //reload page
          this.loadData();
        });
      }
    })
  }

  unblockAlert(member: Member) {
    console.log("status unblock: " + member.status);
    Swal.fire({
      title: 'Unblock member!',
      text: 'Are you sure you want to unblock member?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        //update action        
        this.memberService.updateStatus(member.memberId, member.status).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Unblock successful!',
            showConfirmButton: false,
            timer: 2000
          });
          //reload page
          this.loadData();
        });
      }
    })
  }

  sendAlert() {
    this.mailRequest = this.emailFormGroup.value;
    this.accountService.SendEmail(this.mailRequest).subscribe(() => {
      alertFunction.success("Send Email", "Email was sent!");
    });
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
}
