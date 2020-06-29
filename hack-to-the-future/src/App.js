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
          descrip: hit.definition,
          unicode: hit.unicode
            .split(' ')
            .map(x => x.replace('U+', '&#') + ';')
            .join('&#x200D;'),
        });
        this.setState({ emojis: newState });
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Form handleChange={this.handleChange} />
        {this.state.emojis ? (
          this.state.emojis.map(emoji => (
            <div class="row" key={emoji.unicode}>
              <h4>{emoji.name}</h4>
              <h5>{emoji.descrip}</h5>
              <p>{emoji.unicode}</p>
            </div>
          ))
        ) : (
          <div>Search for some emojis!</div>
        )}
      </div>
    );
  }
}

export default App;
