import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/client';
import { ApolloConnector } from './services/movies';

const connector=new ApolloConnector('https://limitless-lake-43378.herokuapp.com')
ReactDOM.render(
<ApolloProvider client={connector.client} >
        <App />
</ApolloProvider>



, document.getElementById('root'));
serviceWorker.unregister();
