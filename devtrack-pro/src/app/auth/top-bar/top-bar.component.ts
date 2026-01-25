import { Component } from '@angular/core';
import { SHARED_MATERIAL_MODULES } from '../../shared/common/shared-material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [SHARED_MATERIAL_MODULES],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
  user = {
    name: 'Avinash Suryawanshi',
    empNo: 'EM0001',
    initials: 'A',
    roles: 'Front End Developer',
    divisions: '(InfoTech Department)',
  };

  constructor(private router: Router) {}

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
