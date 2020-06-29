import React from 'react';

export const Form = props => {
  return (
    <form
      onChange={event => {
        props.handleChange(event);
      }}
      onSubmit={event => {
        event.preventDefault();
      }}
    >
      <label htmlFor="search">Search For An Emoji: </label>
      <input name="search" type="text" />
    </form>
  );
};
