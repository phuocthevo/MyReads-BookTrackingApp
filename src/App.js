import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks.js'
import Search from './Search.js'
import {Route} from 'react-router-dom'

class BooksApp extends Component {
  state = {
    books:[]
  }

  componentDidMount(){
    BooksAPI.getAll().then(
      (books)=>{
        this.setState(()=>({
          books
        }))
      })
  }

updateShelf = (book, shelf) => {
   BooksAPI.update(book, shelf);
   if (this.state.books.find((t) => t.id === book.id)){
     this.setState({books : this.state.books.map((b) => {
         if (book.id === b.id)
            b.shelf = shelf;
         return b;
     })})
   }else{
     book.shelf = shelf;
     this.setState({books: this.state.books.concat([book])})
   }
 }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
            <ListBooks books={this.state.books} updateShelf={this.updateShelf}/>
        )}/>
        <Route exact path="/search" render={({history}) => (
          <Search  updateShelf={this.updateShelf} history={history} books={this.state.books}/>)}/>
      </div>
    )
  }
}

export default BooksApp
