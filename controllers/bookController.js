const Book = require("../models/bookModel");

// getAllBooks
exports.getAllBooks = async (req, res) => {
  try {
    const pg = req.query.page;
    const books = await Book.find({ page: pg });
    res.send(books);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Cannot get books", success: false, error });
  }
};

// getBooksByGenre
exports.getBooksByGenre = async (req, res) => {
  try {
    const gen = req.query.genre;
    const books = await Book.find({ genre: gen });
    res.send(books);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Cannot get books", success: false, error });
  }
};

// decreaseBook
exports.decreaseBook = async (req, res) => {
  let cart = req.body.data;
  // console.log(cart);
  if (cart.length === 0) {
    return res.status(400).send({
      msg: "Empty cart",
    });
  }

  let updates = cart.map(async (item) => {
    return await Book.findOneAndUpdate(
      {
        title: item.name,
      },
      {
        $inc: {
          stock: -1,
        },
      }
    );
  });

  Promise.all(updates)
    .then(() => {
      return res.status(200).send({
        msg: "inventory updated",
      });
    })
    .catch((err) => {
      console.log("err", err.stack);
      return res.status(500).send({
        msg: "inventory update failed!",
      });
    });
};
