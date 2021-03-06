
import React from 'react';
import styled from 'styled-components';
import { Search } from 'styled-icons/octicons';

const Container = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-flow: row nowrap;
  align-items: center;
  background: white;
  border-bottom: 1px solid #ccc;
  padding: 0 0.5em;
  font-size: 1.25em;
`;

const Input = styled.input`
  flex: 1 1 100%;
  background: transparent;
  border: none;
  padding: 0.3em 0.6em;
  font: inherit;
  outline: none;
`;

export default ({ value, onChangeText }) => {
  return (
    <Container>
      <Search size="17" />
      <Input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(event) => onChangeText(event.target.value)}
      />
    </Container>
  );
};
