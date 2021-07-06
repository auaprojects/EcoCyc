import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { User } from './user';
import { StorageService } from '../shared/storage.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = new BehaviorSubject<User>(null);
  private apiURL = environment.url;

  constructor(public auth: AngularFireAuth/*, private googleplus: GooglePlus*/,
    private storageService: StorageService,
    private http: HttpClient,
    public ngFireAuth: AngularFireAuth,
    ) { }

  loginFireauth(value){
    return new Promise<any> ( (resolve, reject)=>{
      firebase.auth().signInWithEmailAndPassword(value.email, value.password).then(
        res => resolve(res),
        error => reject(error)
      );
    });
   }

   get userIsAuthenticated() {
    // eslint-disable-next-line no-underscore-dangle
    return this._user.asObservable().pipe(map(user => {
      if (user) {
        if (user.emailVerified) {
          return true;
        } else {
          return false;
        }
        // return !!user.emailVerified;
      } else {
        return false;
      }
    }));
  }

  signIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  // Register user with email/password
  singUp(dataObj: any): Observable<any> {
    return from(this.ngFireAuth.createUserWithEmailAndPassword(dataObj.email, dataObj.password)).pipe(map(authObject => {
      const user = authObject.user;
      if (user) {
        const userData: User = {
          uid: user.uid,
          email: user.email,
          fullname: dataObj.fullname,
          displayName: user.displayName || user.email.split('@')[0],
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          role: 'user'
        };

        return userData;
      }
    })/*, tap(user => {
      console.log(user);
      return this.setUserData(user);
    })*/);
  }

  autoLogin() {
    return from(this.storageService.getObject('authData')).pipe(
      map((storedData: any) => {
        if (!storedData) {
          return null;
        }

        return storedData as any as User;
      }),
      tap((user) => {
        if (user) {
          // eslint-disable-next-line no-underscore-dangle
          this._user.next(user);
          // this._user = user;
        }
      }),
      map(user => !!user)
    );
  }

  setUser2Cpx(user) {
    // eslint-disable-next-line no-underscore-dangle
    this._user.next(user);
    // this._user = user;
    this.storageService.setObject('authData', user).then(() => console.log('Data stored successfully!'));
  }

  // Store user to Cloudera
  setUserData(user: User): Observable<any> {
    return this.http.put(`${this.apiURL}new-user`, user).pipe(map(res => {
      if (res) {
        return res;
      }
    }));
    // this._user.next(userData);
  }

  // getUsers() {
  //   return this.http.get(`${this.apiURL}entries`).pipe(map(res => {
  //     if (res) {
  //       return res;
  //     }
  //   }));
  // }

  getUsers(): Observable<User[]> {
    return this.http.get(`${this.apiURL}users`).pipe(map((res: any) => {
      if (res) {
        return res.entries as User[];
      }
    }));
  }
}

