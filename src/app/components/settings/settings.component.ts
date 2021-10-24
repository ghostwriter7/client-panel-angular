import { Component, OnInit } from '@angular/core';
import { Settings } from '../../models/Settings';
import { SettingsService } from '../../services/settings.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  settings: Settings;

  constructor(
    private settingsService: SettingsService,
    private flashMsg: FlashMessagesService
  ) {
    this.settings = this.settingsService.getSettings();
  }

  ngOnInit(): void {}

  onSubmit() {
    this.settingsService.changeSettings(this.settings);
    this.flashMsg.show('Settings saved', {
      cssClass: 'alert-success',
      timeout: 4000,
    });
  }
}
