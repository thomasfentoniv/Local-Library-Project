function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  const booksBorrowed = books.filter((booksObj)=>
    booksObj.borrows.filter((ifBorrowed)=> ifBorrowed.returned === false).length > 0)
  return booksBorrowed.length
}

function onlyFiveObjects(result){
  return result.sort((elementA,elementB) => elementB.count - elementA.count).slice(0,5);
}

function getMostCommonGenres(books) {
  let result = []
  const accumVariable = books.reduce((accumulator, bookObj) => {
    if (accumulator[bookObj.genre]) {
      accumulator[bookObj.genre] += 1
    }else{
      accumulator[bookObj.genre] = 1
    }
    return accumulator
  }, {})
  for (let key in accumVariable) {
    result.push({ name: key, count: accumVariable[key] })
  }
  return onlyFiveObjects(result)
}

function getMostPopularBooks(books) {
  const result = books.map((bookObj)=>{
        return {name: bookObj.title, count: bookObj.borrows.length}
    })
  return onlyFiveObjects(result)
}

function getMostPopularAuthors(books, authors) {
  const result = books.map((bookObj) =>{
    const author = authors.find((author) => author.id === bookObj.authorId)
    const name = `${author.name.first} ${author.name.last}`
    return {name, count: bookObj.borrows.length};
  })
  return onlyFiveObjects(result)
}



module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
