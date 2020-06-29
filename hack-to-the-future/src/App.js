import React, { Component } from 'react';
import { Form } from './Form';
import './styles/index.css';
import { algoliaKey, searchKey } from './secrets.js';

import algoliasearch from 'algoliasearch';

const client = algoliasearch(algoliaKey, searchKey);

const index = client.initIndex('emojis');

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('https://alg.li/emojis.json')
      .then(function(response) {
        return response.json();
      })
      .then(function(products) {
        return index.saveObjects(products, {
          autoGenerateObjectIDIfNotExist: true,
        });
      });
  }

  handleChange(event) {
    event.preventDefault();
    index.search(event.target.value).then(({ hits }) => {
      console.log(hits);
    });
  }

  render() {
    return (
      <div className="App">
        <Form handleChange={this.handleChange} />
      </div>
    );
  }
}

export default App;
