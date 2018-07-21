import {Injectable} from '@angular/core';
import {webClientId} from "../web-client-id";
import {Platform} from "@ionic/angular";
import * as firebase from "firebase";
import {Router} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";
import {GooglePlus} from "@ionic-native/google-plus/ngx";
import {User} from "firebase";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public isLoggedIn: boolean;
    public redirectUrl: string = 'home';
    public user: User;

    constructor(private router: Router,
                public afAuth: AngularFireAuth,
                private googlePlus: GooglePlus,
                private platform: Platform) {
        this.fetchCurrentUser();
    }

    private fetchCurrentUser() {
        this.afAuth.user.subscribe(u => {
            this.user = u;
            this.isLoggedIn = u != null;
            console.log('User logged in: ' + this.isLoggedIn);
            if (this.isLoggedIn) {
                this.router.navigateByUrl(this.redirectUrl);
            }
        });
    }

    private async nativeGoogleLogin(): Promise<User> {
        try {
            const googlePlusUser = await this.googlePlus.login({
                'webClientId': webClientId,
                'offline': true,
                'scopes': 'profile email'
            });
            return await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(googlePlusUser.idToken));
        } catch (e) {
            console.error(e);
        }
    }

    private async webGoogleLogin(): Promise<User> {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            return (await this.afAuth.auth.signInWithPopup(provider)).user;
        } catch (e) {
            console.error(e);
        }
    }

    private googleLogin(): Promise<User> {
        if (this.platform.is('cordova')) {
            return this.nativeGoogleLogin();
        } else {
            return this.webGoogleLogin();
        }
    }

    signIn() {
        this.googleLogin();
    }

    signOut() {
        this.afAuth.auth.signOut().then(() => {
            this.router.navigateByUrl('/login');
        });
    }
}
