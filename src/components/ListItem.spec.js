import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';

import ListItem from './ListItem';
import { ADD_STAR, REMOVE_STAR } from './StarButton';

const testRepository = {
  "url": "https://github.com/tbehrsin/github-starred",
  "nameWithOwner": "tbehrsin/github-starred",
  "name": "github-starred",
  "owner": {
    "avatarUrl": "https://avatars0.githubusercontent.com/u/45790596?v=4",
    "login": "github-starred"
  },
  "descriptionHTML": "<div>description html</div>",
  "stargazers": {
    "totalCount": 123
  },
  "id": "MDEwOlJlcG9zaXRvcnkxMjQyNTcyMzM=",
  "viewerHasStarred": false
};

const addStarMocks = [
  {
    request: {
      query: ADD_STAR,
      variables: { id: testRepository.id }
    },
    result: {
      data: {
        addStar: {
          clientMutationId: null,
          starrable: {
            viewerHasStarred: true
          }
        }
      }
    }
  }
];

const removeStarMocks = [
  {
    request: {
      query: REMOVE_STAR,
      variables: { id: testRepository.id }
    },
    result: {
      data: {
        removeStar: {
          clientMutationId: null,
          starrable: {
            viewerHasStarred: false
          }
        }
      }
    }
  }
];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render((
    <MockedProvider>
      <ListItem repository={testRepository} />
    </MockedProvider>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});

it('stars a repository', async () => {
  testRepository.viewerHasStarred = false;
  const onChange = jest.fn();

  const component = renderer.create(
    <MockedProvider mocks={addStarMocks} addTypename={false}>
      <ListItem repository={testRepository} onChange={onChange} />
    </MockedProvider>
  );

  let tree = component.toJSON();
  expect(tree.children).toMatchSnapshot();

  const button = component.root.findByType('button');
  button.props.onClick();

  expect(onChange).not.toHaveBeenCalled();

  await wait(0);

  expect(onChange).toHaveBeenCalled();

  tree = component.toJSON();
  expect(tree.children).toMatchSnapshot();
});

it('unstars a repository', async () => {
  testRepository.viewerHasStarred = true;
  const onChange = jest.fn();

  const component = renderer.create(
    <MockedProvider mocks={removeStarMocks} addTypename={false}>
      <ListItem repository={testRepository} onChange={onChange} />
    </MockedProvider>
  );

  let tree = component.toJSON();
  expect(tree.children).toMatchSnapshot();

  const button = component.root.findByType('button');
  button.props.onClick();

  expect(onChange).not.toHaveBeenCalled();

  await wait(0);

  expect(onChange).toHaveBeenCalled();

  tree = component.toJSON();
  expect(tree.children).toMatchSnapshot();
});
