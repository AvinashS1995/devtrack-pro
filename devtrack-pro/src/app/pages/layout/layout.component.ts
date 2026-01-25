import { Component } from '@angular/core';
import { TopBarComponent } from '../../auth/top-bar/top-bar.component';
import { SHARED_MATERIAL_MODULES } from '../../shared/common/shared-material';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [TopBarComponent, SHARED_MATERIAL_MODULES, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
