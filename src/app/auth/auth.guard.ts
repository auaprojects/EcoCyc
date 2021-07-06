import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) {}

  canLoad(): Observable<boolean> | boolean {
    return this.authService.userIsAuthenticated.pipe(take(1),
    switchMap(isAuthenticated => {
      if (!isAuthenticated) {
        return this.authService.autoLogin();
      } else {
        return of(isAuthenticated);
      }
    }),
    tap(isAuthenticated => {
      if (!isAuthenticated) {
        this.router.navigateByUrl('/login');
      }
    }));
  }

  // canLoad(): Observable<boolean> | boolean {
  //   if (this.authService.userIsAuthenticated) {
  //     return true;
  //   } else {
  //     return this.authService.autoLogin();
  //   }
  // }
}
