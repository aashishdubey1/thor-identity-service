
export function sanitizeUser (user:any){
    const {password,_v,refreshtoken,...safeUser} = user.toObject?.() || user; 
    return safeUser;
}