import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';


import { LoadingService } from '../components/loading/loading.service';
import { SkipLoading } from '../components/loading/skip-loading.component';

export const loadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  if (req.context.get(SkipLoading)) {
    return next(req);
  }
  
  const loadingService = inject(LoadingService);
  loadingService.loadingOn();

  return next(req).pipe(
    finalize(() => {
      loadingService.loadingOff();
    })
  );
};
