// Require:
// Postmark stuff
import postmark = require("postmark");

import * as dotenv from "dotenv";
dotenv.config();

const client = new postmark.ServerClient(process.env.EMAIL_API_KEY);

import format = require('date-fns/format')
import fs = require("fs");

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

import Student from './student';

const _data:Array<{name:string, email:string}> =  require("../data/students.json"); 
const students:Array<Student> = _data.map(m => new Student(m.name, m.email));


var today = format(new Date(),'MM/DD/YYYY');

students.forEach(student => {
    const _fileName: string = `${format(new Date(),'MM_DD_YYYY')} ${student.fullName}.pdf`;
    const _reportData: string = base64_encode(`${__dirname.replace("build", "data")}/reports/${_fileName}`);
    console.log({message:"sending email", student, _fileName})
    client.sendEmail({
        "From": "mark@suncoast.io",
        "Bcc":"toni@suncoast.io",
        "To": student.email,
        "Subject": `Progress Report for ${today}`,
        "HtmlBody": `Hello, ${student.firstName} <br/> Attached is your progress report!`,
        "Attachments": [
            new postmark.Attachment(_fileName, _reportData, "application/pdf")
        ]
    }).then( _ => {
        console.log({message:"email sent", student:student.fullName});
    });
})