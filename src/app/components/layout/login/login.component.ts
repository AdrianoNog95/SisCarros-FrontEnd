import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Login } from '../../../models/login';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';



@Component({
  selector: 'app-login',
  imports: [MdbFormsModule, FormsModule],
 
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login: Login = new Login();
  private http = inject(HttpClient);
  private router = inject(Router);
  private authService = inject(AuthService);


  constructor() {
    
  }

  logar() {
  this.http.post(
    'http://localhost:8080/api/usuario/login',
    this.login
  ).subscribe({
    next: () => {
      this.authService.setUsername(this.login.username);
      this.router.navigate(['/admin/carros']);
    },
    error: () => alert('Usuário ou senha incorretos')
  });
  }
}



