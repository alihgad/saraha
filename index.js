import express from 'express'
import { ErrorStatus } from './src/app/utils/errorStatus.js'
import messageRouter from './src/app/moduels/messages/messages.routes.js'
import cors from 'cors'
import connect from './src/app/DB/connection.js'
import userRouter from './src/app/moduels/users/users.routes.js'
const app = express()
const port = process.env.PORT || 3000

connect()  // connecting to database

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