
const select = {
  templateOfEachBook: '#template-book',
  bookContainer: '.books-list',
  bookImage: '.book__image',
  favoriteBook: 'favorite',
  bookId: 'data-id',
  filtersForm: '.filters',
  filterInput: 'filter',
  bookImageListener: 'book__image',
  hideBook: 'hidden',
};

const templates = {
  eachBook: Handlebars.compile(document.querySelector(select.templateOfEachBook).innerHTML),
};

const favoriteBooks = [];
const filters = [];



function initAction(){
  //eventListener for adding book to favoriteBooks
  document.querySelector(select.bookContainer).addEventListener('dblclick',function(event){
    event.preventDefault();
    if(event.target.offsetParent.classList.contains(select.bookImageListener)){
      const id = event.target.offsetParent.getAttribute(select.bookId);
      if (favoriteBooks.indexOf(id) == -1) {
        event.target.offsetParent.classList.add(select.favoriteBook);
        favoriteBooks.push(id);
      }
      else {
        event.target.offsetParent.classList.remove(select.favoriteBook);
        favoriteBooks.splice(favoriteBooks.indexOf(id),1);
      }
    }
  });
  //eventListener for filtersForm
  document.querySelector(select.filtersForm).addEventListener('click',function(event){
    if (event.target.tagName == 'INPUT' &&
        event.target.getAttribute('type') == 'checkbox' &&
        event.target.getAttribute('name') == 'filter') {

      if (event.target.checked) {
        filters.push(event.target.getAttribute('value'));
      }
      else {
        filters.splice(filters.indexOf(event.target.getAttribute('value')),1);
      }
      filterBooks();
    }
  });
}

function filterBooks(){
  for(let eachBook in dataSource.books){
    let shouldBeHidden = false;
    for(let filter of filters){
      if (dataSource.books[eachBook].details[filter]){
        shouldBeHidden = true;
        break;
      }
    }
    booksDOM = document.querySelectorAll(select.bookImage);

    if (shouldBeHidden) {
      for(let bookDOM of booksDOM){
        if (bookDOM.getAttribute(select.bookId) == dataSource.books[eachBook].id){
          bookDOM.classList.add(select.hideBook);
        }
      }
    }
    else{
      for(let bookDOM of booksDOM){
        if (bookDOM.getAttribute(select.bookId) == dataSource.books[eachBook].id){
          bookDOM.classList.remove(select.hideBook);
        }
      }
    }
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
