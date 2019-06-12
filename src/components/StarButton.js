import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Star } from 'styled-icons/octicons';

const StarButton = styled.button`
  font: inherit;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-left: 8px;
  font-size: 12px;
  line-height: 20px;
  padding: 3px 10px;
  background: #eff3f6 linear-gradient(-180deg,#fafbfc,#eff3f6 90%);
  color: #24292e;
  border: 1px solid rgba(27, 31, 35, 0.2);
  border-radius: 0.25em;
  cursor: pointer;
  font-weight: bold;

  & > * + * {
    margin-left: 0.4em;
  }

  &:hover {
    background: #e6ebf1 linear-gradient(-180deg,#f0f3f6,#e6ebf1 90%);
    border: 1px solid rgba(27, 31, 35, 0.35);
  }

  &:active {
    background: #e9ecef;
    border: 1px solid rgba(27, 31, 35, 0.35);
    box-shadow: inset 0 0.15em 0.3em rgba(27, 31, 35, 0.15);
  }
`;

const ADD_STAR = gql`
  mutation AddStar($id: ID!) {
    addStar(input: { starrableId: $id }) {
      clientMutationId
      starrable {
        viewerHasStarred
      }
    }
  }
`;

const REMOVE_STAR = gql`
  mutation RemoveStar($id: ID!) {
    removeStar(input: { starrableId: $id }) {
      clientMutationId
      starrable {
        viewerHasStarred
      }
    }
  }
`;

export default ({ repository, onChange }) => (
  <Mutation mutation={repository.viewerHasStarred ? REMOVE_STAR : ADD_STAR}>
    {(star, { data }) => {
      const starred = data ?
        (data.addStar || data.removeStar).starrable.viewerHasStarred :
        repository.viewerHasStarred;

      if (data) {
        onChange(starred);
      }

      if (starred) {
        return (
          <StarButton onClick={() => star({ variables: { id: repository.id }})}>
            <Star size={16} />
            <span>Unstar</span>
          </StarButton>
        );
      }

      return (
        <StarButton onClick={() => star({ variables: { id: repository.id }})}>
          <Star size={16} />
          <span>Star</span>
        </StarButton>
      );
    }}
  </Mutation>
);
