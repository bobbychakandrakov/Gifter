var express=require('express');
var bodyParser=require('body-parser');
var morgan=require('morgan');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User   = require('./models/user'); // get user mongoose model
var mongoose=require('mongoose');
var app=express();
// =========================================================================================
// configuration

var port = process.env.PORT || 8080;
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));
// ===================================routes ========================================
// basic route
app.get('/',function(req,res){
    res.render('index.ejs');
});
var apiRoutes = express.Router();
// --------------------------------API ROUTES ---------------------------------------------------------------------



//POST localhost:8080/api/login
apiRoutes.post('/login', function(req, res) {
    User.findOne({username:req.body.username, password: req.body.password}, function(err, user) {
        if (err) {
            res.json({
                success: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                res.json({
                   success : true,
                    username: user.username,
                    id:user.id,
                    token: user.token
                });
            } else {
                res.json({
                    success: false,
                    data: "Incorrect email/password or username"
                });
            }
        }
    });
});

//register user
//POST localhost:8080/api/register
apiRoutes.post('/register', function(req, res) {
    User.findOne({username:req.body.username,email: req.body.email, password: req.body.password}, function(err, user) {
        if (err) {
            res.json({
                success: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                res.json({
                    success: false,
                    data: "User already exists!"
                });
            } else {
                var userModel = new User();
                userModel.username = req.body.username;
                userModel.email = req.body.email;
                userModel.password = req.body.password;
                userModel.save(function(err, user) {
                    user.token = jwt.sign(user, config.secret);
                    user.save(function(err, user1) {
                        res.json({
                            success: true

                        });
                    });
                })
            }
        }
    });
});
apiRoutes.get('/me', ensureAuthorized, function(req, res) {
    User.findOne({token: req.token}, function(err, user) {
        if (err) {
            res.json({
                success: false,
                data: "Error occured: " + err
            });
        } else {
            res.json({
                success: true,
                data: user
            });
        }
    });
});
apiRoutes.put('/profile/:id',function(req, res) {

    User.findById(req.params.id, function(err, user) {
        if (err)
            res.send(err);
        user.username = req.body.username;
        user.email=req.body.email;
        user.password=req.body.password;
        // Save the beer and check for errors
        user.save(function(err) {
            if (err)
                res.json(
                    {
                        success: false,
                        data: "Error occured: " + err
                    }
                );

            res.json({
                    success: true

                }
            );
        });
    });
});
apiRoutes.put('/username/:id',function(req, res) {

    User.findById(req.params.id, function(err, user) {
        if (err)
            res.send(err);
        user.username = req.body.username;
        user.email=user.email;
        user.password=user.password;
        // Save the beer and check for errors
        user.save(function(err) {
            if (err)
                res.json(
                    {
                        success: false,
                        data: "Error occured: " + err
                    }
                );

            res.json({
                    success: true

                }
            );
        });
    });
});
apiRoutes.put('/email/:id',function(req, res) {

    User.findById(req.params.id, function(err, user) {
        if (err)
            res.send(err);
        user.username = user.username;
        user.email=req.body.email;
        user.password=user.password;
        // Save the beer and check for errors
        user.save(function(err) {
            if (err)
                res.json(
                    {
                        success: false,
                        data: "Error occured: " + err
                    }
                );

            res.json({
                    success: true

                }
            );
        });
    });
});
apiRoutes.put('/password/:id',function(req, res) {

    User.findById(req.params.id, function(err, user) {
        if (err)
            res.send(err);
        user.username = user.username;
        user.email=user.email;
        user.password=req.body.password;
        // Save the beer and check for errors
        user.save(function(err) {
            if (err)
                res.json(
                    {
                        success: false,
                        data: "Error occured: " + err
                    }
                );

            res.json({
                    success: true

                }
            );
        });
    });
});
function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
    }
}


app.use('/api', apiRoutes);
// start the server
// =======================
app.listen(port);
module.exports = app;
