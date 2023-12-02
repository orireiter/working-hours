import { EventEmitter } from 'events';

import { NotImplementedError } from '../models/errors.models';


type AuthenticationSessionStateChangeEventCallback = (event: {isAuthenticated: boolean}) => void;


class AuthenticationSessionStateChangeEvent{
    static readonly eventEmitter = new EventEmitter();
    static readonly eventName = 'AuthSessionStateChanged';

    static emit(isAuthenticated: boolean): void {
        const eventEmitter = AuthenticationSessionStateChangeEvent.eventEmitter;
        eventEmitter.emit(AuthenticationSessionStateChangeEvent.eventName, { isAuthenticated: isAuthenticated});
    }

    static addListener(callbackFunction: AuthenticationSessionStateChangeEventCallback): EventEmitter{
        const eventEmitter = AuthenticationSessionStateChangeEvent.eventEmitter;
        const listener = eventEmitter.addListener(AuthenticationSessionStateChangeEvent.eventName, callbackFunction);
        return listener;
    }

    static removeListener(callbackFunction: AuthenticationSessionStateChangeEventCallback): void {
        const eventEmitter = AuthenticationSessionStateChangeEvent.eventEmitter;
        eventEmitter.removeListener(AuthenticationSessionStateChangeEvent.eventName, callbackFunction);
    }
}


export class AuthenticationService {
    static Login = class {
        static async emailPasswordLogin(email: string, password: string){
            // AuthenticationSessionStateChangeEvent.emit(true);
            throw new NotImplementedError(`${this.name}.${this.emailPasswordLogin.name}`);
        }
    };

    static Register = class { 
        static async emailPasswordRegister(email: string, password: string, name?: string){
            AuthenticationSessionStateChangeEvent.emit(true);
            throw new NotImplementedError(`${this.name}.${this.emailPasswordRegister.name}`);
        }
    };

    static async logout() {
        AuthenticationSessionStateChangeEvent.emit(false);
        throw new NotImplementedError(`${this.name}.${this.logout.name}`);
    }
    
    static async getAuthenticationSession() {
        return null;
        throw new NotImplementedError(`${this.name}.${this.getAuthenticationSession.name}`);
    }
}


export function onAuthenticationSessionStateChanged(callbackFunction: AuthenticationSessionStateChangeEventCallback) {
    AuthenticationSessionStateChangeEvent.addListener(callbackFunction);

    const removeListener = () => AuthenticationSessionStateChangeEvent.removeListener(callbackFunction);
    return removeListener;
}
