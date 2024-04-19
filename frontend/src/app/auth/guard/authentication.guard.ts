import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private service: AuthenticationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.service.getAuthChanges().value) {
      console.log("User is authenticated");
      return true;
    } else {
      // Redirect to the login page or display an access denied message
      console.log("User is not authenticated");
      this.router.navigate(['/login']);
      return false;
    }
  }
}
