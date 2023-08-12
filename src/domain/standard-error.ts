export interface ErrorInfo {
    code: string;
    status: number;
    defaultMessage: string;
}

export class StandardError extends Error {
    public errorCode: string;

    public statusCode: number;

    public lastError?: Record<string, unknown> | null;

    public context?: Record<string, unknown> | null;

    constructor(
        errorInfo: ErrorInfo,
        message?: string,
        lastError?: Record<string, unknown> | null,
        context?: Record<string, unknown> | null
    ) {
        super(message || errorInfo.defaultMessage || 'No message provided!');

        // So you can do typeof CustomError
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = this.constructor.name;

        this.errorCode = errorInfo.code;
        this.statusCode = errorInfo.status;
        this.lastError = lastError;
        this.context = context;
    }
}
