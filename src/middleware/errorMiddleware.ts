// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-unused-vars
export const errorMiddleware = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err.stack)
  res.status(500).send('Something broke!')
}
