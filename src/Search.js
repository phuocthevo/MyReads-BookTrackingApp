import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book.js'
import {Link} from 'react-router-dom';

class Search extends Component{
  state={
    searchBooks:[],
    query: ""
  }


  updateQuery = (query)=>{
    BooksAPI.search(query).then(searchBooks => {
            if (!searchBooks || searchBooks.error) {
              this.setState({searchBooks: [],query:query});
            }
            else{
              this.setState({query:query, searchBooks : searchBooks.map((book) => {
                  const currBook = this.props.books.find((t) => t.id === book.id);
                  book.shelf =currBook? currBook.shelf: "none";
                  return book;
              })});
            }
        });
  }

  render(){
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type='text'placeholder="Search by title or author"  value={this.state.query}
              onChange={(event)=>this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          {this.state.query!==""&&(
              <ol className="books-grid">
              {
                this.state.searchBooks.map((b)=>(
                <li key={b.id}>
                  <Book updateShelf={this.props.updateShelf} book={b}/>
                </li>
                ))
              }
            </ol>
          )}
        </div>
      </div>
    )
  }
}

export default Search
