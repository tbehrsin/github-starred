import React, { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import { LogoGithub } from 'styled-icons/octicons';

import LoginButton from './components/LoginButton';
import SearchInput from './components/SearchInput';
import StarredList from './components/StarredList';
import SearchList from './components/SearchList';

const Header = styled.div`
  display: flex;
  flex-flow: row nowrap;
  background: black;
  color: white;
  align-items: center;
  justify-content: space-between;
  padding: 0 1em;
`;

const Logo = styled.span`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  font-size: 1.45em;


  > * + * {
    margin-left: 0.5em;
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;


  & > div {
    max-width: 660px;
    width: 100%;
  }
`;

const App = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <Header>
          <Logo>
            <LogoGithub size="72" />
            <span>Starred</span>
          </Logo>
          <LoginButton />
        </Header>
        <SearchInput value={query} onChangeText={(value) => setQuery(value)} />
      </header>
      <ListContainer><div>
        {!query.trim() && <StarredList />}
        {query.trim() && <SearchList query={query} />}
      </div></ListContainer>
    </div>
  );
};

export default App;
