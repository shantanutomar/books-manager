import React from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { withRouter } from 'react-router'
import { useMutation, useQuery } from '@apollo/react-hooks';

const GET_BOOK = gql`
  query Book($bookId: String) {
    book(id: $bookId) {
      _id
      isbn
      title
      author
      description
      published_year
      publisher
      updated_date
    }
	}
`;

const UPDATE_BOOK = gql`
  mutation UpdateBook(
    $id: String!,
    $isbn: String!,
    $title: String!,
    $author: String!,
    $description: String!,
    $publisher: String!,
    $published_year: Int!) {
    	updateBook(
    	id: $id,
    	isbn: $isbn,
    	title: $title,
    	author: $author,
    	description: $description,
    	publisher: $publisher,
    	published_year: $published_year) {
        _id,
        isbn,
        title,
        author,
        description,
        publisher,
        published_year,
    	  updated_date
    }
  }
`;

const Edit = (props) => {
	const { loading, error, data } = useQuery(GET_BOOK, {
		variables: { bookId: props.match.params.id }
	});
	const [updateBook] = useMutation(UPDATE_BOOK, {
		onCompleted: () => {
      alert("Book details updated!!");
      props.history.push(`/`);
    },
  });
  
  
	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`;

	let isbn, title, author, description, published_year, publisher;
          
  return (
    <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading" style={{ 'display': 'flex', 'width': '100%',
					'justifyContent': 'space-between'}}>
          <h3 className="panel-title">
            EDIT BOOK
          </h3>
          <h4><Link to="/" className="btn btn-primary">Books List</Link></h4>
        </div>
        <div className="panel-body" style={{'marginTop': '20px'}}>
          <form onSubmit={e => {
              e.preventDefault();
              updateBook({ variables: { id: props.match.params.id, 
                isbn: isbn.value, title: title.value, author: 
                author.value, description: description.value, 
                publisher: publisher.value, 
                published_year: parseInt(published_year.value) } });
          	}}>
            	<div className="form-group">
            	  <label htmlFor="isbn">ISBN:</label>
            	  <input type="text" className="form-control" name="isbn" ref={node => {
            	    isbn = node;
            	  }} placeholder="ISBN" defaultValue={data.book.isbn} />
            	</div>
            	<div className="form-group">
            	  <label htmlFor="title">Title:</label>
            	  <input type="text" className="form-control" name="title" ref={node => {
            	    title = node;
            	  }} placeholder="Title" defaultValue={data.book.title} />
            	</div>
            	<div className="form-group">
            	  <label htmlFor="author">Author:</label>
            	  <input type="text" className="form-control" name="author" ref={node => {
            	    author = node;
            	  }} placeholder="Author" defaultValue={data.book.author} />
            	</div>
            	<div className="form-group">
            	  <label htmlFor="description">Description:</label>
            	  <textarea className="form-control" name="description" ref={node => {
            	    description = node;
            	  }} placeholder="Description" cols="80" rows="3" defaultValue={data.book.description} />
            	</div>
            	<div className="form-group">
            	  <label htmlFor="author">Publisher:</label>
            	  <input type="text" className="form-control" name="publisher" ref={node => {
            	    publisher = node;
            	  }} placeholder="Publisher" defaultValue={data.book.publisher} />
            	</div>
            	<div className="form-group">
            	  <label htmlFor="author">Published Year:</label>
            	  <input type="number" className="form-control" name="published_year" ref={node => {
            	    published_year = node;
            	  }} placeholder="Published Year" defaultValue={data.book.published_year} />
            	</div>
            	<button type="submit" className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Edit);