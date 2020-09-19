import express from 'express'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})
app.get('/', (_req, res) => res.sendStatus(200))
app.get('/ping', (_req, res) => {
  res.send({
    message: 'Hello, it is up and running'
  })
})

export default app

require('./controllers/restaurants')