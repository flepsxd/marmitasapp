import { MessageService } from 'primeng/components/common/messageservice';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import { tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class InterceptService implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(),
      catchError(response => {
        if (response.status === 400) {
          this.authService.logout();
        }
        if (response.status === 422) {
          const error = response.error.erro || response.error;
          Object.keys(error).forEach(element => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro na Solicitação da Função!',
              detail: error[element],
              life: 30,
              key: 'Geral'
            });
          });
        }
        return throwError(response);
      })
    );
  }

  constructor(private authService: AuthService, private messageService: MessageService) {}
}
