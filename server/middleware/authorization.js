const requireAuth = (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated() || !req.user) {
        return res.status(401).json({ message: 'Authentication required' })
    }
    return next()
}
const requireAdmin = (req, res, next) => requireAuth(req, res, () => {
    if (req.user.role !== 'ADMIN') return res.status(403).json({ message: 'Administrator required' })
    return next()
})
module.exports = { requireAuth, requireAdmin }
