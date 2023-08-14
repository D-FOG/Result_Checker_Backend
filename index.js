const express = require('express');
const db = require('./db')
require('dotenv').config();
const studentRoute = require('./Routes/studentsRoutes/student')
const adminRoute = require('./Routes/adminRoutes/admin') 
const courseRoute = require('./Routes/coursesRoutes/course')
const resultRoute = require('./Routes/resultRoutes/grade')
const studentGradeRoute = require('./Routes/studentGradeRoute/studentGradeRoute')
const studentLoginRoute = require('./Routes/studentLoginRoute/studentLoginRoute')
const cors = require('cors')
const verifyEmailRoute = require('./Routes/verifyEmailRoute/verifyEmailRoute')
const adminLoginRoute = require('./Routes/adminLoginRoute/adminLoginRoute')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());


app.get('/', (req, res) => {
    res.send("hello ma world");
})

app.use('/students', studentRoute)
app.use('/admin', adminRoute)
app.use('/course', courseRoute)
app.use('/results', resultRoute)
app.use('/Grade', studentGradeRoute)
app.use('/verify-email', verifyEmailRoute)
app.use('/studentLogin', studentLoginRoute)
app.use('/adminLogin', adminLoginRoute)

const options = {
    definition:{
        openapi:'3.0.0',
        info: {
            title: 'Result Checker Backend Docs',
            version: '1.0.0',
            description: 'This is the API documentation of the result checker backend api it contains all the endpoints and responses with their respective status codes.'
        },
        servers: [
            {
                url: 'https://result-backend.onrender.com'
,            },
        ],
    },
    apis: ['./Routes/**/*.js'],
};

const specs = swaggerJSDoc(options);

app.use('/result-docs', swaggerUI.serve, swaggerUI.setup(specs))

db()


console.log(process.env.PORT);

//Routes Importing

port = process.env.PORT;

Port = port || 3000;

app.listen(Port, () => {
    console.log("I am listening on port " + Port)
})



