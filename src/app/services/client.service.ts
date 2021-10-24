import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  clientCollection: AngularFirestoreCollection<Client>;
  clientDoc!: AngularFirestoreDocument<Client>;
  clients!: Observable<Client[]>;
  client?: Observable<Client | undefined>;

  constructor(private afs: AngularFirestore) {
    this.clientCollection = this.afs.collection('clients', (ref) =>
      ref.orderBy('lastName', 'asc')
    );
  }

  getClients(): Observable<Client[]> {
    //Get clients with the id
    this.clients = this.clientCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Client;
          data.id = a.payload.doc.id;
          return data;
        })
      )
    );
    return this.clients;
  }

  newClient(client: Client) {
    this.clientCollection.add(client);
  }

  getClient(id: any): Observable<Client | undefined> {
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(
      map((a) => {
        const data = a.payload.data() as Client;
        data.id = a.payload.id;
        return data;
      })
    );
    return this.client;
  }
}
