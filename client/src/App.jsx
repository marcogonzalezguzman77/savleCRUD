import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import client from './graphql/apolloSetup';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.css'; 

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="app-layout">
          <Header />
          <Main />
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
