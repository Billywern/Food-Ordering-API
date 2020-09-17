import app from './src/connect'
const PORT = process.env.PORT || 8000;

process.on('uncaughtException', reason => {
  console.error('Uncaught exception', reason)
})

const server = app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
  if (process && process.send) {
    process.send('Ready')
  }
})

process.on('SIGINT', () => {
  server.close(error => {
    process.exit(error ? 1 : 0)
  })
})
