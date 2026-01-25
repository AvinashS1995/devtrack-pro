import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import 'devextreme/excel_exporter';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
