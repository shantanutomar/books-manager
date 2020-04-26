import React from 'react';
import gql from "graphql-tag";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { useMutation } from '@apollo/react-hooks';

const ADD_BOOK = gql`
  mutation AddBook(
    $isbn: String!,
    $title: String!,
    $author: String!,
    $description: String!,
    $publisher: String!,
    $published_year: Int!) {
    addBook(
      isbn: $isbn,
      title: $title,
      author: $author,
      description: $description,
      publisher: $publisher,
      published_year: $published_year) {
        _id
        title
        author
    }
	}
`;

const GET_BOOKS = gql`
  {
    books {
      _id
      title
      author
    }
  }
`;

const Create = () => {
  const [addBook] = useMutation(ADD_BOOK, {
      update(cache, { data: { addBook } }) {
        const data = cache.readQuery({ query: GET_BOOKS });
        console.log('books -> ', data.books, addBook);
        cache.writeQuery({
          query: GET_BOOKS,
          data: { books: [...data.books, addBook] }
        });
      }
  });
  
  let isbn, title, author, description, published_year, publisher;
  return (
    <div className="container">
      <div className="panel panel-default">
				<div className="panel-heading" style={{ 'display': 'flex', 'width': '100%',
					'justifyContent': 'space-between'}}>
            <h3 className="panel-title">ADD BOOK</h3>
						<h4><Link to="/" className="btn btn-primary">Books List</Link></h4>
        </div>
        <div className="panel-body" style={{'marginTop': '20px'}}>
          <form onSubmit={e => {
            e.preventDefault();
            if(isbn.value === '' || title.value === '' || author.value === '' || description.value === ''
            || publisher.value === '' || published_year.value === '') {
              alert("Enter all the details");
              return false;
            }

            addBook({ variables: { isbn: isbn.value, title: title.value, 
              author: author.value, description: description.value, publisher: publisher.value, 
              published_year: parseInt(published_year.value) } });
            isbn.value = "";
            title.value = "";
            author.value = "";
            description.value = "";
            publisher.value = null;
            published_year.value = "";
            alert("Book added!!")
            isbn.focus();
          }}>
            <div className="form-group">
              <label htmlFor="isbn">ISBN:</label>
              <input type="text" className="form-control" autoComplete="off" name="isbn" ref={node => {
                  isbn = node;
              }} placeholder="ISBN" />
            </div>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input type="text" className="form-control" autoComplete="off" name="title" ref={node => {
                  title = node;
              }} placeholder="Title" />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author:</label>
              <input type="text" className="form-control" autoComplete="off" name="author" ref={node => {
                  author = node;
              }} placeholder="Author" />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea className="form-control" name="description" ref={node => {
                  description = node;
              }} placeholder="Description" cols="80" rows="3" />
            </div>
            <div className="form-group">
              <label htmlFor="author">Publisher:</label>
              <input type="text" className="form-control" name="publisher" autoComplete="off" ref={node => {
                  publisher = node;
              }} placeholder="Publisher" />
            </div>
            <div className="form-group">
              <label htmlFor="author">Published Year:</label>
              <input type="number" className="form-control" name="published_year" autoComplete="off" ref={node => {
                  published_year = node;
              }} placeholder="Published Year" />
            </div>
            <button type="submit" className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Create);