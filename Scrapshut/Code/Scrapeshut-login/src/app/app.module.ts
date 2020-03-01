import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { Http, HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from "./app-routing.module";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthGuard } from "./shared/index";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { AuthService } from "./shared/guard/auth.service";
import { DataserviceService } from "./services/dataservice.service";
export function HttpLoaderFactory(http: HttpClient) {
 // for development
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');

}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
  ],
  providers: [AuthGuard,AuthService,DataserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
