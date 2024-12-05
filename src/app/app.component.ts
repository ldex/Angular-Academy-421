import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MaterialModule } from './material.module';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MaterialModule, RouterLink, TranslatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isDarkTheme = false;

  langs

  constructor(private translateService: TranslateService) {
    translateService.addLangs(['fr', 'en'])
    translateService.setDefaultLang('fr')
    translateService.use('fr')

    this.langs = translateService.langs
  }

  useLanguage(language: string): void {
    this.translateService.use(language)
  }
}
