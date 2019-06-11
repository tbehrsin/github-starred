import React from 'react';
import styled from 'styled-components';
import './App.css';
import { LogoGithub } from 'styled-icons/octicons';

import Login from './components/Login';
import SearchInput from './components/SearchInput';

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

const App = () => (
    <div className="App">
      <header className="App-header">
        <Header>
          <Logo>
            <LogoGithub size="72" />
            <span>Starred</span>
          </Logo>
          <Login />
        </Header>
        <SearchInput />
      </header>
    </div>
);

export default App;
