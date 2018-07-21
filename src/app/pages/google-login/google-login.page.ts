import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'google-login',
    templateUrl: './google-login.page.html',
    styleUrls: ['./google-login.page.scss'],
})
export class GoogleLoginPage implements OnInit {

    showLoginButton = false;

    constructor(public authService: AuthService) {
    }

    ngOnInit(): void {
        this.authService.afAuth.authState.subscribe(s => {
            this.showLoginButton = s == null;
        });
    }

}
