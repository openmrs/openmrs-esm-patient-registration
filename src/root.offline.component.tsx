import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Tile } from 'carbon-components-react';

export default function Root() {
  return (
    <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
      <main
        className="omrs-main-content"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Tile style={{ maxWidth: '80%' }}>
          <h4>
            <span role="img" aria-label="wave emoji">
              👋🏻
            </span>{' '}
            Hello from <code>@openmrs/esm-patient-registration-app</code>!
          </h4>

          <br />

          <p>
            You should only ever see this page when you are offline. <br /> For the moment it serves as a placeholder
            which, while not having any real functionality yet, does show that this microfrontend is capable of being
            displayed without an internet connection.
          </p>
        </Tile>
      </main>
    </BrowserRouter>
  );
}
