export interface RemoteUser { 
    email: string,
    password: string,
    options?: {
        data?: {
            full_name: string
        }
    }
}

export interface User {
    email: string,
    fullName?: string
}
