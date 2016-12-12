import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { LoginPage, HomePage, SearchPage, PostPage,
         PopoverPage, RidesPage, RidePage } from '../pages/pages';
import { httpService } from '../providers/http-service';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'e28e54b8'
  }
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    SearchPage,
    PostPage,
    PopoverPage,
    RidesPage,
    RidePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    SearchPage,
    PostPage,
    PopoverPage,
    RidesPage,
    RidePage
  ],
  providers: []
})
export class AppModule {}
