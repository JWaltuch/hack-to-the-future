import React, { Component } from 'react';
import { Form } from './Form';
import { Emoji } from './Emoji';
import './styles/index.css';
import { algoliaKey, searchKey } from './secrets.js';

import algoliasearch from 'algoliasearch';

const client = algoliasearch(algoliaKey, searchKey);

const index = client.initIndex('emojis');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { emojis: [] };
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
    if (event.target.value !== '') {
      index.search(event.target.value).then(({ hits }) => {
        let newState = [];
        Object.values(hits).forEach(hit => {
          console.log(hit);
          newState.push({
            name: hit.name,
            descrip: hit.definition
              .split(' ')
              .map(x => x.replace('??', ''))
              .map(x => x.replace('?', ''))
              .join(' '),
            // unicode: hit.unicode
            //   .split(' ')
            //   .map(x => x.replace('U+', '&#') + ';')
            //   .join('&#x200D;'),
            unicode: hit.unicode,
          });
        });
        this.setState({ emojis: newState });
      });
    } else {
      this.setState({ emojis: [] });
    }
  }

  render() {
    return (
      <div className="App">
        <h1 className="header">Let's Learn About Some Emojis Today! 🙂</h1>
        <p>
          Emoji refers to small pictures used on smartphones, tablets, and other
          electronic devices to convey emotion or represent an object or symbol
          more succinctly than a text statement. Emoji are an evolution of the
          text-based, picture-like emoticons that users created and included in
          e-mails and early text messages.
        </p>
        <Form handleChange={this.handleChange} />
        <Emoji emojis={this.state.emojis} />
      </div>
    );
  }
}

export default App;
