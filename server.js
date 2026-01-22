require('dotenv').config();
const express=require('express');
const corsOptions=require('./config/corsOptions');
const app=express();
const path=require('path');


const mongoose=require('mongoose');
const cors=require('cors');
const connectDB=require('./config/dbConn');
const credentials=require('./middleware/credentials');
const cookieParser=require('cookie-parser');
const PORT=process.env.PORT||3000;
connectDB();
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended:false }));
app.use(express.json());
app.use(cookieParser());
app.use('/',express.static(path.join(__dirname,'public')));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use('/',require('./routes/root'));

app.use('/register',require('./routes/api/register'));
app.use('/auth',require('./routes/api/auth'));
app.use('/refresh',require('./routes/api/refresh'));
app.use('/logout',require('./routes/api/logout'));
app.use('/',require('./routes/api/templeroutes'));
app.use('/',require('./routes/api/blooddonorroutes'));
app.use('/',require('./routes/api/communityissues'));

mongoose.connection.once('open',()=>{
    console.log('connected to mongodb');
    app.listen(PORT,()=>console.log(`server running on ${PORT}`));
})