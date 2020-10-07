const express = require('express');

const sequelize = require('./database');
//models
const Schooldetail = require('./models/school_details');
const Form = require('./models/form');
const FilledForm = require('./models/filled_form');
const User = require('./models/user');
const School = require('./models/school');
//routers
const schoolRouter = require('./routers/school');
const schooldetailRouter = require('./routers/school_details');
const userRouter = require('./routers/user');
const formRouter = require('./routers/form');
const filledFormRouter = require('./routers/filled_form');

const app = express();
const port = process.env.PORT

app.use(express.json());//parse the incoming json data
app.use(schoolRouter);
app.use(schooldetailRouter);
app.use(userRouter);
app.use(formRouter);
app.use(filledFormRouter);

//associations
//user to filled form
FilledForm.belongsTo(User, { constraints: true});
User.hasMany(FilledForm);

//form to filled form
FilledForm.belongsTo(Form, { constraints: true});
Form.hasMany(FilledForm);

//school to filled form
FilledForm.belongsTo(School, { constraints: true});
School.hasMany(FilledForm);

//school to form
Form.belongsTo(School, { constraints: true});
School.hasMany(Form);

//school to Schooldetail
Schooldetail.belongsTo(School, { constraints: true})
School.hasOne(Schooldetail);

sequelize
  //.sync({force: true}) 
  .sync()
  .then(result => {
    // School.create({
    //   name: "Test1",
    //   email:"test1@test.com",
    //   password: "test1"
    // }).then((school)=>{
    //   school.createSchooldetail({
    //     name: "Test School",
    //     address: "testAdress",
    //     fees: "20000"
    //   })
    // });
    app.listen(port,()=>{
      console.log('Server is up on port',port)
    })  
  })
  .catch(err => {
    console.log(err);
  });