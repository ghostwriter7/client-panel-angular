import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Client } from '../../models/Client';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css'],
})
export class EditClientComponent implements OnInit {
  id?: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  };
  disableBalanceOnEdit: boolean = true;

  constructor(
    private clientService: ClientService,
    private flashMsg: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //get ID from URL
    this.id = this.route.snapshot.params['id'];

    //get Client
    this.clientService
      .getClient(this.id)
      .subscribe((client) => (this.client = client));
  }

  onSubmit({ value, valid }: NgForm) {
    if (!valid) {
      this.flashMsg.show('Please fill out the form correctly', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    } else {
      value.id = this.id;
      this.clientService.updateClient(value);
      this.flashMsg.show('Client updated', {
        cssClass: 'alert-success',
        timeout: 4000,
      });
      this.router.navigate([`/client/${this.id}`]);
    }
  }
}
