class ApiError extends Error {
    constructor(
        statusCode,
        errorMessage="Something went wrong!",
        error=[],
        stack=""
    ){
        super(errorMessage);
        this.statusCode = statusCode;
        this.data = null;
        this.message = errorMessage;
        this.error = error;
        this.success = false;

        if(stack){
            this.stack = stack;
        }else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };