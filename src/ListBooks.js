import React, {Component} from 'react'
import BookShelf from './BookShelf.js'
import {Link} from 'react-router-dom'

class ListBooks extends Component{

  render(){
    const  shelf = [
      { name : 'Currently Reading',
        book :this.props.books.filter((book) => book.shelf === 'currentlyReading')},
      { name : 'Want To Read',
        book :this.props.books.filter((book) => book.shelf === 'wantToRead')},
      { name :'Read',
        book :this.props.books.filter((book) => book.shelf === 'read')}
    ];

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <ol>
            {shelf.map((s)=>(
              <li key={s.name}>
                <BookShelf shelf={s.name} books={s.book} updateShelf={this.props.updateShelf}/>
              </li>
            ))}
          </ol>
        </div>
        <Link className='open-search' to='/search'>Add a book</Link>
      </div>
    )
  }
}
export default ListBooks
