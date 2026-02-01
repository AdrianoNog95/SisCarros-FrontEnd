import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { RouterLink, Router } from "@angular/router";
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-menu',
  imports: [MdbCollapseModule, RouterLink, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  username: string | null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.username = this.authService.getUsername();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
