
//Tao phan quyen

export function requireAdmin(req , res , next) {
   //Kiem tra request co thong tin xac thuc chua
   if (!req.auth) {
    return res.status(401).json({
        success : false ,
        message : "Authentication required" 
    })
   }

   // Tu choi role khong phai la admin 
   if (!Array.isArray(req.auth.roles) || !req.auth.roles.includes("admin")) {
     return res.status(403).json({
        success : false ,
        message : "Admin access required"
     })
   }

   return next() ;
}