import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { ActivosService2 } from './services/activos.service';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { 
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [UserService, ActivosService2]
    }
  }
}
