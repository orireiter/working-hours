export function isEmailValid(email: string): boolean {
    const emailRegex = /^\S+@\S+$/;
    return emailRegex.test(email);
}

export function isPasswordValid(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
}
