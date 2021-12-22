import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EffectsModule } from "@ngrx/effects";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { authInterceptorProviders } from './helpers/auth.interceptor';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { Store, StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './shared/store';
import { UserEffects } from './shared/user';
import { DropZoneDirective } from './shared';
import { AuthGuard } from './auth.guard';
import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload';
import { ThumnailDirective } from './shared';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule, MatIconModule, MatTooltipModule, MatInputModule,
MatFormFieldModule ,MatCardModule, MatAutocompleteModule } from '@angular/material';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ImageGridComponent } from './shared/components/image-grid/image-grid.component';
import { PublicImageGridComponent } from './shared';
import { LoggedOutComponent } from './logged-out/logged-out.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    HeaderBarComponent,
    UploadFileComponent,
    DropZoneDirective,
    FileSelectDirective,
    FileDropDirective,
    PublicImageGridComponent,
    ThumnailDirective,
    ImageGridComponent,
    LoggedOutComponent
  ],
  imports: [
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    MatTooltipModule,
    InfiniteScrollModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    FormsModule,
    HttpClientModule,
    EffectsModule.forRoot([
      UserEffects
    ]),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge:60
    }),
    NoopAnimationsModule
  ],
  providers: [authInterceptorProviders, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
