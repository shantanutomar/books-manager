import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { withRouter } from 'react-router'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_BOOKS = gql`
  {
    books {
      _id
      title
      author
    }
  }
`;

const App = () => {
	const { loading, error, data } = useQuery(GET_BOOKS);
	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`;
	return (
    <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading" style={{'display': 'flex', 'justifyContent': 'space-between'}}>
          <h3 className="panel-title">
            LIST OF BOOKS
          </h3>
          <h4><Link to="/create" className="btn btn-success">Add Book</Link></h4>
        </div>
        <div className="panel-body" style={{'marginTop': '55px'}}>
				{data.books.length ? <table className="table table-stripe">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
              </tr>
            </thead>
            <tbody>
              {data.books.map((book, index) => (
                <tr key={index}>
                  <td><Link to={`/show/${book._id}`}>{book.title}</Link></td>
                  <td>{book.author}</td>
                </tr>
              ))}
            </tbody>
        	</table> : <h4 style={{'color': 'red', 'textAlign': "center"}}>No books available. Please add a Book!!</h4>
				}
        </div>
      </div>
    </div>
  );
}

export default withRouter(App);
