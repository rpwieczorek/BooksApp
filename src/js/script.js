
const select = {
  templateOfEachBook: '#template-book',
  bookContainer: '.books-list',
  bookImage: '.book__image',
  favoriteBook: 'favorite',
}

const templates = {
  eachBook:   Handlebars.compile(document.querySelector(select.templateOfEachBook).innerHTML),
}
const favoriteBooks = [];

function initAction(){
  const books = document.querySelectorAll(select.bookImage);
  //console.log(books);
  for (let book of books){
    book.addEventListener('dblclick',function(){
      event.preventDefault();
      const id = book.getAttribute('data-id');

      if (favoriteBooks.indexOf(id) == -1) {
        book.classList.add(select.favoriteBook);
        favoriteBooks.push(id);
      }
      else {
        book.classList.remove(select.favoriteBook);
        favoriteBooks.splice(favoriteBooks.indexOf(id),1);
      }
    });
    //console.log(book);
  }
}

function renderBooks(){
  for(let eachBook in dataSource.books){
    const generatedHTML = templates.eachBook(dataSource.books[eachBook]);
    const eachBookDOM = utils.createDOMFromHTML(generatedHTML);
    const bookContainer = document.querySelector(select.bookContainer);
    bookContainer.appendChild(eachBookDOM);
  }
}





renderBooks();
initAction();
