import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { Client } from '../../models/Client';

import { SettingsService } from '../../services/settings.service';
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  };

  disableBalanceOnAdd: boolean =
    this.settingsService.getSettings().disableBalanceOnAdd;

  @ViewChild('clientForm') form: any;

  constructor(
    private flashMsg: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {}

  onSubmit({ value, valid }: NgForm) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    if (!valid) {
      this.flashMsg.show('Please fill out the form correctly', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    } else {
      this.clientService.newClient(value);

      this.flashMsg.show('New client added!', {
        cssClass: 'alert-success',
        timeout: 4000,
      });

      this.router.navigate(['/']);
    }
  }
}
