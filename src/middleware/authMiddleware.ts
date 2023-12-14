import payload from 'payload'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any
export const authMiddleware = (req: any, res, next) => {
  // Note: Payload must be initialized before the `payload.authenticate` middleware can be used
  payload.authenticate(req, res, function (error) {
    if (error || !req.user) {
      return res.redirect('/admin/login')
    }

    return next()
  })
}
