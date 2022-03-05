let addBtn = document.querySelector("#addBtn");
let bookForm = document.querySelector("#bookForm");
let container = document.querySelector("#container");
let bookCard = document.querySelectorAll(".bookCard");
let readBtn = document.querySelectorAll("#readBtn");
let delBtn = document.querySelectorAll("#delBtn");
let submitBtn = document.querySelector("#submitBtn");
let cancelBtn = document.querySelector("#cancelBtn");
let bookName = document.querySelector("#bookName");
let authorName = document.querySelector("#authorName");
let bookPages = document.querySelector("#pages");
let read = document.querySelectorAll('input[name="read"');
let booksContent = document.querySelector("#booksContent");
let library = [];

function toggleStuff () {
    bookForm.classList.toggle("hidden");
    container.classList.toggle("container-transparent");
    for (let bookcard of bookCard) {
        bookcard.classList.toggle("bookcard-transparent");
    }
    addBtn.classList.toggle("disabled");
    for (let readbtn of readBtn) {
        readbtn.classList.toggle("disabled");
    }
    for (let delbtn of delBtn) {
        delbtn.classList.toggle("disabled");
    }
    resetStuff();
}

function checkOption() {
    let isItRead = false;
    for (let option of read) {
        if (option.checked) {
            if (option.value === "y") {
                isItRead = true;
            }
        }
    }
    return isItRead;
}

function resetStuff() {
    bookName.value = "";
    authorName.value = "";
    pages.value = "";
    for (let option of read) {
        if (option.checked) {
            option.checked = false;
        }
    }
}

addBtn.addEventListener("click", toggleStuff)
cancelBtn.addEventListener("click", toggleStuff);
submitBtn.addEventListener("click", addBookToLibrary);


function makeBook(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    let isItRead = checkOption();
    let book = new makeBook(bookName.value, authorName.value, bookPages.value, isItRead);
    library.push(book);
    toggleStuff();
    resetStuff();
    let newBook = document.createElement("div");
    newBook.classList.add("bookCard");
    let title = document.createElement("p");
    title.innerText = book.title;
    let author = document.createElement("p");
    author.innerText = book.author;
    let pages = document.createElement("p");
    pages.innerText = book.pages;
    let isRead = document.createElement("p");
    isRead.innerText = book.read ? "Read" : "Not read";
    newBook.appendChild(title);
    newBook.appendChild(author);
    newBook.appendChild(pages);
    newBook.appendChild(isRead);
    booksContent.appendChild(newBook);
}