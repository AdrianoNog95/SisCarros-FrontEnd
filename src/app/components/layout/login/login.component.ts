import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Login } from '../../../models/login';


@Component({
  selector: 'app-login',
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login: Login = new Login();

  router = inject(Router);
  

  constructor() {
    
  }

  logar() {
    if (this.login.username == 'admin' && this.login.password == 'admin') {
      this.router.navigate(['/admin/carros']);
        }else
          alert('Usuário ou senha incorretos!');
  }    
      
}
