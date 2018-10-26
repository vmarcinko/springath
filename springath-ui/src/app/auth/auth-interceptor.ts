import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(private authService: AuthService) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		// Clone the request and replace the original headers with
		// cloned headers, updated with the authorization.
		// Clone the request and set the new header in one step.
		const newHeaders = req.headers.set('Authorization', this.authService.getAuthToken());
		const authReq = req.clone({headers: newHeaders});

		// send cloned request with header to the next handler.
		return next.handle(authReq);
	}
}