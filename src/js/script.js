
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

class BooksList {
  constructor(){
    const thisBookList = this;

    thisBookList.initData();
    thisBookList.getElements();
    thisBookList.renderBooks();
    thisBookList.initActions();
  }

  initData(){
    this.data = dataSource.books;
  }

  renderBooks(){
    const thisBookList = this;

    for(let eachBook in thisBookList.data){
      const ratingBgc = thisBookList.determineRatingBgc(thisBookList.data[eachBook].rating);
      const ratingWidth = thisBookList.data[eachBook].rating*10;
      thisBookList.data[eachBook].ratingBgc = ratingBgc;
      thisBookList.data[eachBook].ratingWidth = ratingWidth;
      const generatedHTML = templates.eachBook(thisBookList.data[eachBook]);
      const eachBookDOM = utils.createDOMFromHTML(generatedHTML);
      thisBookList.bookContainer.appendChild(eachBookDOM);
    }
  }

  getElements() {
    const thisBookList = this;

    thisBookList.bookContainer = document.querySelector(select.bookContainer);
    thisBookList.filtersForm = document.querySelector(select.filtersForm);
  }

  initActions() {
    const thisBookList = this;

    thisBookList.favoriteBooks = [];
    //eventListener for adding book to favoriteBooks
    thisBookList.bookContainer.addEventListener('dblclick',function(event){
      event.preventDefault();
      if(event.target.offsetParent.classList.contains(select.bookImageListener)){
        const id = event.target.offsetParent.getAttribute(select.bookId);
        if (thisBookList.favoriteBooks.indexOf(id) == -1) {
          event.target.offsetParent.classList.add(select.favoriteBook);
          thisBookList.favoriteBooks.push(id);
        }
        else {
          event.target.offsetParent.classList.remove(select.favoriteBook);
          thisBookList.favoriteBooks.splice(thisBookList.favoriteBooks.indexOf(id),1);
        }
      }
    });
    //eventListener for filtersForm
    thisBookList.filters = [];
    thisBookList.filtersForm.addEventListener('click',function(event){
      if (event.target.tagName == 'INPUT' &&
          event.target.getAttribute('type') == 'checkbox' &&
          event.target.getAttribute('name') == 'filter') {

        if (event.target.checked) {
          thisBookList.filters.push(event.target.getAttribute('value'));
        }
        else {
          thisBookList.filters.splice(thisBookList.filters.indexOf(event.target.getAttribute('value')),1);
        }
        thisBookList.filterBooks();
      }
    });
  }

  filterBooks() {
    const thisBookList = this;

    for(let eachBook in thisBookList.data){
      let shouldBeHidden = false;
      for(let filter of thisBookList.filters){
        if (thisBookList.data[eachBook].details[filter]){
          shouldBeHidden = true;
          break;
        }
      }
      const booksDOM = document.querySelectorAll(select.bookImage);

      if (shouldBeHidden) {
        for(let bookDOM of booksDOM){
          if (bookDOM.getAttribute(select.bookId) == thisBookList.data[eachBook].id){
            bookDOM.classList.add(select.hideBook);
          }
        }
      }
      else{
        for(let bookDOM of booksDOM){
          if (bookDOM.getAttribute(select.bookId) == thisBookList.data[eachBook].id){
            bookDOM.classList.remove(select.hideBook);
          }
        }
      }
    }
  }

  determineRatingBgc(rating) {
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
  }
}

const app = new BooksList();
console.log(app);
