import React from 'react';
import styled from 'styled-components';
import { Repo, Star } from 'styled-icons/octicons';

import StarButton from './StarButton';

const Container = styled.div`
  border: 1px solid #d1d5da;
  border-radius: 3px;
  background: white;
  padding: 16px;
  box-sizing: border-box;
  margin: 16px;

  & > * + * {
    margin-top: 8px;
  }
`;

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;

const RepositoryName = styled.a`
  font-weight: bold;
  text-decoration: none;
  color: inherit;

  & > * + * {
    margin-left: 0.3em;
  }
`;

const Description = styled.div`
  font-size: 15px;
  line-height: 22px;
  color: #586069;
`;

const Stargazers = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: #586069;
  font-size: 12px;

  & > * + * {
    margin-left: 0.3em;
  }
`;



export default ({ repository, onChange }) => {
  return (
    <Container>
      <Row>
        <RepositoryName href={repository.url} target="_new">
          <Repo size={16} />
          <span>{repository.owner.login}/{repository.name}</span>
        </RepositoryName>
        <StarButton repository={repository} onChange={onChange} />
      </Row>
      <Description dangerouslySetInnerHTML={{ __html: repository.descriptionHTML }} />
      <Stargazers>
        <Star size={12} />
        <span>{repository.stargazers.totalCount}</span>
      </Stargazers>
    </Container>
  );
};
