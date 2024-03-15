class Book {
    constructor(title, author, pages, published_year, read=false) {
        this._title = this.validateBookFormat(title)
        this._author = this.validateBookFormat(author)
        this._pages = pages
        this._read = read
        this._published_year = published_year
    }
    get title(){
        return this._title;
    }
    set title(value){
        value = this.validateBookFormat(value)
        console.log(value)
        if (value != ''){
            this._title = value
        }
        return;
    }
    get author(){
        return this._author;
    }
    set author(value){
        value = this.validateBookFormat(value)
        if (value != ''){
            this._author = value
        }
        return;
    }
    get pages(){
        return this._pages;
    }
    set pages(value){
        if (value > 0){        
            this._pages = value
        }
        return;
    }
    get publishedYear(){
        return this._published_year;
    }
    set publishedYear(value){
        if (value > 0){        
            this._published_year = value
        }
        return;
    }
    get read(){
        return this._read;
    }
    set read(value){
        if (value == true || value == false){
            this._read = value
        }

    }
    editBook(new_title, new_author, new_pages, new_publishedYear,new_read){
        this.title = new_title 
        this.author = new_author
        this.pages = new_pages
        this.publishedYear = new_publishedYear
        this.read = new_read
    }
    
    validateBookFormat(string){
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

};


class Library {
    constructor(){
        this.library = []
    }
    bookExist(book){
        return (this.library.some(currentBook => currentBook.title == book.title &&
            currentBook.author == book.author &&
            currentBook.pages == book.pages &&
            currentBook.publishedYear == book.publishedYear
            ))
    }
    addBook(book){
        if (!this.bookExist(book)){
            this.library.push(book);
        } else {
            alert("This book already exist.")
        }
    }

    removeBook([title, author, pages, publishedYear]){
        this.library = this.library.filter(currentBook => currentBook.title != title ||
            currentBook.author != author ||
            currentBook.pages != pages ||
            currentBook.publishedYear != publishedYear);

    }
    searchBook(title, author, pages, publishedYear,read){
        return this.library.find(currentBook => {
            if (currentBook.title == title && currentBook.author == author && currentBook.pages == pages && currentBook.publishedYear == publishedYear){
                return true
            }
            
        })
    }
    sortLibrary(){
        this.library.sort((a,b) => {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
        })
    }
    getBooks(){
        return this.library
    }


};




class UI {
    constructor(library){
        this.library = library
        this.main_container = document.querySelector('.main-container')
        this.dialog = document.querySelector(".add-book");
        this.addButton = document.querySelector(".add");
        this.closeButton = document.querySelector(".close");
        this.saveButton = document.querySelector(".save")

    }

    __init__(){
        this.addButton.addEventListener("click", () => {
            this.openAddBookDialog.bind(this)();
        });

        this.closeButton.addEventListener("click", () => {
            this.closeAddBookDialog.bind(this)();
            this.resetForm.bind(this)();
        });
        this.saveButton.addEventListener("click", () => {
            const book_title = document.getElementById('book_title')
            const book_author = document.getElementById('book_author')
            const book_pages = document.getElementById('book_pages')
            const book_published_year = document.getElementById('book_published_year')
            const book_read = document.querySelector('input[name="book_read"]:checked')
            
            if (book_title != null && book_author != null && book_pages != null && book_title.value != '' && book_author.value != '' && book_pages.value > '0' && book_published_year > '0'){
                const current_book_title = book_title.value
                const current_book_author = book_author.value
                const current_book_pages = book_pages.value.trim()
                const current_book_published_year = book_published_year.value.trim()

                if (book_read != null){
                    let current_book_read = book_read.value
                    if (book_read.value === 'true'){current_book_read = true} else if (book_read.value === 'false'){current_book_read = false}
                    this.library.addBook(new Book(current_book_title, current_book_author, current_book_pages, current_book_published_year, current_book_read))
                } else{
                    this.library.addBook(new Book(current_book_title, current_book_author, current_book_published_year, current_book_pages))
                }
                this.closeAddBookDialog.bind(this)();
                this.resetForm.bind(this)();
                this.displayBooksInLibrary();
            } else {
                alert('Please enter valid book information!')
            }
        })
        this.displayBooksInLibrary();
        
    }

    openAddBookDialog(){
        this.dialog.showModal();
    }
    closeAddBookDialog(){
        this.dialog.close();
    }   
    resetForm(){
        const form = document.getElementById("add_book_form");
        form.reset()
    }
    fillOutForm(title,author,pages,year,read){
        document.getElementById("book_title").value = title;
        document.getElementById("book_author").value = author;
        document.getElementById("book_pages").value = pages;
        document.getElementById("book_published_year").value = year;
        if (read == "true") {
            document.getElementById("book_read_true").checked = true;
        } else {
            document.getElementById("book_read_false").checked = true;
        }
    }

    createBookCard(current_book_title, current_book_author, current_book_pages, current_book_publishedYear, current_book_read) {
        const currentBook = document.createElement('div');
        currentBook.classList.add('card')
    
        const remove = document.createElement('button');
        remove.classList.add('remove')
        remove.setAttribute('value', [current_book_title, current_book_author, current_book_pages, current_book_publishedYear, current_book_read])
        remove.textContent = 'Remove'
        currentBook.appendChild(remove)

        const edit = document.createElement('button');
        edit.classList.add('edit')
        edit.setAttribute('value', [current_book_title, current_book_author, current_book_pages, current_book_publishedYear, current_book_read])
        edit.textContent = 'Edit'
        currentBook.appendChild(edit)
    
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

        const year = document.createElement('div');
        year.classList.add('year')
        year.textContent = 'Published Year: ' + current_book_publishedYear
        year.setAttribute('value', current_book_publishedYear)
        currentBook.appendChild(year)
    
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
        this.main_container.appendChild(currentBook) 
    }
    displayBooksInLibrary(){
        while (this.main_container.firstChild) {
            this.main_container.removeChild(this.main_container.firstChild);
        }
        this.library.sortLibrary()
        const books = this.library.getBooks()
        books.forEach(item => {
            this.createBookCard(item.title, item.author, item.pages, item.publishedYear, item.read)
        })
        this.addEventToCard()
    }

    addEventToCard(){
        this.addRemoveEventToCard();
        this.addReadEventToCard();
        this.addEditEventToCard();
    }
    addRemoveEventToCard(){
        const removeButtons = document.querySelectorAll(".remove")
        removeButtons.forEach(removeButton => {
            removeButton.addEventListener('click',(e) => {
                this.library.removeBook(e.target.getAttribute('value').split(','))
                this.displayBooksInLibrary();
                
            })
        })
    }
    addReadEventToCard(){
        const readButtons = document.querySelectorAll(".read")
        readButtons.forEach(readButton => {
            readButton.addEventListener('click',(e) => {
                const title = e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.getAttribute('value')
                const author = e.target.previousElementSibling.previousElementSibling.previousElementSibling.getAttribute('value')
                const pages = e.target.previousElementSibling.previousElementSibling.getAttribute('value')
                const year = e.target.previousElementSibling.getAttribute('value')
                if (e.target.getAttribute('value') === 'true') {
                    this.library.getBooks().find((book) => {
                        if (book.title == title && book.author == author && book.pages == pages && book.publishedYear == year) {
                            book.read = false
                        }
                    })
                } else {
                    this.library.getBooks().find((book) => {
                        if (book.title == title && book.author == author && book.pages == pages && book.publishedYear == year) {
                            book.read = true
                        }
                    })
                }
                this.displayBooksInLibrary();
            })
        });
    }
    addEditEventToCard(){
        const editButtons = document.querySelectorAll(".edit")
        editButtons.forEach(editButton => {
            editButton.addEventListener('click',(e) => {
                this.openAddBookDialog.bind(this)();
                const title = e.target.getAttribute('value').split(',')[0]
                const author = e.target.getAttribute('value').split(',')[1]
                const pages = Number(e.target.getAttribute('value').split(',')[2])
                const year = Number(e.target.getAttribute('value').split(',')[3])
                const read = e.target.getAttribute('value').split(',')[4]
                this.fillOutForm(title,author,pages,year,read);
                console.log(title,author,pages,year,read)
                if (this.library.searchBook(title,author,pages,year,read) != null) {
                    console.log('test')
                    this.library.removeBook([title, author, pages, year])
                }
            })
        })
    }
}



let myLibrary = new Library();
myLibrary.addBook(new Book("The Hobbit","J.R.R. Tolkien",295,1937,true))
myLibrary.addBook(new Book("To Kill a Mockingbird","Harper Lee",281,1960,false))
myLibrary.addBook(new Book("1984","George Orwell",328,1949))
myLibrary.addBook(new Book("The Great Gatsby","F. Scott Fitzgerald",180,1925))
myLibrary.addBook(new Book("Pride and Prejudice","Jane Austen",279, 1813))
myLibrary.addBook(new Book("The Lord of the Rings - The Fellowship of the Ring"," J.R.R. Tolkien",1216,1954))
myLibrary.addBook(new Book("The Lord of the Rings - The Two Towers"," J.R.R. Tolkien",1216,1954))
myLibrary.addBook(new Book("The Lord of the Rings - The Return of the King"," J.R.R. Tolkien",1216,1955))
myLibrary.addBook(new Book("Harry Potter and the Sorcerer's Stone"," J.K. Rowling",320,1997))

let newLibrary = new Library();
const ui = new UI(myLibrary);
ui.__init__();

    






  
















  