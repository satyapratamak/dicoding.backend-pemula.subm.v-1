
const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHanlder = (request, h) => {

    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = (pageCount === readPage) ? true : false
    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
    };
    const isReadGreaterPage = (readPage > pageCount) ? true : false;
    /*
        Check if readPage is greater than pageCount
    */
    if (isReadGreaterPage) {
        const response = h.response({
            status: 'fail',
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        });
        response.code(400);
        return response;
    }

    /*
        Check if name is empty
    */
    if (!name) {
        const response = h.response({
            status: 'fail',
            message: "Gagal menambahkan buku. Mohon isi nama buku",
        });
        response.code(400);
        return response;
    }

    /*
    readPage is less than pageCount and name is not empty
    */
    books.push(newBook);
    const isSuccess = books.filter((book) => book.id === id).length > 0;
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }

    /* isSuccess === false */
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
}

const getAllBooksHandler = (request, h) => {


    let books_result = [];

    for (const element of books) {
        let id = element.id;
        let name = element.name;
        let publisher = element.publisher;
        books_result.push({
            id, name, publisher
        });
    }

    const response = h.response({
        status: 'success',
        data: {
            books_result,
        },
    });

    response.code(200);
    return response;
}

const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const book = books.filter((b) => b.id === bookId)[0];

    if (book !== undefined) {
        const response = h.response({
            status: 'success',
            data: {
                book,
            },
        });
        response.code(200);
        return response;

    }
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editNoteByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const isReadGreaterPage = (readPage > pageCount) ? true : false;

    /*
         Check if readPage is greater than pageCount
     */
    if (isReadGreaterPage) {
        const response = h.response({
            status: 'fail',
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        });
        response.code(400);
        return response;
    }

    /*
        Check if name is empty
    */
    if (!name) {
        const response = h.response({
            status: 'fail',
            message: "Gagal memperbarui buku. Mohon isi nama buku",
        });
        response.code(400);
        return response;
    }

    const updatedAt = new Date().toISOString();
    const finished = (pageCount === readPage) ? true : false;
    const index = books.findIndex((book) => book.id === bookId);


    if (index !== -1) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            updatedAt,
        };
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;


};

const deleteBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const index = books.findIndex((book) => book.id === bookId);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;


};


module.exports = { addBookHanlder, getAllBooksHandler, getBookByIdHandler, editNoteByIdHandler, deleteBookByIdHandler };