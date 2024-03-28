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
        this.displayBooksInLibrary();
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
        this.main_container.appendChild(currentBook) 
        const button_line = document.createElement('div');
        button_line.classList.add('button_line')
        currentBook.appendChild(button_line)

    
        const remove = document.createElement('button');
        remove.classList.add('remove')
        remove.setAttribute('value', [current_book_title, current_book_author, current_book_pages, current_book_publishedYear, current_book_read])
        remove.textContent = 'Remove'
        button_line.appendChild(remove)

        const edit = document.createElement('button');
        edit.classList.add('edit')
        edit.setAttribute('value', [current_book_title, current_book_author, current_book_pages, current_book_publishedYear, current_book_read])
        edit.textContent = 'Edit'
        button_line.appendChild(edit)
    
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
       
    }
    displayBooksInLibrary(){
        const mainContainer = document.querySelector('.main-container')
        mainContainer.innerHTML = ''
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




function populateCountryDropdown(){
    const country_dropdown = document.getElementById('country_dropdown')
    // Fetch list of countries from a public API
    fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        // Sort the countries alphabetically by name
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        // Iterate over the response data and populate the dropdown
        data.forEach(country => {
        const option = document.createElement('option');
        option.value = country.name.common;
        option.textContent = country.name.common;
        country_dropdown.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error fetching country data:', error);
    });
}


function signUpFormValidation(form){
    // form is an element of html
    const username = document.getElementById('username')
    const usernameError = document.querySelector("#username + span.error");
    const email = document.getElementById('email')
    const emailError = document.querySelector("#email + span.error");
    const country = document.getElementById('country_dropdown')
    const countryError = document.querySelector("#country_dropdown + span.error");
    const zipcode = document.getElementById('zipcode')
    const zipcodeError = document.querySelector("#zipcode + span.error");
    const password = document.getElementById('password')
    const passwordError = document.querySelector("#password + span.error"); 
    const passwordConfirmation = document.getElementById('password_confirmation')
    const passwordConfirmationError = document.querySelector("#password_confirmation + span.error");  
    let zipcodeFValidation = false;

    username.addEventListener('input', () => {
        usernameValidation(username,usernameError)
    })
    email.addEventListener("input", () => {
        emailValidation(email,emailError)
    })
    country.addEventListener("change", () => {
        countryValidation(country,countryError)
        fetchZipcodeFormat(country.value)
            .then(zipcodeFormat => {
                zipcode.addEventListener("input", () => {
                    if (validateZipcode(zipcode, zipcodeError,zipcodeFormat)) {
                        zipcodeFValidation = true
                    }
                })
            })
    })
    password.addEventListener('input', () => {
        passwordValidation(password,passwordError)
    })
    passwordConfirmation.addEventListener('input', () => {
        passwordConfirmationValidation(password,passwordConfirmation,passwordConfirmationError)
    })
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        //if (usernameValidation(username,usernameError) && emailValidation(email,emailError) && countryValidation(country,countryError) && zipcodeFValidation && passwordValidation(password,passwordError) && passwordConfirmationValidation(password,passwordConfirmation,passwordConfirmationError)){
        if (true) {
            console.log('Form is valid. Submitting')
            console.log('Form is submitted.')
            form.submit();
            ui.__init__();
            // const user_greeting = document.querySelector(".username_greeting")
            // console.log(username)
            // user_greeting.textContent = username.value
        } else {
            console.log('Form is invalid. Please correct the errors.');
        }
    })
}




function passwordConfirmationValidation(password,passwordConfirmation,passwordConfirmationError){
    console.log()
    if (passwordConfirmation.value === password.value){
        passwordConfirmationError.textContent = ''
        passwordConfirmationError.className = "error"
        return true
    } else {
        passwordConfirmationError.textContent = 'Your password confirmation doesn\'t match your password.'
        return false
    }
}


function passwordValidation(password,passwordError){
    // Each time the user types something, we check if the form fields are valid.
    if (password.validity.valid){
        passwordError.textContent = ''
        passwordError.className = "error"
        return true
    } else {
        showPasswordError(password,passwordError);
    }
    return false
}

