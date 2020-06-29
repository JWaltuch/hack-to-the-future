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
    index.search(event.target.value).then(({ hits }) => {
      Object.values(hits).forEach(hit => {
        console.log(hit);
        let newState = [...this.state.emojis];
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
        this.setState({ emojis: newState });
      });
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Let's Learn About Some Emojis Today! 🙂</h1>
        <Form handleChange={this.handleChange} />
        <Emoji emojis={this.state.emojis} />
      </div>
    );
  }
}

export default App;
