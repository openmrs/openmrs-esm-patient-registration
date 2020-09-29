import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Formik, Form } from 'formik';
import { Autocomplete } from './autocomplete.component';
import * as backendController from './../../patient-registration.resource';
import { getAddressHierarchyMock } from '../../../../__mocks__/openmrs-esm-api.mock';

const SEARCH_RESULTS = {
  data: [
    {
      name: 'Boston',
      uuid: 'a2e76113-fb17-46d0-943d-2036055e22c7',
      userGeneratedId: null,
      parent: {
        name: 'Suffolk County',
        uuid: 'e4f79f9e-4571-4317-bf5a-c86b2365aa21',
        userGeneratedId: null,
        parent: {
          name: 'Massachusetts',
          uuid: '6973c1e5-a3cc-418b-a18c-9baf9cbce07c',
          userGeneratedId: null,
          parent: {
            name: 'United States',
            uuid: '37c4eb36-744d-43dd-958b-72695b1eced8',
            userGeneratedId: null,
          },
        },
      },
    },
    {
      name: 'Boulder',
      uuid: 'dafc1e4b-f66d-4b68-a947-b8da7a35884e',
      userGeneratedId: null,
      parent: {
        name: 'Boulder County',
        uuid: 'e84e8531-59d0-4def-a552-f673b7466173',
        userGeneratedId: null,
        parent: {
          name: 'Colorado',
          uuid: '4cd1cd0a-f788-471c-a772-b51c631872f8',
          userGeneratedId: null,
          parent: {
            name: 'United States',
            uuid: '37c4eb36-744d-43dd-958b-72695b1eced8',
            userGeneratedId: null,
          },
        },
      },
    },
  ],
};

describe('autocomplete', () => {
  const setupSection = async () => {
    const { container, getByLabelText, findByTestId } = render(
      <Formik initialValues={{}} onSubmit={null}>
        <Form>
          <Autocomplete name="someName" label="someLabel" placeholder="some nice placeholder text" />
        </Form>
      </Formik>,
    );

    return { container, getByLabelText, findByTestId };
  };

  it('has one search input field', async () => {
    const autocomplete = await setupSection();
    expect(autocomplete.container.querySelectorAll('.searchInput').length).toBe(1);
  });

  it('search results are hidden on empty input', async () => {
    const autocomplete = await setupSection();
    expect(autocomplete.container.querySelectorAll('.searchResults').length).toBe(0);
  });

  it('message is displayed if there are no search results', async () => {
    const autocomplete = await setupSection();
    const searchInput = autocomplete.getByLabelText('someLabel') as HTMLInputElement;
    spyOn(backendController, 'getAddressHierarchy').and.returnValue(Promise.resolve([]));
    userEvent.type(searchInput, 'Be');
    const results = await autocomplete.findByTestId('search-results');
    expect(results.textContent).toContain('no address found');
  });

  it('search results are displayed if there are any', async () => {
    const autocomplete = await setupSection();
    const searchInput = autocomplete.getByLabelText('someLabel') as HTMLInputElement;
    spyOn(backendController, 'getAddressHierarchy').and.returnValue(getAddressHierarchyMock(SEARCH_RESULTS));
    userEvent.type(searchInput, 'Bo');
    const results = await autocomplete.findByTestId('search-results');
    expect(results.textContent).toContain(SEARCH_RESULTS.data[0].name);
    expect(results.textContent).toContain(SEARCH_RESULTS.data[1].name);
  });
});
