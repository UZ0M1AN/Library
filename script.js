'use strict';
console.log('uzomian');

/////////////////////////////////////////////////////////////////////////////
/////////////////////// FUNCTIONS //////////////////////////////////////////
// function Book(title, author, pages, read, img) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
//     this.img = img;
// }

// Book.prototype.info = function() {
//     return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
// }

// Event Handlers
function openForm() {
    form.classList.remove('no-display');
    overlay.classList.remove('no-display');
}

function closeForm() {
    form.classList.add('no-display');
    overlay.classList.add('no-display');
}

function addBook(e) {
    e.preventDefault();

    // Get Form Data
    const data = {};

    const inputs = Object.values(e.target).filter(elem => elem.tagName == 'INPUT');
    const modifiedInputs = inputs.map(inp => ({name: inp.name, value: (inp.type=='checkbox' ? inp.checked : inp.value)}));    
    modifiedInputs.forEach(inp => data[inp.name] = inp.value);

    // Add To Library
    addToLibrary(data);
    
    // Clear Form
    clearForm();

    // Close Form
    closeForm();
}

function markRead(e) {
    if (!(e.target.classList.contains('fa-eye') || e.target.classList.contains('fa-eye-slash'))) return;
    
    const article = e.target.closest('article')
    const readTag = article.querySelector('.read-tag');

    // Add 'read' tag
    readTag.classList.toggle('no-display');

    // Update book.read status
    const status = myLibrary.find((_,i) => i == article.dataset.pos);
    status.read = !status.read;

    // Update icon
    if (e.target.classList.contains('fa-eye')) {
        e.target.classList.remove('fa-eye');
        e.target.classList.add('fa-eye-slash');
        return;
    }

    if (e.target.classList.contains('fa-eye-slash')) {
        e.target.classList.remove('fa-eye-slash');
        e.target.classList.add('fa-eye');
        return;
    }
}

function removeBook(e) {
    if (!e.target.classList.contains('fa-circle-minus')) return;

    const article = e.target.closest('article');

    // Remove book from myLibrary
    myLibrary.splice(article.dataset.pos, 1);

    // Remove book from DOM Library
    article.remove();

    // Check if myLibrary is empty
    if (!myLibrary.length) {
        library.classList.add('no-display');
        noBookDiv.classList.remove('no-display');
    }
}

// Helpers
function addToLibrary(book) {
    myLibrary.push(book);

    // Update DOM Library
    library.classList.remove('no-display');
    noBookDiv.classList.add('no-display');

    const article = `
        <article data-pos="${myLibrary.indexOf(book)}">
            <div class="img"></div>
            <div class="cnt">
                <p class="title"><i class="fa-solid fa-book"></i><span>${book.title}</span></p>
                <p class="author"><i class="fa-solid fa-pen-clip"></i><span>${book.author}</span></p>
                <p class="pages"><i class="fa-solid fa-file"></i><span>${book.pages} pages</span></p>
                <p class="read"><i class="fa-solid fa-eye${book.read ? '-slash' : ''}"></i><i class="fa-solid fa-circle-minus"></i></p>
                <span class="read-tag ${book.read ? '' : 'no-display'}">read</span>
            </div>
        </article>
        `;
    library.insertAdjacentHTML('beforeend', article);

    // Update Book Image
    const imgDiv = library.querySelectorAll('.img')[myLibrary.indexOf(book)];
    imgDiv.style.backgroundImage = `url('${book.img}')`;
}

function clearForm() {
    formInputs.forEach(inp => inp.value = '');
}
//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////
///////// Variables //////////////
// DOM
const newBookBtn = document.querySelector('.new-book button');
const form = document.querySelector('form');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-btn');
const library = document.querySelector('.library');
const formInputs = document.querySelectorAll('form input');
const noBookDiv = document.querySelector('.no-book');

// Data
const myLibrary = [];


// Event Listeners
newBookBtn.addEventListener('click', openForm);
closeBtn.addEventListener('click', closeForm);
form.addEventListener('submit', addBook);
document.addEventListener('click', markRead);
document.addEventListener('click', removeBook);
