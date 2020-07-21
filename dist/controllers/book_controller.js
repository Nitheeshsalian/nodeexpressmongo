"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.addBook = exports.showBook = exports.allBooks = void 0;
const users_1 = __importDefault(require("../models/users"));
exports.allBooks = (req, res) => {
    const books = users_1.default.find((err, books) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(books);
        }
    });
};
exports.showBook = (req, res) => {
    const book = users_1.default.findById(req.params.id, (err, book) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(book);
        }
    });
};
exports.addBook = (req, res) => {
    const book = new users_1.default(req.body);
    book.save((err) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(book);
        }
    });
};
exports.updateBook = (req, res) => {
    let book = users_1.default.findByIdAndUpdate(req.params.id, req.body, (err, book) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(book);
        }
    });
};
exports.deleteBook = (req, res) => {
    const book = users_1.default.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send("Book deleted from database");
        }
    });
};
//# sourceMappingURL=book_controller.js.map