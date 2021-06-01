import { mailboxAPI } from './../../../models/mailbox/mailbox.model';
import { MailBoxAPIService } from './../../../services/admin/mailbox/mailboxAPI.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

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

  constructor(
    // Declare form builder
    private formBuilder: FormBuilder,

    private mailboxAPIService: MailBoxAPIService
  ) { }

  ngOnInit() {

    this.getMailboxByMemberId();
    this.getAmountMailboxUnread();

    this.formSearchMailbox = this.formBuilder.group({
      status: "all",
      sortDate: "all"
    });

  }

  getMailboxByMemberId() {
    this.mailboxAPIService.getMailboxByMemberId(1).then(
      res => {
        this.listMailbox = res;
      },
      err => {
        alertFunction.error("Can not get mailbox!");
      }
    )
  }

  getAmountMailboxUnread() {
    this.mailboxAPIService.getAmountMailboxUnread(1).then(
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
    var sortDate = this.formSearchMailbox.get("sortDate")?.value;
    var status = this.formSearchMailbox.get("status")?.value

    this.mailboxAPIService.filterMail(1, sortDate, status).then(
      res => {
        this.listMailbox = res;
      },
      err => {
        alertFunction.error("Can not filter your options!");
      }
    )
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
            this.getMailboxByMemberId();
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

