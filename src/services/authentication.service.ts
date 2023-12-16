import { EventEmitter } from 'events';

import { supabase } from '../thirdParties/supabase';
import { FailedToLoginError, FailedToRegisterError, FailedToLogoutError, EmailNotConfirmedError } from '../models/errors.models';
import { RemoteUser } from '../models/authentication.models';


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
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                const errorToThrow = error.message.includes('not confirmed') ? EmailNotConfirmedError : FailedToLoginError;
                throw new errorToThrow();
            }

            AuthenticationSessionStateChangeEvent.emit(true);
        }
    };

    static Register = class { 
        static async emailPasswordRegister(email: string, password: string, name?: string){
            const dataToSend: RemoteUser = {
                email,
                password,
            };

            if (name) {
                dataToSend.options = {
                    data: {
                        full_name: name
                    }
                };
            }
            
            const { error } = await supabase.auth.signUp(dataToSend);

            if (error) {
                throw new FailedToRegisterError();
            }

            AuthenticationSessionStateChangeEvent.emit(true);
        }
    };

    static async logout() {
        const { error } = await supabase.auth.signOut();

        if (error) {
            throw new FailedToLogoutError();
        }

        AuthenticationSessionStateChangeEvent.emit(false);
    }
    
    static async getAuthenticationSession() {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
            AuthenticationSessionStateChangeEvent.emit(false);
        }

        return session;
    }
}


export function onAuthenticationSessionStateChanged(callbackFunction: AuthenticationSessionStateChangeEventCallback) {
    AuthenticationSessionStateChangeEvent.addListener(callbackFunction);

    const removeListener = () => AuthenticationSessionStateChangeEvent.removeListener(callbackFunction);
    return removeListener;
}
