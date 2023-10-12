export function authTrue(req, res, next) {
   if (req.isAuthenticated()) {
        next()
   } else {
       (req.method == 'GET') ? next() : res.status(300).redirect('/login')
    }
}
export function authFalse(req, res, next) {
    if (!req.isAuthenticated()) {
        next()
    } else {
        res.status(300).redirect('/')
    }
} 