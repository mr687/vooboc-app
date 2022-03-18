export interface Error {
    status: number
    message: string
}

export enum ErrorType {
    INTERNAL_SERVER_ERROR = 500,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
}

export const createError = (status: number, message: string): Error => {
    return { status, message }
}