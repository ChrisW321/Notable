require('dotenv').config();
const express = require('express');
const parser = require('body-parser')

const app = express();

const port = process.env.PORT || 4075;

app.use('/', express.static('./public'));
app.use(parser.json());



const physicians = {
    'Julius Hibbert': {
        patients: [
            {name: 'sterling', time: '8:00 am', type: 'new Patient'},
            {name: 'sterlint', time: '8:30 am', type: 'new Patient'},         
        ],
        email: 'genericemail@gmail.com',
    },
    'Chris Wildenradt': {
        patients:[
            {name: 'sterling', time: '8:30 am', type: 'new Patient'},
            {name: 'sterlint', time: '8:00 am', type: 'new Patient'},
        ],
        email: 'christopherkwildenradt@gmail.com',
    }
};

app.get('/calendar/physicians', (req, res) => {
    const physiciansList = Object.keys(physicians);
    res.send(physiciansList);
})

app.get('/calendar/:physicianID', (req, res) => {
    const { physicianID } = req.params;
    const patients = physicians[physicianID].patients;
    res.send(patients);
})

  app.listen(port, () => console.log(`Listening on port http://127.0.0.1:${port}`))
