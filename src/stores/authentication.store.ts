import { create } from 'zustand';

import { User } from '../models/authentication.models';


interface AuthenticationStore {
    isAuthenticated: boolean;
    user?: User;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    setUser: (newValue: User) => void;
}


export const useAuthenticationStore = create<AuthenticationStore>((set) => ({
    isAuthenticated: false,
    user: undefined,
    setIsAuthenticated: (newValue: boolean) => set({isAuthenticated: newValue}),
    setUser: (newValue: User) => set({user: newValue}),
}));
