require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const server = express();
const path = require('path');
const productRouter = require('./routes/product')
const userRouter = require('./routes/user')

console.log('env',process.env.DB_PASSWORD);

// db connection and use it in local machine
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('Database connected');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// schema is a one type of configuration



//bodyParser
server.use(cors());
server.use(express.json());
server.use(morgan('default'));
// run the static content
server.use(express.static(path.resolve(__dirname,process.env.PUBLIC_DIR)));
server.use('/products',productRouter.router);
server.use('/users',userRouter.router);
// server.use("*",(req,res)=>{
//   res.sendFile(__dirname+'/build/index.html')
// })
server.use("*",(req,res)=>{
  res.sendFile(path.resolve(__dirname,'build','index.html'))
})

server.listen(process.env.PORT, () => {
  console.log('server started');
});
