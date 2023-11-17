import { create } from 'zustand';


interface AuthenticationStore {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}


export const useAuthenticationStore = create<AuthenticationStore>((set) => ({
    isAuthenticated: false,
    setIsAuthenticated: (newValue: boolean) => set({isAuthenticated: newValue}),
}));
