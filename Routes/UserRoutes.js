const express = require('express')

const UserRouter = express.Router();

const UserModel = require('../Models/UserModel.js');

UserRouter.route('/:email').get((req,res,next) => {
    const useremail = req.params.email;
    const check=ValidateUser(useremail);
    if(check===true)
    {
        res.setHeader('Content-Type', 'application/json');
        res.send({"Message":"success"});
    }
    else
    {
        const response=AddUser(useremail)
        if(response==true)
        {
            res.setHeader('Content-Type', 'application/json');
            res.send({"Message":"success"});
        }
        else{
            res.setHeader('Content-Type', 'application/json');
            res.send({'Message': 'error'});
        }
    }
})


function ValidateUser(useremail)
{
    UserModel.findOne({'email':useremail})
    .then((resp) => {
        if(resp==null)
        {
            return false;
        }
        return true;
    })
    .catch((err) => {
        return false;
    })
    return true;
}

function AddUser(useremail)
{
    const obj = {
        email: useremail
    }

    const u=new UserModel(obj);
    u.save()
    .then((resp) => {
        console.log("success");
        console.log(resp);
        return true;
    })
    .catch((Err) => {
        console.log(Err);
        return false;
    })
}

module.exports = UserRouter;