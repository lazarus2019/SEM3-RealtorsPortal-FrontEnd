import { mailboxAPI } from './../../../models/mailbox/mailbox.model';
import { MailBoxAPIService } from './../../../services/admin/mailbox/mailboxAPI.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { MemberAPI } from 'src/app/models/member/member.model';
import { MemberAPIService } from 'src/app/services/member/memberAPI.service';

// Declare custom function
declare var alertFunction: any;

@Component({
  templateUrl: './mailBox.component.html'
})
export class AdminMailBoxComponent implements OnInit {

  statusMail: string = "";

  listMailbox: mailboxAPI[] = [];

  currentMailbox: mailboxAPI = new mailboxAPI;

  unReadMailBox: number = 0;

  formSearchMailbox: FormGroup = new FormGroup({});

  resultMemberAPI: MemberAPI[] = [];

  currentMember: MemberAPI = new MemberAPI;

  roleMember: string;

  constructor(
    // Declare form builder
    private formBuilder: FormBuilder,

    private mailboxAPIService: MailBoxAPIService,
    private memberAPIService: MemberAPIService
  ) { }

  ngOnInit() {

    this.findUser();

    this.formSearchMailbox = this.formBuilder.group({
      status: "all",
      sortDate: "all"
    });

  }

  findUser() {
    var userId = localStorage.getItem('userId');
    this.roleMember = localStorage.getItem('role');
    console.log(this.roleMember)
    this.memberAPIService.findUser(userId).then(
      res => {
        this.resultMemberAPI = res;
        this.currentMember = this.resultMemberAPI[0];
        this.getMailboxByMemberId(this.currentMember.memberId);
      },
      err => {
        alertFunction.error("Cant not get your profile!");
      }
    )
  }

  getMailboxByMemberId(memberId: number) {
    if (this.roleMember.toLowerCase() == "superadmin") {
      this.mailboxAPIService.getMailboxAdmin().then(
        res => {
          this.listMailbox = res;
          this.getAmountMailboxAdminUnread();
        },
        err => {
          alertFunction.error("Can not get mailbox!");
        }
      )
    } else {
      this.mailboxAPIService.getMailboxByMemberId(memberId).then(
        res => {
          this.listMailbox = res;
          this.getAmountMailboxUnread(memberId);
        },
        err => {
          alertFunction.error("Can not get mailbox!");
        }
      )
    }
  }

  getAmountMailboxUnread(memberId: number) {
    this.mailboxAPIService.getAmountMailboxUnread(memberId).then(
      res => {
        this.unReadMailBox = res;
      },
      err => {
        alertFunction.error("Can not get mailbox!");
      }
    )
  }

  getAmountMailboxAdminUnread() {
    this.mailboxAPIService.getAmountMailboxAdminUnread().then(
      res => {
        this.unReadMailBox = res;
      },
      err => {
        alertFunction.error("Can not get mailbox!");
      }
    )
  }

  viewMailbox(mailboxId: number, index: number) {
    this.mailboxAPIService.findMailbox(mailboxId).then(
      res => {
        this.currentMailbox = res;
        this.mailboxAPIService.readMailbox(mailboxId).then(
          res => {
            this.listMailbox[index].isRead = true;
            if (this.roleMember.toLowerCase() == "superadmin") {
              this.getAmountMailboxAdminUnread();
            } else {
              this.getAmountMailboxUnread(this.currentMember.memberId);
            }
          },
          err => {
            alertFunction.error("Can not change mailbox status!");
          }
        )
      },
      err => {
        alertFunction.error("Can not get mailbox to view!");
      }
    )
  }

  copyContact(input: any) {
    input.select();
    document.execCommand('copy');
    input.setSelectionRange(0, 0);
  }

  filterMail() {
    console.log(this.roleMember)
    var sortDate = this.formSearchMailbox.get("sortDate")?.value;
    var status = this.formSearchMailbox.get("status")?.value

    if (this.roleMember.toLowerCase() == "superadmin") {
      this.mailboxAPIService.filterMailAdmin(sortDate, status).then(
        res => {
          this.listMailbox = res;
        },
        err => {
          alertFunction.error("Can not filter your options!");
        }
      )
    } else {
      this.mailboxAPIService.filterMail(this.currentMember.memberId, sortDate, status).then(
        res => {
          this.listMailbox = res;
        },
        err => {
          alertFunction.error("Can not filter your options!");
        }
      )
    }

  }

  deleteMailbox(mailboxId: number) {
    Swal.fire({
      title: 'Delete mailbox!',
      text: 'Are you sure you want to delete this mailbox?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        //delete action
        this.mailboxAPIService.deleteMailbox(mailboxId).then(
          res => {
            Swal.fire({
              icon: 'success',
              title: 'Delete successful!',
              showConfirmButton: false,
              timer: 2000
            });
            this.getMailboxByMemberId(this.currentMember.memberId);
          },
          err => {
            alertFunction.error("Can not delete mailbox!");
          }
        )
      };
    });
  }

  readMoreFunc(message: string) {
    return message.substr(0, 165);
  }
}

