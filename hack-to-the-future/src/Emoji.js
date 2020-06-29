import React from 'react';

export const Emoji = props => {
  return props.emojis ? (
    <div className="grid">
      <div className="top row">
        <h4 className="item">Name:</h4>
        <h4 className="item">Description:</h4>
        <h4 className="item">Unicode:</h4>
        {/* <h4 className="item">Emoji:</h4> */}
      </div>
      {props.emojis.map(emoji => (
        <div className="row" key={emoji.unicode}>
          <p className="item">{emoji.name}</p>
          <p className="item">{emoji.descrip}</p>
          <p className="item">{emoji.unicode}</p>
          {/* {!emoji.unicode.split(' ')[1] && (
            <p className="item">{emoji.unicode.replace('U+', '&#x') + ';'}</p>
          )} */}
        </div>
      ))}
    </div>
  ) : (
    <div>Search for some emojis!</div>
  );
};
