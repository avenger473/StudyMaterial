var express = require('express')
var router = express.Router()
var mongo=require('mongoose');
var bodyParser=require('body-parser');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })
// define the home page route

mongo.Promise=global.Promise;
mongo.connect("mongodb://localhost:27017/users", { useNewUrlParser: true });

var userSchema=new mongo.Schema({
    fullname : String,
    username: String,
    mobile: Number,
    email : String,
    password : String,
    isCoder: Boolean,
    spojhandle: String,
    hehandle: String,
    cfhandle: String,
    githandle: String
    })

var User=mongo.model("User", userSchema)

router.post('/login', (req,res)=>{
    console.log("post hoga")
    console.log(req.body);
    User.findOne({username: req.body.username}, (err,data)=>{
        if(err)
        throw err;

        if(req.body.password===data.password)
        {
            res.end(data.username);
        }

    })
});
router.post('/signup', (req, res) => {
    // var obj=req.body;
    console.log(req.body)
    // var user=new User(obj);
    User({
        fullname : req.body.fullname,
        username: req.body.username,
        mobile: req.body.mobile,
        email : req.body.email,
        password : req.body.password,
        isCoder: req.body.coder,
        spojhandle: req.body.spojhandle,
        hehandle: req.body.hehandle,
        cfhandle: req.body.cfhandle,
        githandle: req.body.githandle
    }).save((err,data)=>{
        if(err) {
            throw err;
        }
        else {
            
            console.log("Saved!!!");
            console.log(data);
            res.status(200);
        }
    })
})

router.get('/get-user/:username',(req,res)=>{
    console.log('aaya');
    User.findOne({username: req.params.username}, (err,data)=>{
        if(err)
        throw err;

        if(data)
        {
            res.json(data);
        }

    })
})
module.exports = router