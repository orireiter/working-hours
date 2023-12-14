export abstract class CustomError extends Error {
    abstract get id(): string;
    abstract get title(): string;
}

export class NotImplementedError extends CustomError {
    readonly id = 'not-implemented';
    readonly title = 'Not implemented';

    constructor(abstractNotImplemented: string) {
        super(`${abstractNotImplemented} is not implemented`);
    }    
}


export class FailedToLoginError extends CustomError {
    readonly id = 'failed-login';
    readonly title = 'There was a problem logging in';

    constructor() {
        super('sorry about that...');
    }    
}


export class EmailNotConfirmedError extends CustomError {
    readonly id = 'email-not-confirmed';
    readonly title = 'You still haven\'t confirmed you registration';

    constructor() {
        super('please check your email');
    }    
}


export class FailedToRegisterError extends CustomError {
    readonly id = 'failed-register';
    readonly title = 'There was a problem registering';

    constructor() {
        super('sorry about that...');
    }    
}

export class FailedToLogoutError extends CustomError {
    readonly id = 'failed-logout';
    readonly title = 'There was a problem logging out';

    constructor() {
        super('sorry about that...');
    }    
}
