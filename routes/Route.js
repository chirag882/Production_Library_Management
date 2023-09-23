const express = require("express");
const router = express.Router();
const userCntroller = require("../controllers/userController");
const bookCntroller = require("../controllers/bookController");
const authMiddleware = require("../middlewares/authMiddleware");

// register/login user
router.post("/register",userCntroller.register);
router.post("/login",userCntroller.login);
router.post("/loginGoogle",userCntroller.login);
router.post("/get-user-info-by-id", authMiddleware, userCntroller.info)

// get books
router.get("/books",bookCntroller.getAllBooks);
router.get("/expore",bookCntroller.getBooksByGenre);
router.post("/books/decrease",bookCntroller.decreaseBook);

module.exports = router;