function showPasswordError(password,passwordError) {
    if (password.validity.valueMissing) {
      // If the field is empty,
      // display the following error message.
      passwordError.textContent = "You need to enter an password address.";
    } else if (password.validity.typeMismatch) {
      // If the field doesn't contain an password,
      // display the following error message.
      passwordError.textContent = "Entered value needs to be an password address.";
    } else if (password.validity.tooShort) {
      // If the data is too short,
      // display the following error message.
      passwordError.textContent = `Email should be at least ${password.minLength} characters; you entered ${password.value.length}.`;
    }
    // Set the styling appropriately
    passwordError.className = "error active";
}


async function fetchZipcodeFormat(country_name) {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all')
        const data = await response.json()
        let country_zipcode_format
        data.forEach(country => {
            if (country.name.common === country_name) {
                if (country.postalCode != null) {
                    country_zipcode_format = country.postalCode.format
                } else {
                    console.log('No Zip Code format for that country')
                }
            }
        })
        return country_zipcode_format
    } catch (error) {
        console.error('Error fetching country data:', error)
        return null
    }
}
function convertToRegExp(pattern) {
    // Replace each '#' character with '\d' (matches any digit)
    const regexPattern = pattern.replace(/#/g, '\\d');
    // Add anchors to match the whole string
    return new RegExp('^' + regexPattern + '$');
}

function validateZipcode(zipcode, zipcodeError, zipcodeFormat){
    const regex = convertToRegExp(zipcodeFormat);
    if (regex.test(zipcode.value)) {
        // Zip code matches the format
        zipcodeError.textContent = '';
        zipcodeError.className = 'error';
        return true;
    } else {
        // Zip code does not match the format
        zipcodeError.textContent = 'Invalid zip code format. Please use the format: ' + zipcodeFormat;
        zipcodeError.className = 'error active';
        return false;
    }
}

function countryValidation(country,countryError){
    if (country.value !== ''){
        countryError.textContent = ''
        countryError.className = 'error'
        return true
    } else {
        countryError.textContent = 'Please select a country.'
        countryError.className = "error active";
    }
    return false
}

function emailValidation(email,emailError){
    // Each time the user types something, we check if the form fields are valid.
    if (email.validity.valid){
        emailError.textContent = ''
        emailError.className = "error"
        return true
    } else {
        showEmailError(email,emailError);
    }
    return false
}

function showEmailError(email,emailError) {
    if (email.validity.valueMissing) {
      // If the field is empty,
      // display the following error message.
      emailError.textContent = "You need to enter an email address.";
    } else if (email.validity.typeMismatch) {
      // If the field doesn't contain an email address,
      // display the following error message.
      emailError.textContent = "Entered value needs to be an email address.";
    } else if (email.validity.tooShort) {
      // If the data is too short,
      // display the following error message.
      emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
    }
    // Set the styling appropriately
    emailError.className = "error active";
}

function usernameValidation(username,usernameError){
    // Each time the user types something, we check if the form fields are valid.
    if (username.validity.valid){
        usernameError.textContent = ''
        usernameError.className = "error"
        return true
    } else {
        showUsernameError(username,usernameError);
    }
    return false
}

function showUsernameError(username,usernameError) {
    if (username.validity.valueMissing) {
      // If the field is empty,
      // display the following error message.
      usernameError.textContent = "You need to enter an username.";
    } else if (username.validity.typeMismatch) {
      // If the field doesn't contain an username,
      // display the following error message.
      usernameError.textContent = "Entered value needs to be an username.";
    } else if (username.validity.tooShort) {
      // If the data is too short,
      // display the following error message.
      usernameError.textContent = `Username should be at least ${username.minLength} characters; you entered ${username.value.length}.`;
    }
    // Set the styling appropriately
    usernameError.className = "error active";
}

populateCountryDropdown()
const sign_up_form = document.querySelector('.signup')
console.log(signUpFormValidation(sign_up_form))
signUpFormValidation(sign_up_form)

    


