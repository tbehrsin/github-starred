import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import ListItem from './ListItem';

const STARRED = gql`
  {
    viewer {
      starredRepositories(first: 10) {
        totalCount
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
  }
`;

export default ({ query }) => (
  <Query query={STARRED}>
    {({ loading, error, data, refetch }) => {

      if (loading) {
        return <div>Loading...</div>
      }

      if (error) {
        return <div>Error</div>
      }

      return (
        <div>
          {data.viewer.starredRepositories.edges.map(({ node }) => (
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
