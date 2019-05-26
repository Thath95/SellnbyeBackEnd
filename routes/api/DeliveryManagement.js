const Deliver = require('../../models/Deliver.model');

module.exports = (app) => {


    app.get('/deliver', function (req, res) {
        Deliver.find(function (err, Books) {
            if (err) {
                console.log(err);
            } else {
                res.json(Books);
                //res.status(200).send({message: "Working !"})
            }
        });
    });


    app.get('/deliver/:id', function (req, res) {

        let id = req.params.id;
        Deliver.findById(id, function (err, Books) {
            res.json(Books);
        });
    });

    app.post('/deliver/add', function (req, res) {
        let deliver = new Deliver(req.body);
        let contact_name = deliver.contact_name;
        let email = deliver.email;
        let contact_number = deliver.contact_number;
        let address = deliver.address;
        let zip_code = deliver.zip_code;
        if (!contact_name) {
            return res.send({
                message: "Details cannot be Empty !",
                deliver: deliver
            })
        }
        if (!email) {
            return res.send({
                message: "Details cannot be Empty !",
                deliver: deliver
            })
        }
        if (!contact_number) {
            return res.send({
                message: "Details cannot be Empty !",
                deliver: deliver
            })
        }
        if (!address) {
            return res.send({
                message: "Details cannot be Empty !",
                deliver: deliver
            })
        }
        if (!zip_code) {
            return res.send({
                message: "Details cannot be Empty !",
                deliver: deliver
            })
        }


        deliver.save()
            .then(deliver => {
                res.status(200).json({'deliver': 'Deliver details added successfully'});
            })
            .catch(err => {
                res.status(400).send('adding new deliver detail was failed')
            });
    });


    app.post('/deliver/update/:id', function (req, res) {
        Deliver.findById(req.params.id, function (err, Books) {
            if (!Books)
                res.status(404).send('data is not found');


            else
                Books.contact_name = req.body.contact_name;
            Books.email = req.body.email;
            Books.contact_number = req.body.contact_number;
            Books.address = req.body.address;
            Books.zip_code = req.body.zip_code;
            Books.deliver_completed = req.body.deliver_completed;


            Books.save().then(deliver => {
                res.json('deliver details updated');
            })

                .catch(err => {
                    res.status(400).send("update not possible")
                });
        });
    });
};