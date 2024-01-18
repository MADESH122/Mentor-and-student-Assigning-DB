//---------------ADD Mentor---------------//
url = /mentors
Method = post
send = {
    "name":"****'
}


//---------------ADD Students---------------//
url = /students
Method = post
send = {
    "name":"****'
}


//---------------Assign students to a mentor---------------//
url = /mentors/:mentorId/assign-student
Method = post

Params = mentorId  // example  value = "1" 
body ={
    "studentid": 1
}


//---------------Add multiple students to mentor---------------//
url = /mentors/:mentorId/add-multiple-students
Method = post

Params = mentorId  // example value = "1" 
body ={
    "studentids": [ 1,2,3 ]
} 


//---------------change Mentor for a particular student---------------//
url = /students/:studentId/assign-mentor
Method = put

Params = studentId  // example value = "1" 
body ={
    "mentorId": 1
} 


//---------------Select One Student and Assign One Mentor---------------//
url = /students/:studentId/assign-mentor
Method = post

Params = studentId  // example value = "1" 
body ={
    "mentorId": 1
} 


//------------Show All Students for a Particular Mentor API-------------//
url = /students/:studentId/assign-mentor
Method = post

Params = mentorId  // example value = "1" 
