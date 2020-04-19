import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './auth.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { InternalErrorHandler } from '../shared/internal-error-handler';

@NgModule({
  declarations: [LoginComponent],
  imports: [AuthRoutingModule, SharedModule],
  providers: [ AuthService],
})
export class AuthModule {}
