import express from 'express'
import cors from 'cors'
import { NewInteractions } from './Controllers'
import Env from './Env'
import { ErrorMiddleware, SignatureMiddleware } from './Middleware'

const app = express()

app.use(express.json())
// app.use(cors())

app.post('/api/interactions', SignatureMiddleware, NewInteractions)
app.use(ErrorMiddleware)

const port = Env.port
app.listen(port, () => console.log(`Listening on port ${port}`))