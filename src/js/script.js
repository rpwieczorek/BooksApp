
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
    const booksDOM = document.querySelectorAll(select.bookImage);

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
    const ratingBgc = determineRatingBgc(dataSource.books[eachBook].rating);
    const ratingWidth = dataSource.books[eachBook].rating*10;
    dataSource.books[eachBook].ratingBgc = ratingBgc;
    dataSource.books[eachBook].ratingWidth = ratingWidth;
    const generatedHTML = templates.eachBook(dataSource.books[eachBook]);
    const eachBookDOM = utils.createDOMFromHTML(generatedHTML);
    const bookContainer = document.querySelector(select.bookContainer);
    bookContainer.appendChild(eachBookDOM);
  }
}

function determineRatingBgc(rating){
  if (rating < 6) {
    return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
  }
  else if (rating > 6 && rating <= 8) {
    return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
  }
  else if (rating > 8 && rating <= 9) {
    return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%';
  }
  else if (rating >9) {
    return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
  }
  console.log('ustalam rating');
}

renderBooks();
initAction();
