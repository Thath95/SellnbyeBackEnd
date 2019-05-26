const Pay = require('../../models/payModel');

module.exports = (app) => {

    app.delete('/pay/delete/:id', (req, res) => {
        let payID = req.params.id;

        Pay.findByIdAndRemove(payID, null, () => {
            return res.send({
                message: 'Payment details deleted Successfully !',
                success: true
            })
        });
    });
    app.put('/pay/updates/:id', (req, res) => {
        let payID = req.params.id;
        let name = req.body.name;
        let lname = req.body.lname;
        let email = req.body.email;
        let paymentamount = req.body.paymentamount;
        let nameoncard = req.body.nameoncard;
        let cardnumber = req.body.cardnumber;
        if (!name) {
            return res.send({
                success: false,
                message: "Name cannot be Empty !"
            })
        }
        if (!lname) {
            return res.send({
                success: false,
                message: "Last name cannot be Empty !"
            })
        }
        if (!email) {
            return res.send({
                success: false,
                messages: "Email cannot be Empty !"
            })
        }
        if (!paymentamount) {
            return res.send({
                success: false,
                messages: "Price cannot be Empty !"
            })
        }
        if (!nameoncard) {
            return res.send({
                success: false,
                messages: "Name on card cannot be Empty !"
            })
        }
        if (!cardnumber) {
            return res.send({
                success: false,
                messages: "Card number cannot be Empty !"
            })
        }
        Pay.findOneAndUpdate({_id: payID}, {
            $set: {
                name: name,
                lname: lname,
                email: email,
                paymentamount: paymentamount,
                nameoncard: nameoncard,
                cardnumber: cardnumber,

            }
        }, {new: true}, (err, doc) => {
            if (err) {
                console.error(err);
            }
            return res.send({
                pay: doc,
                success: true
            });
        })
    });

    app.get('/pay/all', (req, res) => {
        Pay.find({}, (err, pay) => {
            if (err) {
                console.log(err);
                return res.send('Server Error !')
            }
            return res.send({
                pay: pay
            })
        })
    });

    app.get('/pay/get/:id', (req, res) => {
        Pay.findOne({_id: req.params.id}, (err, pay) => {
            if (err) {
                console.error(err);
            }
            return res.send({
                payDetails: pay,
            })
        })
    });

    //add payment details
    app.post('/pay/add', (req, res) => {
        let name = req.body.name;
        let lname = req.body.lname;
        let email = req.body.email;
        let paymentamount = req.body.paymentamount;
        let nameoncard = req.body.nameoncard;
        let cardnumber = req.body.cardnumber;

        if (!name) {
            return res.send({
                success: false,
                message: "Name cannot be Empty !"
            })
        }
        if (!lname) {
            return res.send({
                success: false,
                message: "Last name cannot be Empty !"
            })
        }
        if (!email) {
            return res.send({
                success: false,
                messages: "Email cannot be Empty !"
            })
        }
        if (!paymentamount) {
            return res.send({
                success: false,
                messages: "Amount cannot be Empty !"
            })
        }
        if (!nameoncard) {
            return res.send({
                success: false,
                messages: "Name on card cannot be Empty !"
            })
        }
        if (!cardnumber) {
            return res.send({
                success: false,
                messages: "Card number cannot be Empty !"
            })
        }
        Pay.find({name: name}, (err, dbPay) => {
            if (err) {
                return res.send('Error : Server Error !')
            } else if (dbPay.length > 0) {
                return res.send('Error : Payment has been already exists !')
            }
            const newPay = new Pay();

            newPay.name = name;
            newPay.lname = lname;
            newPay.email = email;
            newPay.paymentamount = paymentamount;
            newPay.nameoncard = nameoncard;
            newPay.cardnumber = cardnumber;

            newPay.save((err, pay) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error : Server Error !'
                    })
                }
                return res.send({
                    success: true,
                    message: 'Successfully Done Payment !'
                })
            })

        });
    })
};