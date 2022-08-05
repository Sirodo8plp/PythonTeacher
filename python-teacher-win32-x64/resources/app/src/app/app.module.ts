import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxElectronModule } from 'ngx-electron';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatabaseService } from './database.service';
import { IntroductionComponent } from './introduction/introduction.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { SyntaxComponent } from './syntax/syntax.component';
import { CommentsComponent } from './comments/comments.component';
import { ExampleComponent } from './example/example.component';
import { CommandComponent } from './command/command.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { PracticeComponent } from './practice/practice.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    AppComponent,
    IntroductionComponent,
    GetStartedComponent,
    SyntaxComponent,
    CommentsComponent,
    ExampleComponent,
    CommandComponent,
    ExercisesComponent,
    ProfileComponent,
    PracticeComponent,
    HomepageComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxElectronModule,
    FormsModule,
    ChartModule,
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
