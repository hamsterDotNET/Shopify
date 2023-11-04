import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';

export const authGuard: CanActivateFn = (route, state, auth: AuthenticationService = inject(AuthenticationService), router: Router = inject(Router)) => {
  return auth.user.pipe(
    take(1),
    map(user => {
      if (!!user){
        return true;
      }
      return router.createUrlTree(['./auth']);
    })
  );
};
