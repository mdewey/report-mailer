// Require:
// Postmark stuff
import postmark = require("postmark");

const client = new postmark.ServerClient("d94d87f4-9883-4d13-bcbd-7b7fab6ea0f9");

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


var today = format(
    new Date(),
    'MM/DD/YYYY'
);

students.forEach(student => {
    const _fileName: string = `${student.firstName}.pdf`;
    const _reportData: string = base64_encode(`${__dirname.replace("build", "data")}\\reports\\${_fileName}`);
    client.sendEmail({
        "From": "mark@suncoast.io",
        "To": "mark@suncoast.io",
        "Subject": `Progress Report for ${today}`,
        "HtmlBody": `Hello, ${student.firstName} <br/> Attached is your progress report!`,
        "Attachments": [
            new postmark.Attachment(_fileName, _reportData, "application/pdf")
        ]
    });
})