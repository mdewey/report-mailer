// Require:
// Postmark stuff
import postmark = require("postmark");
const client = new postmark.ServerClient("d94d87f4-9883-4d13-bcbd-7b7fab6ea0f9");

import format = require('date-fns/format')
import fs = require("fs");

import Student from './student';
import data from '../data.students.json';



// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

// Send an email:

const students: Array<Student> = [
    new Student("Billy Bob", "mtdewey55@gmail.com")
]

var today = format(
    new Date(),
    'MM/DD/YYYY'
);


students.forEach(student => {
    const _fileName: string = `${student.firstName}.pdf`;
    const _reportData: string = base64_encode(`${__dirname}\\reports\\${_fileName}`);
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