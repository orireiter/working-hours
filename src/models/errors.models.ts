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
