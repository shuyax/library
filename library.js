const myLibrary = [];

function Book(title, author, pages,read=false) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function removeBook(title){
    let index_to_remove
    for (i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title == title) {
            index_to_remove = i
        }
    }
    myLibrary.splice(index_to_remove,1)
}

function addBooksToDisplay(array){
    const main_container = document.querySelector('.main-container')
    while (main_container.firstChild) {
        main_container.removeChild(main_container.firstChild);
    }
    for(i = 0; i < array.length; i++){
        addBookToDisplay(array[i].title, array[i].author, array[i].pages, array[i].read)
    };
    let removeButtons = document.querySelectorAll(".remove")
    removeButtons.forEach(removeButton => {
        removeButton.addEventListener('click',(e) => {
            removeBook(e.target.value)
            addBooksToDisplay(myLibrary)
        })
    });
    readButtons = document.querySelectorAll(".read")
    readButtons.forEach(readButton => {
        readButton.addEventListener('click',(e) => {
            const title = e.target.previousElementSibling.previousElementSibling.previousElementSibling.getAttribute('value')
            const author = e.target.previousElementSibling.previousElementSibling.getAttribute('value')
            const pages = e.target.previousElementSibling.getAttribute('value')
            if (e.target.getAttribute('value') === 'true') {
                myLibrary.find((book) => {
                    if (book.title == title && book.author == author && book.pages == pages) {
                        book.read = false
                    }
                })
            } else {
                myLibrary.find((book) => {
                    if (book.title == title && book.author == author && book.pages == pages) {
                        book.read = true
                    }
                })
            }
            addBooksToDisplay(myLibrary)
            console.log(myLibrary)
        })
    });
}

function addBookToDisplay(current_book_title, current_book_author, current_book_pages, current_book_read){
    const main_container = document.querySelector('.main-container')
    const currentBook = document.createElement('div');
    currentBook.classList.add('card')

    const remove = document.createElement('button');
    remove.classList.add('remove')
    remove.setAttribute('value', current_book_title)
    remove.textContent = 'Remove'
    currentBook.appendChild(remove)

    const title = document.createElement('div');
    title.classList.add('title')
    title.textContent = current_book_title
    title.setAttribute('value', current_book_title)
    currentBook.appendChild(title)

    const author = document.createElement('div');
    author.classList.add('author')
    author.textContent = 'Author: ' + current_book_author
    author.setAttribute('value', current_book_author)
    currentBook.appendChild(author)

    const pages = document.createElement('div');
    pages.classList.add('pages')
    pages.textContent = 'Pages: ' + current_book_pages
    pages.setAttribute('value', current_book_pages)
    currentBook.appendChild(pages)

    const read = document.createElement('button');
    read.classList.add('read')
    if (current_book_read) {
        read.textContent = 'Read'
        read.setAttribute('value', true)
    } else {
        read.textContent = 'Not Read Yet'
        read.setAttribute('value', false)
    }
    currentBook.appendChild(read)

    main_container.appendChild(currentBook) 
}

function closeForm() {
    const form = document.getElementById("add_book_form");
    form.reset(); // Reset the form to its initial state
}


function duplicatedBookExist(title, author, pages){
    for(i = 0; i < myLibrary.length; i++){
        if (myLibrary[i].title == title && myLibrary[i].author == author && myLibrary[i].pages == pages){
            return true
        }
    }
    return false
}

function addBookToLibrary(title, author, pages,read) {
    if (! duplicatedBookExist(title, author, pages)){
        const newBook = new Book(title, author, pages,read)
        myLibrary.push(newBook)
    } else {
        alert("This book already exist.")
    }
}

function validateBookFormat(string){
    string = string.trim()
    const words = string.split(" ")
    let capitalized_words = []
    words.map((word) => {
        if (word.length > 0) {
            capitalized_words.push(word[0].toUpperCase() + word.substring(1))
        }
    })
    return capitalized_words.join(" ")
}




addBookToLibrary("The Hobbit","J.R.R. Tolkien",295, true)
addBookToLibrary("To Kill a Mockingbird","Harper Lee",281, false)
addBookToLibrary("1984","George Orwell",328)
addBookToLibrary("The Great Gatsby","F. Scott Fitzgerald",180)
addBookToLibrary("Pride and Prejudice","Jane Austen",279)
addBookToLibrary("The Lord of the Rings"," J.R.R. Tolkien",1216)
addBookToLibrary("Harry Potter and the Sorcerer's Stone"," J.K. Rowling",320)
addBooksToDisplay(myLibrary)


const dialog = document.querySelector(".add-book");
const showButton = document.querySelector(".add");
const closeButton = document.querySelector(".close");
const saveButton = document.querySelector(".save")

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
    dialog.showModal();
});
// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
    dialog.close();
});

saveButton.addEventListener("click", () => {
    const book_title = document.getElementById('book_title')
    const book_author = document.getElementById('book_author')
    const book_pages = document.getElementById('book_pages')
    const book_read = document.querySelector('input[name="book_read"]:checked')
    if (book_title != null && book_author != null && book_pages != null && book_title.value != '' && book_author.value != '' && book_pages.value > '0'){
        console.log(typeof(book_read.value))
        const current_book_title = validateBookFormat(book_title.value)
        const current_book_author = validateBookFormat(book_author.value)
        const current_book_pages = book_pages.value.trim()
        let current_book_read = book_read.value
        if (book_read != null){
            if (book_read.value === 'true'){current_book_read = true} else if (book_read.value === 'false'){current_book_read = false}
            console.log(typeof(book_read.value))
            addBookToLibrary(current_book_title, current_book_author, current_book_pages, current_book_read)
        } else{
            addBookToLibrary(current_book_title, current_book_author, current_book_pages)
        }
        dialog.close();
        closeForm()
        addBooksToDisplay(myLibrary)

    } else {
        alert('Please enter valid book information!')
    }
  });









  