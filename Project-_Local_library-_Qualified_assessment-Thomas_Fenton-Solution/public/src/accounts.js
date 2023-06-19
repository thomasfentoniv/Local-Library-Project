function findAccountById(accounts, id) {
  return accounts.find((accountObj)=> accountObj.id === id)
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB)=>{
    if(accountA.name.last.toLowerCase() < accountB.name.last.toLowerCase()){
      return -1
    } else{
      return 1
    }
  })
  return accounts
}

function getTotalNumberOfBorrows(accounts, books) {
  const {id} = accounts
  let total = 0
  books.forEach((bookObj)=>{
    const {borrows} = bookObj
    borrows.forEach((borrowsObj)=>{
      if(borrowsObj.id === id){
        total++
      }
    })
  })
  return total
}

function getBooksPossessedByAccount(account, books, authors) {
  let result = []
  const accountId = account.id
  const getAuthorById = (authors, id) => {
    return authors.find((authorObj) => authorObj.id === id);
  }
  result = books.filter((book) => {
    return book.borrows.some((borrow) => borrow.id === accountId && !borrow.returned);
  });
  result = result.map((book) => {
    const author = getAuthorById(authors, book.authorId)
    const newBook = {
      ...book, 
      authorObj,
    };
    return newBook;
  })
  return result;
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;
  const getAuthorById = (authors, id) => {
    return authors.find((author) => author.id === id);
  };
  let result = [];
  result = books.filter((book) => {
    return book.borrows.some((borrow) => borrow.id === accountId && !borrow.returned);
  });
  result = result.map((book) => {
    const author = getAuthorById(authors, book.authorId)
    const newBook = {
      ...book, 
      author,
    };
    return newBook;
  })
  return result;
}

function getBooksPossessedByAccount(account, books, authors) {
  const {id} = account
  const booksPossessed = books.reduce((total, bookObj) => {
    const {borrows} = bookObj
    const borrowedBooks = borrows.some((obj) => obj.id === id 
                                     && !obj.returned)
    if (borrowedBooks) total.push(bookObj)
    return total
  }, [])
  booksPossessed.forEach((bookObj) => {
    const {authorId} = bookObj
    bookObj["author"] = authors.find((authorObj) => authorObj.id === authorId)
  })
  console.log(booksPossessed)
  return booksPossessed
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
