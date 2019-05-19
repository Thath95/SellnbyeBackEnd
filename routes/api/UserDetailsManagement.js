const User = require('../../models/userDetails');
module.exports = (app) => {

//Register Users
    app.post('/trainReservations/users/register', (req, res) => {
        let fName = req.body.fName;
        let lName = req.body.lName;
        let email = req.body.email;
        let pwd = req.body.pwd;

        if (!fName) {
            return
        }

        if (!lName) {
            return
        }
        if (!email) {
            return
        }
        if (!pwd) {
            return
        }

        email = email.toLowerCase();

        User.find({email: email}, (err, previousUser) => {
            if (err) {
                return res.send('Error Server Error !');
            } else if (previousUser.length > 0) {
                return res.send('Error : Account Already Exists !')
            }

            const user = new User();
            user.fName = fName;
            user.lName = lName;
            user.email = email;
            user.pwd = user.generateHash(pwd);

            user.save((err, user) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error : Server Error '
                    });
                }

                return res.send({
                    success: true,
                    message: "You are successfully Registered !",
                    user: user
                })
            })

        });

    });

//get login details of the users
    app.post('/trainReservations/users/login', (req, res) => {
        let email = req.body.email;
        let pwd = req.body.pwd;

        if (!email) {
            return res.send({
                success: false,
                message: "Email Cannot be Empty !"
            })
        }
        if (!pwd) {
            return res.send({
                success: false,
                message: "Password Cannot be Empty !"
            })
        }

        User.find({email: email}, (err, users) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "Error : Server Error !"
                })
            }
            if (users.length !== 1) {
                return res.send({
                    success: false,
                    message: "Error Invalid User Email or Password !"
                })
            }

            const user = users[0];
            if (!user.validPassword(pwd, user.pwd)) {
                return res.send({
                    success: false,
                    message: 'Error : Invalid User Name or Password !'
                })
            }

            return res.send({
                success: true,
                message: 'You are successfully logged in !',
                user: user
            })
        })

    });
}

