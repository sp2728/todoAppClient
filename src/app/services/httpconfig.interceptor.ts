import { Injectable, Injector } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { LocalstorageService } from './localstorage.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor{

    constructor(private localStorageService:LocalstorageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const baseUrl = `${environment.backend_url}`;

        const authReq = req.clone({
            url: `${baseUrl + req.url}`
        });
        return next.handle(authReq);
    }
}