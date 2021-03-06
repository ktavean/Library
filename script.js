let addBtn = document.querySelector("#addBtn");
let bookForm = document.querySelector("#bookForm");
let container = document.querySelector("#container");
let bookCard = document.querySelectorAll(".bookCard");
let submitBtn = document.querySelector("#submitBtn");
let cancelBtn = document.querySelector("#cancelBtn");
let bookName = document.querySelector("#bookName");
let authorName = document.querySelector("#authorName");
let bookPages = document.querySelector("#pages");
let read = document.querySelectorAll('input[name="read"');
let booksContent = document.querySelector("#booksContent");
let library = [];

function toggleStuff() {
    bookForm.classList.toggle("hidden");
    container.classList.toggle("container-transparent");
    for (let bookcard of bookCard) {
        bookcard.classList.toggle("bookcard-transparent");
    }
    addBtn.classList.toggle("disabled");
    let readBtns = document.querySelectorAll("#readbtn");
    for (let readbtn of readBtns) {
        if (container.classList.contains("container-transparent")) {
            readbtn.classList.toggle("disabled");
        } else if (arguments[0]) {
            readbtn.classList.toggle("disabled");
        } else {
            readbtn.classList.remove("disabled");
        }
    }
    let delBtns = document.querySelectorAll("#delbtn");
    for (let delbtn of delBtns) {
        if (container.classList.contains("container-transparent")) {
            delbtn.classList.toggle("disabled");
        } else if (arguments[0]) {
            delbtn.classList.toggle("disabled");
        } else {
            delbtn.classList.remove("disabled");
        }
    }
    resetStuff();
}

function checkOption() {
    let isItRead;
    for (let option of read) {
        if (option.checked) {
            if (option.value === "y") {
                isItRead = true;
            } else {
                isItRead = false;
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
cancelBtn.addEventListener("click", (e) => {
    toggleStuff(e)
});
submitBtn.addEventListener("click", addBookToLibrary);


function makeBook(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    if (bookName.value === "") {
        alert("Please enter a name for the book!");
    } else if (authorName.value === "") {
        alert("Please enter the author's name!");
    } else if (bookPages.value === "") {
        alert("Please enter the number of pages!");
    } else if (checkOption() === undefined) {
        alert("Please choose whether you read the book or not!");
    } else {
        let isItRead = checkOption();
        let newBook = new makeBook(bookName.value, authorName.value, bookPages.value, isItRead);
        library.push(newBook);
        displayBook()
    }
}

function displayBook() {
    for (let i = library.length-1; i < library.length; i++) {
        let newBookCard = document.createElement("div");
        newBookCard.classList.add("bookCard");
        let topSide = document.createElement("div");
        topSide.classList.add("top-card")
        let title = document.createElement("p");
        title.innerText = `"${library[i].title}"`;
        topSide.appendChild(title);
        let author = document.createElement("p");
        author.innerText = `By ${library[i].author}`;
        topSide.appendChild(author);
        let pages = document.createElement("p");
        pages.innerText = `${library[i].pages} pages`;
        topSide.appendChild(pages);
        let botSide = document.createElement("div");
        botSide.classList.add("bot-card");
        let isRead = document.createElement("button");
        isRead.innerText = library[i].read ? "Read" : "Not read";
        isRead.setAttribute("id", "readbtn");
        isRead.classList.toggle(library[i].read ? "read" : "not-read");
        let deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("id", "delbtn");
        deleteBtn.setAttribute("class", "bot-card");
        deleteBtn.innerText = "Remove book";
        deleteBtn.addEventListener("click", () => {
            newBookCard.remove();
        })
        isRead.addEventListener("click", () => {
            if (library[i].read) {
                library[i].read = false;
                isRead.classList.remove("read");
                isRead.classList.add("not-read");
                isRead.innerText = "Not read";
            } else {
                library[i].read = true;
                isRead.classList.remove("not-read");
                isRead.classList.add("read");
                isRead.innerText = "Read";
            }
        })
        botSide.appendChild(isRead);
        botSide.appendChild(deleteBtn);
        newBookCard.appendChild(topSide);
        newBookCard.appendChild(botSide);
        booksContent.appendChild(newBookCard);
        toggleStuff();
        resetStuff();
    }
}
