export abstract class CustomError extends Error {
    abstract get id(): string;
}

export class NotImplementedError extends CustomError {
    readonly id = 'not-implemented';

    constructor(abstractNotImplemented: string) {
        super(`${abstractNotImplemented} is not implemented`);
    }    
}
