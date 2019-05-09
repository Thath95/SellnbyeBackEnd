const Book = require('../../models/BookModel');

module.exports = (app) => {

    //Get all book details
    app.get('/books/all', (req, res) => {
        Book.find({}, (err, books) => {
            if (err) {
                console.log(err);
                return res.send('Server Error !')
            }
            return res.send({
                books: books
            })
        })
    });

    //Get Book details by name
    app.get('/books/get/:name', (req, res) => {
        Book.findOne({name: req.params.name}, (err, book) => {
            if (err) {
                console.error(err);
            }
            return res.send({
                bookDetails: book,
            })
        })
    });

    //Adding a Book
    app.post('/books/add', (req, res) => {
        let name = req.body.name;
        let category = req.body.category;
        let author = req.body.author;
        let price = req.body.price;

        if (!name) {
            return res.send({
                success: false,
                message: "Name cannot be Empty !"
            })
        }
        if (!category) {
            return res.send({
                success: false,
                message: "Category cannot be Empty !"
            })
        }
        if (!author) {
            return res.send({
                success: false,
                messages: "Author cannot be Empty !"
            })
        }
        if (!price) {
            return res.send({
                success: false,
                messages: "Price cannot be Empty !"
            })
        }

        Book.find({name: name}, (err, dbBook) => {
            if (err) {
                return res.send('Error : Server Error !')
            } else if (dbBook.length > 0) {
                return res.send('Error : Book already exists !')
            }

            const newBook = new Book();

            newBook.name = name;
            newBook.category = category;
            newBook.author = author;
            newBook.price = price;

            newBook.save((err, book) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error : Server Error !'
                    })
                }
                return res.send({
                    success: true,
                    message: 'Successfully Added Book Details !'
                })
            })

        })

    });

    //Updating Book details
    app.put('/books/update/:id', (req, res) => {
        let bookID = req.params.id;

        let name = req.body.name;
        let category = req.body.category;
        let author = req.body.author;
        let price = req.body.price;

        if (!name) {
            return res.send({
                success: false,
                message: "Name cannot be Empty !"
            })
        }
        if (!category) {
            return res.send({
                success: false,
                message: "Category cannot be Empty !"
            })
        }
        if (!author) {
            return res.send({
                success: false,
                messages: "Author cannot be Empty !"
            })
        }
        if (!price) {
            return res.send({
                success: false,
                messages: "Price cannot be Empty !"
            })
        }

        Book.findOneAndUpdate({_id: bookID}, {
            $set: {
                category: category,
                author: author,
                price: price
            }
        }, {new: true}, (err, doc) => {
            if (err) {
                console.error(err);
            }
            return res.send({
                book: doc,
                success: true
            });
        })
    });

    //Delete Details

    app.delete('/books/delete/:id', (req, res) => {
        let bookID = req.params.id;

        Book.findByIdAndRemove(bookID, null, () => {
            return res.send({
                message: 'Book deleted Successfully !',
                success: true
            })
        });

    })
};