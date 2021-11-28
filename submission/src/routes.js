const { addBookHanlder, getAllBooksHandler, getBookByIdHandler, editNoteByIdHandler } = require("./handler");

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHanlder,

    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,

    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookByIdHandler,

    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: editNoteByIdHandler,

    },
];

module.exports = routes;