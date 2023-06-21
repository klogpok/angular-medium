import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { isLoggedInSelector } from '@auth/store/selectors';

export const authGuard: CanMatchFn = () => {
  const router = inject(Router);
  const store = inject(Store);

  return store.pipe(
    select(isLoggedInSelector),
    map((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        return true;
      }

      router.navigateByUrl('/');
      return false;
    })
  );
};
