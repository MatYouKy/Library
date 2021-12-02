const inputs = document.querySelectorAll('.input');
const listBooks = document.querySelector('#list-books');
const form = document.querySelector('.form');
console.log(listBooks)

const addedBooks = [{
    title: 'Pan Tadeusz',
    author: 'Adam Mickiewicz',
    priority: 2,
    genere: 'romanse'
}];

class Book {
    title;
    author;
    lpriority;
    genere;

    constructor(title, author, priority, genere) {
        this.title = title,
            this.author = author,
            this.priority = priority,
            this.genere = genere
    }

    showBook = () => `${this.title}, ${this.author}, ${this.priority}, ${this.genere}`;
    addBook = () => {
        const oldList = JSON.parse(window.localStorage.getItem('books'));
        oldList.push({
            title: this.title,
            author: this.author,
            priority: this.priority,
            genere: this.genere
        })

        window.localStorage.setItem("books", JSON.stringify(oldList));
    }
}

const initialLoad = () => {
    if (localStorage.getItem('books') == null) {
        localStorage.setItem('books', '[]');
    }
    showBooks();
}

const showBooks = () => {
    const booksStorage = JSON.parse(window.localStorage.getItem('books'));
    console.log(booksStorage)

    if (!!booksStorage) {
        listBooks.querySelectorAll('*').forEach(n => n.remove())
        booksStorage.map(book => {
            const bookContent = document.createElement('tr');

            const booksTitle = document.createElement('td');
            booksTitle.innerText = `${book.title}`;
            bookContent.appendChild(booksTitle);
            const booksAuthor = document.createElement('td');
            booksAuthor.innerText = `${book.author}`;
            bookContent.appendChild(booksAuthor);
            const booksGenere = document.createElement('td');
            booksGenere.innerText = `${book.genere}`;
            bookContent.appendChild(booksGenere);
            const booksPriority = document.createElement('td');
            booksPriority.innerText = `${book.priority}`;
            bookContent.appendChild(booksPriority);


            listBooks.appendChild(bookContent);
        })
    }
}
const handleSubmit = event => {
    event.preventDefault();
    const book = new Book(title, author, priority, genere);
    book.addBook()
    inputs.forEach(input => input.value = '');
    showBooks();
}

const handleChange = event => {
    console.log(event.target.value)
    switch (event.target.name) {
        case 'title': {
            title = event.target.value
        }
        break;
    case 'author': {
        author = event.target.value
    }
    break;
    case 'priority': {
        priority = event.target.value
    }
    break;
    case 'genere': {
        genere = event.target.value;
    }
    break;
    }
}

inputs.forEach(input => input.addEventListener('change', handleChange))
form.addEventListener('submit', handleSubmit)
window.addEventListener('DOMContentLoaded', initialLoad);