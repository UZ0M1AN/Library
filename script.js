'use strict';
console.log('uzomian');

// Replacing console.log...
const log = (...a) => console.log(...a);

/////////////////////////////////////////////////////////////////////////////
/////////////////////// FUNCTIONS //////////////////////////////////////////
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
}

function addToLibrary(book) {
    myLibrary.push(book);
}

function displayBook() {
    myLibrary.forEach(book => log(book))
}
//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// const tfa = new Book('Things Fall Apart', 'Chinua Achebe', '300', 'read');
// log(tfa.info())

////////////////////////////////////////////////////////////////////////////
// Variables
const myLibrary = [];