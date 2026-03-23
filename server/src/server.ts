import express from 'express'
import { apiRouter } from './routes/api/auth'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())

app.use('/api', apiRouter)
app.get('/', (req, res) => {
    res.send('ok')
})

app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT + '...')
})