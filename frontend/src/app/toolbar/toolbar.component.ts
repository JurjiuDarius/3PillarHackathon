import {Component, OnDestroy} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {AuthenticationService} from "../auth/service/authentication.service";
import {Subscription} from "rxjs";
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    NgIf,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnDestroy {
  private authSubscription: Subscription;
  isLoggedIn: boolean = false;

  constructor(private service: AuthenticationService, private router: Router) {
    this.authSubscription = this.service.getAuthChanges().subscribe(
      (loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  executeLogout() {
    this.service.logOut();
    this.router.navigate(['/login']);
  }
}
