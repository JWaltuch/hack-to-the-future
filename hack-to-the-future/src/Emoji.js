import React from 'react';

export const Emoji = props => {
  return props.emojis ? (
    props.emojis.map(emoji => (
      <div class="row" key={emoji.unicode}>
        <h4>{emoji.name}</h4>
        <h5>{emoji.descrip}</h5>
        <p>{emoji.unicode}</p>
      </div>
    ))
  ) : (
    <div>Search for some emojis!</div>
  );
};
