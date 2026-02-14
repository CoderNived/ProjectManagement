class APIERROR extends Error{
    constructor(
        statusCode, message="Something went Wrong",
        errors=[],
        stack = ""
    ){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.data=null,
        this.success=false,
        this.errors=errors
        if(stack){
            this.estack=stack
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {APIERROR}