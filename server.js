var express=require('express');
var bodyParser=require('body-parser');
var morgan=require('morgan');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User   = require('./models/user'); // get user mongoose model
var Person   = require('./models/person'); // get user mongoose model
var Gift   = require('./models/gift'); // get user mongoose model
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
app.get('/',function(req,res){
    res.render('index.ejs');
});

var apiRoutes = express.Router();
var publicRoutes=express.Router();
app.use('/auth',publicRoutes);
app.use('/api', apiRoutes);
// --------------------------------auth ROUTES{public routes} ---------------------------------------------------------------------
//POST localhost:8080/auth/login
publicRoutes.post('/login', function(req, res) {
    User.findOne({username:req.body.username, password: req.body.password}, function(err, user) {
        if (err)
        {
            res.status(404);
            res.json
            (
                {
                success: false,
                data: "Error occured: " + err
                }
            );
        }
        else
        {
            if (user)
            {
                res.json
                (
                    {
                        success : true,
                        username: user.username,
                        id:user.id,
                        token: user.token
                    }
                );
            }
            else
            {
                res.status(404);
                res.json
                (
                    {
                    success: false,
                    data: "Incorrect password or username"
                     }
                );
            }
        }
    });
});
//register user
//POST localhost:8080/auth/register
publicRoutes.post('/register', function(req, res)
{
    User.findOne({username:req.body.username}, function(err, user)
    {
        if (err)
        {
            res.status(404);
            res.json
            (
                {
                success: false,
                data: "Error occured: " + err
                }
            );
        }
        else
        {
            if (user)
            {
                res.status(404);
                res.json
                (
                    {
                    success:false,
                    data:'username already exist'
                    }
                );
            }
            else
            {
                User.findOne({ email: req.body.email}, function (err, user){
                    if (err)
                    {
                        res.status(404);
                        res.json
                        (
                            {
                            success: false,
                            data: "Error occured: " + err
                            }
                        );
                    }
                    else
                    {
                        if(user)
                        {
                            res.status(404);
                            res.json
                            (
                                {
                                success:false,
                                data:'email already exist'
                                }
                            );
                        }
                        else
                        {
                            var userModel = new User();
                            userModel.username = req.body.username;
                            userModel.email = req.body.email;
                            userModel.password = req.body.password;
                            userModel.save(function(err, user)
                            {
                                user.token = jwt.sign(user, config.secret, { expiresIn: 12*4*7*24*60*60 });
                                user.save(function(err, user1)
                                {
                                    if (err)
                                    {
                                        res.status(404);
                                        res.json
                                        (
                                            {
                                            success: false,
                                            data: "Error occured: " + err
                                            }
                                        )
                                    }
                                    else
                                    {
                                        res.status(201);
                                        res.json
                                        (
                                            {
                                            success: true
                                            }
                                        );
                                    }
                                }
                                );
                            }
                            )
                        }
                    }
                    }
                );
            }
        }
     }
    );
});
//middleware to protect our api routes
apiRoutes.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['gifter-access-token'];
    if (token)
    {
        jwt.verify(token, app.get('superSecret'), function(err, decoded)
        {
            if (err)
            {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else
            {
                req.decoded = decoded;
                next();
            }
         }
        );
    }
    else
    {
        return res.status(403).send
        (
            {
                success: false,
                message: 'No token provided.'
            }
        );
    }
});
//============================api routs{protected by gifter-access-token}===================================
apiRoutes.put('/profile/:id',function(req, res)
{
    User.findById(req.params.id, function(err, user)
    {
        if (err)
            {
            res.status(404);
            res.json
            (
                {
                success:false,
                data:err
                }
            );
        }
        else
        {
            user.username = req.body.username;
            user.email=req.body.email;
            user.password=req.body.password;
            user.save(function(err)
            {
                if (err)
                {
                    res.status(404);
                    res.json(
                        {
                            success: false,
                            data: "Error occured: " + err
                        }
                    );
                }
                else
                {
                    res.json
                    (
                        {
                            success: true
                        }
                    );
                }

            });
        }

    });
});
apiRoutes.put('/username/:id',function(req, res) {
    User.findById(req.params.id, function(err, user)
    {
        if (err)
        {
            res.status(404);
            res.json
            (
                {
                    success:false,
                    data:err
                }
            );
        }
        else
        {
            user.username = req.body.username;
            user.email=user.email;
            user.password=user.password;
            user.save(function(err) {
                if (err)
                {
                    res.status(404);
                    res.json
                    (
                        {
                            success: false,
                            data: "Error occured: " + err
                        }
                    );
                }
                else
                {
                    res.json
                    (
                        {
                            success: true
                        }
                    );
                }

            });
        }


    });
});
apiRoutes.put('/email/:id',function(req, res)
{
    User.findById(req.params.id, function(err, user)
    {
        if (err)
        {
            res.status(404);
            res.json
            (
                {
                    success:false,
                    data:err
                }
            );
            user.username = user.username;
            user.email=req.body.email;
            user.password=user.password;
        }

        user.save(function(err)
        {
            if (err)
            {
                res.status(404);
                res.json
                (
                    {
                        success: false,
                        data: "Error occured: " + err
                    }
                );
            }
            else
            {
                res.json
                (
                    {
                        success: true
                    }
                );
            }
            }



        );
        }
    );
    }
);
apiRoutes.put('/password/:id',function(req, res)
{

    User.findById(req.params.id, function(err, user)
    {
        if (err)
        {
            res.status(404);
            res.json
            (
                {
                success: false,
                data: err
                }
            );
        }

        user.username = user.username;
        user.email=user.email;
        user.password=req.body.password;
        user.save(function(err)
        {
            if (err)
            {
                res.status(404);
                res.json
                (
                    {
                        success: false,
                        data: "Error occured: " + err
                    }
                );
            }
            else
            {
                res.json
                (
                    {
                        success: true
                    }
                );
            }

        }
        );
    }
    );
}
);
//===============person============
apiRoutes.post('/person', function(req, res)
{
    User.findOne({token:req.headers['gifter-access-token']}, function (err, user) {
        if (err) {
            res.status(404);
            res.json
            (
                {
                success: false,
                data: "Error occured: " + err
                }
            );
        }
        else
        {
            if (user)
            {
                var personModel= new Person();
                personModel.name = req.body.name;
                personModel.owner_id = user.id;
                personModel.save(function(err, person)
                {
                    person.save(function(err, person1)
                        {
                            res.status(201);
                            res.json
                            (
                                {
                                    success: true,
                                    name:person1.name
                                }
                            );
                        }
                    );
                })
            }
            else
            {
                res.status(404);
                res.json
                (
                    {
                    success: false
                    }
                );
            }
        }
    }
    );
}
);
apiRoutes.get('/person', function(req, res)
{
    User.findOne({token:req.headers['gifter-access-token']}, function (err, user)
    {
        if (err)
        {
            res.status(404);
            res.json
            (
                {
                success: false,
                data: "Error occured: " + err
                }
            );
        }
        else
        {
            if (user)
            {
                Person.find({owner_id:user.id}, function(err, person)
                {
                    if (err)
                    {
                        res.status(404);
                        res.json(
                            {
                            success: false,
                            data: "Error occured: " + err
                            }
                        );
                    }
                    else
                    {
                        if (person)
                        {
                            res.json
                            (
                                {
                                success: true,
                                people:person
                                }
                            );
                        }
                        else
                        {
                            res.status(404);
                            res.json
                            (
                                {
                                success:false,
                                data:"No people for this user"
                                 }
                            );
                        }
                    }
                }
                );
            }
            else
            {
                res.status(404);
                res.json
                (
                    {
                    success: false
                     }
                );
            }
        }
    });

}
);
apiRoutes.get( '/person/:id', function( req, res ) {
    Person.findById(req.params.id, function(err, person)
    {
        if (err)
        {
            res.status(404);
            res.json
            (
                {
                    success: false,
                    data: "Error occured: " + err
                 }
            );
        }
        else
        {
            if (person)
            {
                res.json
                (
                    {
                        success: true,
                        id:person.id,
                        name:person.name
                     }
                );
            }
            else
            {
                res.status(404);
                res.json
                (
                    {
                        success:false,
                        data:"No person for this user"
                     }
                );
            }
        }
    });
});
apiRoutes.put('/person/:id',function(req, res)
{
    Person.findById(req.params.id, function(err, person)
    {
        if (err)
        {
            res.json
            (   {
                success: false,
                data:err
                }
            );
        }
        else{
            person.name = req.body.name;
            person.save(function(err)
            {
                if (err)
                {
                    res.status(404);
                    res.json
                    (
                        {
                            success: false,
                            data: "Error occured: " + err
                        }
                    );
                }
                else
                {
                    res.json
                    (
                        {
                            success: true,
                            name:person.name
                        }
                    );
                }


            });
        }
    });
});
apiRoutes.delete('/person/:id',function(req, res)
{
    Person.findByIdAndRemove(req.params.id, function(err)
    {
        if (err)
        {
            res.status(404);
            res.json
            (
                {
                success: false,
                data: "Error occured: " + err
                }
            );
        }
        else
        {
            res.json({ success: true });
        }
    });
});
//===============Gifts=======================================
apiRoutes.post('/gift/:id', function(req, res)
{
    User.findOne({token:req.headers['gifter-access-token']}, function (err, user)
    {
        if (err)
        {
            res.status(404);
            res.json
            (
                {
                    success: false,
                    data: "Error occured: " + err
                }
            );
        }
        else
        {
            if (user)
            {

                Person.findById(req.params.id, function(err,person)
                {
                    if (err)
                    {
                        res.status(404);
                        res.json
                        (
                            {
                                success: false,
                                data: "Error occured: " + err
                            }
                        );
                    }
                    if(person)
                    {
                        var giftModel = new Gift();
                        giftModel.name = req.body.name;
                        giftModel.price = req.body.price;
                        giftModel.owner_id = req.params.id;
                        giftModel.x=req.body.x;
                        giftModel.y=req.body.y;
                        giftModel.ownerName=person.name;
                        giftModel.username=user.username;
                        giftModel.save(function (err, gift)
                            {
                                if (err)
                                {
                                    res.status(404);
                                    res.json
                                    (
                                        {
                                            success: false,
                                            data: "Error occured: " + err
                                        }
                                    );
                                }
                                else
                                {
                                    gift.save(function (err, gift1)
                                    {
                                        if (err)
                                        {
                                            res.status(404);
                                            res.json
                                            (
                                                {
                                                    success: false,
                                                    data: "Error occured: " + err
                                                }
                                            );
                                        }
                                        else
                                        {
                                            res.status(201);
                                            res.json
                                            (
                                                {
                                                    success: true
                                                }
                                            );
                                        }

                                    });
                                }
                            }
                        );
                    }
                    else
                    {
                        res.status(404);
                        res.json
                        (
                            {
                                success:false,
                                data:"person cannot be found"
                            }
                        )
                    }
                });

            }
            else
            {
                success:false
            }

        }})
});
apiRoutes.put('/gift/:id',function(req, res)
{
    Gift.findById(req.params.id, function(err, gift)
    {
        if (err)
        {
            res.status(404);
            res.json
            (
                {
                    success:false,
                    data:err
                }
            );
        }
        else
        {
            gift.name = req.body.name;
            gift.price=req.body.price;
            gift.x=req.body.x;
            gift.y=req.body.y;
            gift.owner_id=req.body.owner;
            gift.save(function(err)
            {
                if (err)
                {
                    res.status(404);
                    res.json
                    (
                        {
                            success: false,
                            data: "Error occured: " + err
                        }
                    );
                }
                else
                {
                    res.json
                    (
                        {
                            success: true,
                            name:gift.name,
                            price:gift.price,
                            x:gift.x,
                            y:gift.y,
                            owner:gift.owner_id
                        }
                    );
                }
            });
        }
    });
});
apiRoutes.put('/gift/name/:id',function(req, res)
{
    Gift.findById(req.params.id, function(err, gift)
    {
        if (err)
        {
            res.status(404);
            res.json
            (
                {
                    success:false,
                    data:err
                }
            );
        }
        else
        {
            gift.name = req.body.name;
            gift.save(function(err)
            {
                if (err)
                {
                    res.status(404);
                    res.json
                    (
                        {
                            success: false,
                            data: "Error occured: " + err
                        }
                    );
                }
                else
                {
                    res.json
                    (
                        {
                            success: true,
                            name:gift.name,
                            price:gift.price,
                            x:gift.x,
                            y:gift.y,
                            owner:gift.owner_id
                        }
                    );
                }
            });
        }
    });
});
apiRoutes.put('/gift/owner/:id',function(req, res)
{
    Gift.findById(req.params.id, function(err, gift)
    {
        if (err)
        {
            res.status(404);
            res.json
            (
                {
                    success:false,
                    data:err
                }
            );
        }
        else
        {
            gift.owner_id = req.body.owner;
            gift.save(function(err)
            {
                if (err)
                {
                    res.status(404);
                    res.json
                    (
                        {
                            success: false,
                            data: "Error occured: " + err
                        }
                    );
                }
                else
                {
                    res.json
                    (
                        {
                            success: true,
                            name:gift.name,
                            price:gift.price,
                            x:gift.x,
                            y:gift.y,
                            owner:gift.owner_id
                        }
                    );
                }
            });
        }
    });
});
apiRoutes.put('/gift/address/:id',function(req, res)
{
    Gift.findById(req.params.id, function(err, gift)
    {
        if (err)
        {
            res.status(404);
            res.json
            (
                {
                    success:false,
                    data:err
                }
            );
        }
        else
        {
            gift.x = req.body.x;
            gift.y = req.body.y;
            gift.save(function(err)
            {
                if (err)
                {
                    res.status(404);
                    res.json
                    (
                        {
                            success: false,
                            data: "Error occured: " + err
                        }
                    );
                }
                else
                {
                    res.json
                    (
                        {
                            success: true,
                            name:gift.name,
                            price:gift.price,
                            x:gift.x,
                            y:gift.y,
                            owner:gift.owner_id
                        }
                    );
                }
            });
        }
    });
});
apiRoutes.put('/gift/price/:id',function(req, res)
{
    Gift.findById(req.params.id, function(err, gift)
    {
        if (err)
        {
            res.status(404);
            res.json
            (
                {
                    success:false,
                    data:err
                }
            );
        }
        else
        {
            gift.price = req.body.price;
            gift.save(function(err)
            {
                if (err)
                {
                    res.status(404);
                    res.json
                    (
                        {
                            success: false,
                            data: "Error occured: " + err
                        }
                    );
                }
                else
                {
                    res.json
                    (
                        {
                            success: true,
                            name:gift.name,
                            price:gift.price,
                            x:gift.x,
                            y:gift.y,
                            owner:gift.owner_id
                        }
                    );
                }
            });
        }
    });
});
apiRoutes.delete('/gift/:id',function(req, res)
{
    Gift.findByIdAndRemove(req.params.id, function(err)
    {
        if (err)
        {
            res.status(404);
            res.json
            (
                {
                    success: false,
                    data: "Error occured: " + err
                }
            );
        }
        else
        {
            res.json({ success: true });
        }
    });
});
apiRoutes.get('/gifts/:id', function(req, res)
{
    Person.findById(req.params.id, function (err, person)
    {
        if (err)
        {
            res.status(404);
            res.json
            (
                {
                    success: false,
                    data: "Error occured: " + err
                }
            );
        }
        else
        {
            if (person)
            {
                Gift.find({owner_id:person.id}, function(err, gift)
                {
                    if (err)
                    {
                        res.status(404);
                        res.json
                        (
                            {
                                success: false,
                                data: "Error occured: " + err
                            }
                        );
                    }
                    else
                    {
                        if (gift)
                        {
                            res.json
                            (
                                {
                                    success: true,
                                    gifts:gift,
                                    person:person.name

                                }
                            );
                        }
                        else
                        {
                            res.status(404);
                            res.json
                            (
                                {
                                    success:false,
                                    data:"No gifts for this person"
                                }
                            );
                        }
                    }
                });
            }
            else
            {
                res.json
                (
                    {
                        success: false
                    }
                );
            }
        }
    });
});
apiRoutes.get( '/gift/:id', function( req, res ) {
    Gift.findById(req.params.id, function(err, gift)
    {
        if (err)
        {
            res.status(404);
            res.json
            (
                {
                    success: false,
                    data: "Error occured: " + err
                }
            );
        }
        else
        {
            if (gift)
            {
                res.json
                (
                    {
                        success: true,
                        id:gift.id,
                        name:gift.name,
                        price:gift.price,
                        x:gift.x,
                        y:gift.y
                    }
                );
            }
            else
            {
                res.status(404);
                res.json
                (
                    {
                        success:false,
                        data:"Gift cannot be found"
                    }
                );
            }
        }
    });
});
apiRoutes.get('/gifts', function(req, res)
    {
        User.findOne({token:req.headers['gifter-access-token']}, function (err, user)
        {
            if (err)
            {
                res.status(404);
                res.json
                (
                    {
                        success: false,
                        data: "Error occured: " + err
                    }
                );
            }
            else
            {
                if (user)
                {
                    Gift.find({username:user.username}, function(err, gift)
                        {
                            if (err)
                            {
                                res.status(404);
                                res.json(
                                    {
                                        success: false,
                                        data: "Error occured: " + err
                                    }
                                );
                            }
                            else
                            {
                                if (gift)
                                {
                                    res.json
                                    (
                                        {
                                            success: true,
                                            gift:gift
                                        }
                                    );
                                }
                                else
                                {
                                    res.status(404);
                                    res.json
                                    (
                                        {
                                            success:false,
                                            data:"No people for this user"
                                        }
                                    );
                                }
                            }
                        }
                    );
                }
                else
                {
                    res.status(404);
                    res.json
                    (
                        {
                            success: false
                        }
                    );
                }
            }
        });
    }
);

app.get('*',function(req,res){
    res.render('index.ejs');
});
// start the server
// =======================
app.listen(port);
module.exports = app;