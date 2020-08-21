import { Component, OnInit, ViewChild, ViewChildren, Query, QueryList } from '@angular/core';
import { SettingsService } from '../../service/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  constructor(
    private settingsService: SettingsService
  ){
  }

  ngOnInit(): void{
    const theme = this.settingsService.getTheme;
    document.querySelector(`a[data-theme=${theme}]`).classList.add('working');
  }

  public changeTheme = (theme: string, event: Object): void => {
    this.settingsService.changeTheme(theme);
    this.verifyCheckt();
  }

  private verifyCheckt = (): void =>{
    document.querySelector('.working').classList.remove('working');
    const li: Element = event['path'][0];
    li.classList.add('working')
  }

}
