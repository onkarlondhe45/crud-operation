const express = require('express');
const bodyParser = require('body-parser'); 

const app = express();

const studentData = require('./studentData.json');

app.use(bodyParser.json()); // Middleware to parse JSON bodies

app.get('/', function(req, res){
    res.send("<h1>Hello Guy's....!</h1>");
});


//get all students data
app.get('/getAllStudents', function(req, res){
    return res.json(studentData);
});


//get student data by id
app.get('/getStudentById/:id', (req, res)=>{
    const id = Number(req.params.id);
    const student = studentData.find((student)=>student.id === id);
    return res.json(student);
});


//create new student 
app.post('/createStudent', (req, res)=>{
    const body = req.body;

    studentData.push({
        id: body.id,
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        city: body.city
    }
    );
    res.send("Student Created Successfully...!");
});


//Delete Student By Id
app.delete('/deleteStudentById/:id', (req, res)=>{
    const id = Number(req.params.id);
    const index = studentData.findIndex((student)=>student.id === id);
    if(index!==-1){
        studentData.splice(index,1);
        res.send("Student Deleted Successfully...!");
    }
})


//Update Student By Id
app.patch('/updateStudentById/:id',(req, res)=>{
    const id = Number(req.params.id);

    const index = studentData.findIndex((student)=>student.id === id);

    const body = req.body;

    if(index!==-1){
        
        const student = studentData[index];

        if (body.id !== undefined) student.id = body.id;
        if (body.first_name !== undefined) student.first_name = body.first_name;
        if (body.last_name !== undefined) student.last_name = body.last_name;
        if (body.email !== undefined) student.email = body.email;
        if (body.city !== undefined) student.city = body.city;

        res.send("Student Updated Successfully...!");
    }
});

app.listen(3000);