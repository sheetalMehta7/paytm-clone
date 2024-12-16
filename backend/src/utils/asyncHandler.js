export const asyncHandler = async (handlerFun)=>{
    return (req, res, next)=>{
        Promise.resolve(handlerFun(req, res, next)).catch(err=>next(err));
    }
}