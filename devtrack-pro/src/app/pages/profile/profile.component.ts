import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SHARED_MATERIAL_MODULES } from '../../shared/common/shared-material';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SHARED_MATERIAL_MODULES],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  profileForm: FormGroup;

  user = {
    name: 'Avinash Suryawanshi',
    empNo: 'EM0001',
    role: 'Front End Developer',
    department: 'InfoTech Department',
    email: 'avinash.s@company.com',
    phone: '+91 98765 43210',
    joinDate: '12 Jan 2024',
    location: 'Ahmedabad, India',
    initials: 'A',
  };

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: [this.user.name],
      email: [this.user.email],
      phone: [this.user.phone],
      role: [this.user.role],
      department: [this.user.department],
      location: [this.user.location],
    });
  }

  saveProfile() {
    console.log('Profile saved:', this.profileForm.value);
  }
}
