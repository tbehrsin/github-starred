import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import ListItem from './ListItem';

const SEARCH = gql`
  query Search($query: String!) {
    search(query: $query, type: REPOSITORY, first: 100) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            url
            nameWithOwner
            name
            owner {
              avatarUrl
              login
            }
            descriptionHTML
            stargazers {
              totalCount
            }
          }
          ... on Starrable {
            id
            viewerHasStarred
          }
        }
      }
    }
  }
`;

export default ({ query }) => (
  <Query query={SEARCH} variables={{ query }}>
    {({ loading, error, data, refetch }) => {

      if (loading) {
        return <div>Loading...</div>
      }

      if (error) {
        return <div>Error</div>
      }

      return (
        <div>
          {data.search.edges.map(({ node }) => (
            <ListItem
              key={node.nameWithOwner}
              repository={node}
              onChange={() => refetch()}
            />
          ))}
        </div>
      );
    }}
  </Query>
);
