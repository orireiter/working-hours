import { useEffect } from 'react';

import { useAuthenticationStore } from '../stores/authentication.store';
import { AuthenticationService, onAuthenticationSessionStateChanged } from '../services/authentication.service';


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
