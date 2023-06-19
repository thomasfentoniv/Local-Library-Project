function findAuthorById(authors, id) {
  const findAuthor = authors.find((authorObj)=>{
    return authorObj.id === id
  })
  return findAuthor
}

function findBookById(books, id) {
  const findBook = books.find((bookObj)=>{
    return bookObj.id === id
  })
  return findBook
}

function partitionBooksByBorrowedStatus(books) {
  const booksPresent = books.filter(({borrows})=> borrows.every((borrowObj)=> borrowObj.returned === true))
  const borrowedBooks = books.filter(({borrows})=> borrows.some((borrowObj)=> borrowObj.returned === false))
  return [borrowedBooks,booksPresent]
}

function getBorrowersForBook(book, accounts) {
  const result = []
  const {borrows} = book
  borrows.forEach((borrowsObj)=>{
    const {id} = borrowsObj
    const account = accounts.find(accountObj => accountObj.id === id)
    account["returned"] = borrowsObj.returned
    result.push(account)
  })
  return result.slice(0,10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
