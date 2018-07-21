import {Component} from "@angular/core";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'google-login',
    templateUrl: './google-login.page.html',
    styleUrls: ['./google-login.page.scss'],
})
export class GoogleLoginPage {

    constructor(public authService: AuthService) {

    }

}
