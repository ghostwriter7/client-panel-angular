import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Client } from '../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css'],
})
export class ClientDetailsComponent implements OnInit {
  id?: string;
  client?: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

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
    this.clientService.getClient(this.id).subscribe((client) => {
      if (client !== null) {
        if (client?.balance && client.balance > 0) {
          this.hasBalance = true;
        }
      }
      this.client = client;
      console.log(this.client);
    });
  }

  onDeleteClick(id: string | undefined) {}
}
