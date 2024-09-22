import express from "express"
import cookieParser from "cookie-parser" 
import { connectDB } from "./db/index.js"
import { upload } from "./middlewares/multer.middleware.js"

const app = express()

connectDB()
.then(() => {
    app.listen(process.env.PORT,() => {
        console.log(`Server listening at port ${process.env.PORT}`)
    })
})

app.use(express.json())
app.use(cookieParser())

// Routes Import 

import userRouter from "./routes/user.route.js"


// Routes Declaration

app.use('/api/v1/users',upload.none(),userRouter)


