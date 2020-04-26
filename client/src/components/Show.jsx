import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { withRouter } from 'react-router'
import { useMutation, useQuery } from '@apollo/react-hooks';

const GET_BOOK = gql`
  query book($bookId: String) {
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

const GET_BOOKS = gql`
  {
    books {
      _id
      title
      author
    }
  }
`;

const DELETE_BOOK = gql`
  mutation RemoveBook($id: String!) {
    removeBook(id: $id) {
      _id
    }
  }
`;

const Show = (props) => {
	const { loading: queryLoading, error: queryError, data } = useQuery(GET_BOOK, {
		variables: { bookId: props.match.params.id }
  });
  
	const [removeBook] = useMutation(DELETE_BOOK, {
		variables: { id: props.match.params.id }, 
		onCompleted: () => {
      alert("Book removed!!")
      props.history.push(`/`)
    },
    update: (cache, { data: removeBook }) => {
      let { books }  = cache.readQuery({ query: GET_BOOKS });
      console.log('books', books, removeBook);
      const newBooks = books && books.filter(ele => {
        console.log(ele._id, removeBook.removeBook._id);
        return ele._id !== removeBook.removeBook._id
      });
      console.log('res', newBooks);
      cache.writeQuery({ query: GET_BOOKS, data: {books: [...newBooks] }});
    }
  });

	if (queryLoading) return 'Loading...';
	if (queryError) return `Error! ${queryError.message}`;

  return (
    <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading" style={{ 'display': 'flex', 'width': '100%',
				'justifyContent': 'space-between'}}>
            <h3 className="panel-title">{data.book.title}</h3>
            <h4><Link to="/" className="btn btn-primary">Books List</Link></h4>
        </div>
          <div className="panel-body" style={{'marginTop': '55px'}}>
            <dl>
              <dt>ISBN:</dt>
              <dd>{data.book.isbn}</dd>
              <dt>Author:</dt>
              <dd>{data.book.author}</dd>
              <dt>Description:</dt>
              <dd>{data.book.description}</dd>
              <dt>Published Year:</dt>
              <dd>{data.book.published_year}</dd>
              <dt>Publisher:</dt>
              <dd>{data.book.publisher}</dd>
              <dt>Updated:</dt>
              <dd>{data.book.updated_date}</dd>
            </dl>
              <div>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    removeBook({ variables: { id: data.book._id } });
                  }}>
                  <Link to={`/edit/${data.book._id}`} className="btn btn-success">Edit</Link>&nbsp;
                  <button type="submit" className="btn btn-danger">Delete</button>
                </form>
              </div>
          </div>
      </div>
    </div>
  );
}

export default withRouter(Show);