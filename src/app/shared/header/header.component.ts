import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `
    <header>
      <video
        src="../assets/gifanillo.mp4"
        width="80px"
        height="80px"
        controls
        autoplay
        loop
      ></video>
      <img src="../assets/iconburger.png" alt="iconburger" width="70px" />
    </header>
  `,
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
