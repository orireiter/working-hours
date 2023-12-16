import { useEffect, useState } from 'react';

import { useAuthenticationStore } from '../stores/authentication.store';
import { AuthenticationService, onAuthenticationSessionStateChanged } from '../services/authentication.service';
import { notifyError, notifySuccess } from '../utils/notifications.utils';



export function useAuthSession() {
    const [isLoading, setIsLoading] = useState(true);
    const authenticationStore = useAuthenticationStore();

    const setStoreAuthentication = () => {
        setIsLoading(true);
        AuthenticationService.getAuthenticationSession()
            .then((session) => {
                const isAuthenticated = session?.user.id ? true : false;
                authenticationStore.setIsAuthenticated(isAuthenticated);
                authenticationStore.setUser({email: session?.user.email ?? '', fullName: session?.user.user_metadata?.full_name as string});
            })
            .catch((error) => {
                notifyError(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        setStoreAuthentication();

        const removeListener = onAuthenticationSessionStateChanged(() => {
            setStoreAuthentication();
        });

        return () => removeListener();
    }, []);

    return {
        isAuthenticated: authenticationStore.isAuthenticated,
        isLoading
    };
}

// todo turn this later into a factory function for email/google/etc sign in options
export function useLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const authenticationStore = useAuthenticationStore();

    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            await AuthenticationService.Login.emailPasswordLogin(email, password);
            notifySuccess('login-success', `Hello ${authenticationStore.user?.fullName ?? ''}`, 'Welcome back');
        } catch (error) {
            notifyError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        login,
        isLoading
    };
}

// todo turn this later into a factory function for email/google/etc register in options
export function useRegister() {
    const [isLoading, setIsLoading] = useState(false);

    const register = async (email: string, password: string, name?: string) => {
        try {
            setIsLoading(true);
            await AuthenticationService.Register.emailPasswordRegister(email, password, name);
            notifySuccess('signup-success', 'Great! Now you only need to verify your Email');
        } catch (error) { 
            notifyError(error);
        } finally {
            setIsLoading(false);
        }
        
    };

    return {
        register,
        isLoading
    };
}

export function useLogout() {
    const [isLoading, setIsLoading] = useState(false);

    const logout = async () => {
        try {
            setIsLoading(true);
            await AuthenticationService.logout();
        } catch (error) {
            notifyError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        logout,
        isLoading
    };
}
