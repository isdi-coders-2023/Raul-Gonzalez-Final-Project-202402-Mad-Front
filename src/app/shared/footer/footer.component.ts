import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer>
      <p>© Raul Gonzalez</p>
      <nav class="nav-images">
        <a href=""
          ><img src="../assets/logoXorange.png" alt="logox" width="40"
        /></a>
        <a href=""
          ><img src="../assets/logodiscord.png" alt="logodiscord" width="40"
        /></a>
        <a href=""
          ><img src="../assets/logoIG.png" alt="logoIG" width="40"
        /></a>
        <a href=""
          ><img
            src="../assets/logoGithuborange.png"
            alt="logoGithub"
            width="40"
        /></a>
      </nav>
    </footer>
  `,
  styleUrl: './footer.component.css',
})
export class FooterComponent {}
