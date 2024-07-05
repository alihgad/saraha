import express from 'express'
import userRouter from './app/src/moduels/users/users.routes.js'
import { ErrorStatus } from './app/src/utils/errorStatus.js'
import messageRouter from './app/src/moduels/messages/messages.routes.js'
import connect from './app/DB/connection.js'
import cors from 'cors'
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use('/users',userRouter)
app.use('/messages',messageRouter)

app.get('/', (req, res) => res.send('Hello World!'))

app.use('*', (req, res,next) =>{
    next(new ErrorStatus('route not found'+' ' + req.originalUrl , 404))
   })

app.use((err,req,res,next)=>{
    res.status(err.status || 500).json({msg:'error', error:err.message})
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))