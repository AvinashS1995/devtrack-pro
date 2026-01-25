import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonService } from './shared/service/common.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'devtrack-pro';

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.commonService.setUserDetailsFromToken();
  }
}
