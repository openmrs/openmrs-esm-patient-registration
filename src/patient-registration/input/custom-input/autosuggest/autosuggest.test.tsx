import React from 'react';
import { Autosuggest } from './autosuggest.component';
import { render, screen, fireEvent, waitForElement } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

const mockPersons = [
  {
    uuid: 'randomuuid1',
    display: 'John Doe',
  },
  {
    uuid: 'randomuuid2',
    display: 'John Smith',
  },
  {
    uuid: 'randomuuid3',
    display: 'James Smith',
  },
  {
    uuid: 'randomuuid4',
    display: 'Spider Man',
  },
];

const mockGetSearchResults = async (query: string) => {
  return mockPersons.filter(person => {
    return person.display.toUpperCase().includes(query.toUpperCase());
  });
};

const handleSuggestionSelected = jest.fn((field, value) => [field, value]);

describe('autosuggest', () => {
  const setup = () => {
    render(
      <BrowserRouter>
        <Autosuggest
          name="person"
          placeholder="Find Person"
          onSuggestionSelected={handleSuggestionSelected}
          getSearchResults={mockGetSearchResults}
          getDisplayValue={item => item.display}
          getFieldValue={item => item.uuid}
        />
      </BrowserRouter>,
    );
  };

  it('should render a search box', () => {
    setup();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.queryByRole('list')).toBeNull();
  });

  it('shows search results in an ul', async () => {
    setup();
    const searchbox = screen.getByRole('searchbox');
    fireEvent.change(searchbox, { target: { value: 'john' } });
    const list = await waitForElement(() => screen.getByRole('list'));
    expect(list).toBeInTheDocument();
    expect(list.children).toHaveLength(2);
  });

  it('creates li items whose inner text is gotten through getDisplayValue', async () => {
    setup();
    const searchbox = screen.getByRole('searchbox');
    fireEvent.change(searchbox, { target: { value: 'john' } });
    const list = await waitForElement(() => screen.getAllByRole('listitem'));
    expect(list[0].textContent).toBe('John Doe');
    expect(list[1].textContent).toBe('John Smith');
  });

  it('triggers onSuggestionSelected with correct values when li is clicked', async () => {
    setup();
    const searchbox = screen.getByRole('searchbox');
    fireEvent.change(searchbox, { target: { value: 'john' } });
    const listitems = await waitForElement(() => screen.getAllByRole('listitem'));
    fireEvent.click(listitems[0]);
    expect(handleSuggestionSelected).toHaveBeenNthCalledWith(1, 'person', 'randomuuid1');
  });

  it.skip('sets search box value to selected suggestion', async () => {
    setup();
    let searchbox = screen.getByRole('searchbox');
    fireEvent.change(searchbox, { target: { value: 'john' } });
    const listitems = await waitForElement(() => screen.getAllByRole('listitem'));
    fireEvent.click(listitems[0]);
    searchbox = screen.getByRole('searchbox');
    expect(searchbox.textContent).toBe('John Doe');
  });

  it('clears suggestions when a suggestion is selected', async () => {
    setup();
    let list = screen.queryByRole('list');
    expect(list).toBeNull();
    const searchbox = screen.getByRole('searchbox');
    fireEvent.change(searchbox, { target: { value: 'john' } });
    list = await waitForElement(() => screen.queryByRole('list'));
    expect(list).toBeInTheDocument();
    const listitems = screen.getAllByRole('listitem');
    fireEvent.click(listitems[0]);
    list = screen.queryByRole('list');
    expect(list).toBeNull();
  });
});
