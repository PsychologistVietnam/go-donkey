//Tra thong bao json an toan
export function errorHandler (error , req ,res ,next) {
   //tranh gui response lan nua
   if (res.headersSent) {
    return next(error) ;
   }
    //nhan dien json sai cu phap
   if (error.type === "entity.parse.failed") {
    return res.status(400).json({
        success : false ,
        message : "Invalid JSON body" 
    })
   }

   //response cho cai loi chua nhan dien duoc 
   return res.status(500).json({
       success : false,
       message : "Internal server error"
   })
}