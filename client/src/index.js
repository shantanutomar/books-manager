import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Edit from './components/Edit';
import Create from './components/Create';
import Show from './components/Show';

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: '//localhost:3000/graphql',
  cache,
});

const AppWrapper = () => (
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <Route exact path='/' component={App} />
        <Route path='/edit/:id' component={Edit} />
        <Route path='/create' component={Create} />
        <Route path='/show/:id' component={Show} />
      </Router>
    </ApolloProvider>
  </React.StrictMode>
)

ReactDOM.render(<AppWrapper/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
