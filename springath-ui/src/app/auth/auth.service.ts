import {Injectable} from "@angular/core";

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	public getAuthToken(): string {
		const username = "admin";
		const password = "admin";
		return 'Basic ' + btoa(username + ":" + password);
	}
}