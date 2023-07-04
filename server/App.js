const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require("./db/conn");
const bcrypt = require("bcrypt")
const saltRounds = 10
app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json());
const employee = require("./models/User.js");
app.post('/api/contact', async (req, res) => {
  // Process the form data received from the client
  const contactData = req.body;
 name=contactData.name;
 email=contactData.email;
 password=contactData.password;
 gender=contactData.gender;
 const addStudent = new employee({
  name,
  email,
  password,
  gender,
});
await addStudent.save();
  res.status(200).json({ message: 'Contact created successfully' });
});
app.get("/getData", async (req, res) => {
 
    const studentData = await employee.find();
    res.status(201).json(studentData);
  
});
app.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const updatedStudent = await employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(201).json(updatedStudent);
  } catch (error) {
    res.status(422).json(error);
  }
});
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedStudent = await employee.findByIdAndDelete({ _id: id });
    res.status(201).json(deletedStudent);
  } catch (error) {
    res.status(422).json(error);
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
