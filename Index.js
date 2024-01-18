const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json())

//---------------Mentor and students---------------//
let mentors = []
let students = []


app.get('/', (req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' })
    res.end('<h1>Welcome to server</h1>')
})


//---------------Create a Mentors---------------//
app.post('/mentors', (req, res) => {
    try {
        const mentor = req.body
        mentor.id = mentors.length + 1
        mentors.push(mentor)
        res.json(mentors);
    }
    catch (error) {
        res.send({
            error: error.message
        })
    }
})

//---------------Create a Students---------------//
app.post('/students', (req, res) => {
    try {
        const student = req.body
        student.id = students.length + 1
        students.push(student)
        res.json(students);
    }
    catch (error) {
        res.send({
            error: error.message
        })
    }
})


//---------------Assign students to a mentor---------------//
app.post('/mentors/:mentorId/assign-student', (req, res) => {
    
    try {
        const { mentorId } = req.params
        const { studentId } = req.body
        
        const mentor = mentors.find(mnt => mnt.id == mentorId)
        
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' })
        }
        
        mentor.students = mentor.students || []
        mentor.students.push(studentId)
        
        res.json({ message: 'Student assigned to mentor sucessfully' })
        
    }
    catch (error) {
        res.send({
            error: error.message
        })
    }
})


//---------------Add multiple students to mentor---------------//
app.post('/mentors/:mentorId/add-multiple-students', (req, res) => {
    
    try {
        const { mentorId } = req.params
        const studentIds = req.body.studentsIds
        const mentor = mentors.find(mnt => mnt.id == mentorId);
        
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found.' })
        }
        
        studentIds.forEach(studentId => {
            const student = students.find(s => s.id == studentId);
            if (student) {
                student.mentorId = mentor.id;
            }
        });
        res.json({ message: 'Students added to mentor successfully.' })
        
    }
    catch (error) {
        res.send({
            error: error.message
        })
    }
    
})


//---------------change Mentor for a particular student---------------//
app.put('/students/:studentId/assign-mentor', (req, res) => {
    
    try {
        const { studentId } = req.params;
        const { mentorId } = req.body;
        
        console.log(studentId)
        console.log(mentorId)
        const student = students.find(s => s.id == studentId);
        const mentor = mentors.find(m => m.id == mentorId);
        
        if (!student || !mentor) {
            return res.status(404).json({ message: 'Student or mentor not found.' });
        }
        
        student.mentorId = mentor.id;
        
        res.json({ message: 'Mentor assigned to student successfully.' });
        
    }
    catch (error) {
        res.send({ message: error.message })
    }
    
})


//---------------Select One Student and Assign One Mentor---------------//
app.post('/students/:studentId/assign-mentor', (req, res) => {
    
    try {
        const { studentId } = req.params
        const { mentorId } = req.body
        
        const student = students.find(stu => stu.id == studentId)
        const mentor = mentors.find(mnt => mnt.id == mentorId)
        
        if (!student || !mentor) {
            return req.status(400).send({ message: 'Student or mentor not Found' })
        }
        
        student.mentorId = mentor.id
        
        res.send({ message: 'Mentoe assigned to student sucessfully' })

    }
    catch (error) {
        res.send({
            error: error.message
        })
        
    }
    
    
})


//------------Show All Students for a Particular Mentor API-------------//
app.get('/mentors/:mentorId/students', (req, res) => {
    
    try {
        const { mentorId } = req.params;
        const mentor = mentors.find(m => m.id == mentorId);
        
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found.' });
        }
        
        const mentorStudents = students.filter(student => student.mentorId == mentor.id);
        
        res.json({ students: mentorStudents });

    }
    catch (error) {
        res.send({ error: error.message })
    }
    
});


const port = 3000
app.listen(port, () => console.log('server connected sucessful'))