import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';

const Button = styled.a`
  text-decoration: none;
  background: #28a745 linear-gradient(-180deg, #34d058, #28a745 90%);
  border: none;
  border-radius: 0.25em;
  color: white;
  font: inherit;
  font-weight: 600;
  padding: 0.3em 0.6em;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:hover {
    background: #269f42 linear-gradient(-180deg, #2fcb53, #269f42 90%);
  }

  &:active {
    background: #279f43;
    box-shadow: inset 0 0.15em 0.3em rgba(27, 31, 35, 0.15);
    color: #eee;
  }
`;

const GET_LOGIN = gql`
  {
    viewer {
      login
    }
  }
`;

export default () => (
  <Query query={GET_LOGIN}>
    {({ loading, error, data }) => {
      if (error) {
        return (
          <Button href={`https://github.com/login/oauth/authorize?scope=public_repo,private_repo&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`}>
            Sign in to GitHub
          </Button>
        );
      }

      if (!loading) {
        return (
          <span>
            Logged in as {data.viewer.login}
          </span>
        )
      }

      return (
        <></>
      );
    }}
  </Query>
);
