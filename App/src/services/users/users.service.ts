import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, catchError, forkJoin, map, tap, throwError } from 'rxjs';
import { USER_MODEL } from '../../abstract_classes/user.model';
import { LOGIN_MODEL } from '../../abstract_classes/login.model';
import { RESPONSE_MODEL } from '../../abstract_classes/response.model';
import { FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MessageBoxService } from '../message-box/message-box.service';
import { PageReloaderService } from '../pageReloader/pageReloader.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private BASE_URL: string = 'http://localhost:4000';
    private PASSWORD_RESET_REQUEST_URL: string = 'http://localhost:8000/reset';
    private PASSWORD_RESET_URL: string = 'http://localhost:8000/reset/password';
    private users: USER_MODEL[] = [];
    private usersSubject: Subject<USER_MODEL[]> = new Subject<USER_MODEL[]>();

    constructor(private http: HttpClient, private messageBoxService: MessageBoxService, private pageReloaderService: PageReloaderService) { }

    // GET ALL USERS
    getUsers(): Observable<USER_MODEL[]> {
        return this.http.get<USER_MODEL[]>(this.BASE_URL + '/users');
    }

    fetchUsers(): void {
        this.getUsers().subscribe(
            (users: USER_MODEL[]) => {
                this.users = users;
                // EMIT UPDATED users
                this.usersSubject.next(this.users);
            },
            (error: any) => {
                console.error('Error fetching users:', error);
            }
        );
    }

    // GET ALL ADDED USERS
    getAddedUsers(): Observable<USER_MODEL[]> {
        return this.usersSubject.asObservable();
    }

    // CREATE | ADD USER
    createUser(user: USER_MODEL): Observable<USER_MODEL> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        // DISPLAY SUCCESS MESSAGE
        this.messageBoxService.showSuccessMessage('Sign Up successful!');

        // RELOAD PAGE AFTER 2s
        setTimeout(() => {
            this.pageReloaderService.refreshRoute();
        }, 2000);

        return this.http.post<USER_MODEL>(this.BASE_URL + '/users', user, { headers });
    }

    // LOGIN USER 
    loginUser(user: LOGIN_MODEL): Observable<RESPONSE_MODEL> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post<RESPONSE_MODEL>(this.BASE_URL + '/users/login', user, { headers }).pipe(map(response => {
            // DISPLAY SUCCESS MESSAGE
            this.messageBoxService.showSuccessMessage('Sign in successful, welcome back!');

            const token = response.token;
            return { response, token } as RESPONSE_MODEL;
        }),
            catchError((error: any) => {
                // DISPLAY ERROR MESSAGE
                this.messageBoxService.showErrorMessage(error.error.message);
                return throwError(error);
            })
        );
    }

    // RESET | UPDATE USER PASSWORD
    resetUserPassword(form: FormGroup) {
        // GET FORM INPUT
        const email: string = form.get('email')?.value;
        const userPassword: string = form.get('userPassword')?.value;

        const payload: LOGIN_MODEL = {
            email: email,
            userPassword: userPassword
        };

        // MAKE REQUEST FOR PASSWORD RESET
        const RESET_REQUEST: Observable<{}> = this.http.get(`${this.PASSWORD_RESET_REQUEST_URL}/${email}`);
        // MAKE REQUEST WITH UPDATED PASSWORD INFO 
        const UPDATE_REQUEST: Observable<{}> = this.http.put(`${this.PASSWORD_RESET_URL}/${email}`, payload);

        // RETURN BOTH RESPONSES USING THE forkJoin METHOD
        return forkJoin([RESET_REQUEST, UPDATE_REQUEST]).pipe(
            tap(() => {
                this.messageBoxService.showSuccessMessage('Password reset successful! Redirecting...');
            }),
            catchError((error: any) => {
                this.messageBoxService.showErrorMessage('Failed to reset and update password, please try again...');
                return throwError(error);
            })
        );
    }

    // CHECK IF USER IS AUTHENTICATED i.e If they have a VALID token
    isAuthenticated(): boolean {
        const AUTHENTICATION_TOKEN = localStorage.getItem('token');
        if (AUTHENTICATION_TOKEN) {
            return true;
        } else {
            return false;
        }
    }

    ///////////////////////////////
    // CUSTOM PATTERN VALIDATORS //
    ///////////////////////////////

    // EMAIL PATTERN VALIDATOR
    EMAIL_PATTERN_VALIDATOR(): ValidatorFn {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return Validators.pattern(emailPattern);
    }

    // PASSWORD PATTERN VALIDATOR
    PASSWORD_PATTERN_VALIDATOR(): ValidatorFn {
        const passwordPattern = /^(?=.*[A-Za-z])[A-Za-z\d\S]{8,}$/;
        return Validators.pattern(passwordPattern);
    }
}
