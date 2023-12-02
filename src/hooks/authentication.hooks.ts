import { useEffect } from 'react';

import { useAuthenticationStore } from '../stores/authentication.store';
import { AuthenticationService, onAuthenticationSessionStateChanged } from '../services/authentication.service';
import { notifyError } from '../logic/notifications.logic';


export function useAuthSession() {
    const authenticationStore = useAuthenticationStore();

    useEffect(() => {
        AuthenticationService.getAuthenticationSession()
            .then((session) => {
                const isAuthenticated = session ? true : false;
                authenticationStore.setIsAuthenticated(isAuthenticated);
            })
            .catch((error) => {});

        const removeListener = onAuthenticationSessionStateChanged((authEvent) => {
            authenticationStore.setIsAuthenticated(authEvent.isAuthenticated);
        });

        return () => removeListener();
    }, []);



    return authenticationStore.isAuthenticated;
}

// todo turn this later into a factory function for email/google/etc sign in options
export function useLogin() {
    return async (email: string, password: string) => {
        try {
            await AuthenticationService.Login.emailPasswordLogin(email, password);
        } catch (error) {
            notifyError(error);
        }
    };
}

// todo turn this later into a factory function for email/google/etc register in options
export function useRegister() {
    return (email: string, password: string, name?: string) => AuthenticationService.Register.emailPasswordRegister(email, password, name);
}

export function useLogout() {
    return () => AuthenticationService.logout();
}
