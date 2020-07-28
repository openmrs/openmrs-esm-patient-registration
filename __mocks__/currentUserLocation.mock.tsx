export const mockCurrentUserLocation = {
  data: {
    authenticated: true,
    locale: 'en_GB',
    currentProvider: {
      uuid: 'f9badd80-ab76-11e2-9e96-0800200c9a66',
      display: 'UNKNOWN - Super User',
      person: {
        uuid: '24252571-dd5a-11e6-9d9c-0242ac150002',
        display: 'Super User',
        links: [
          {
            rel: 'self',
            uri: 'http://localhost:8090/openmrs/ws/rest/v1/person/24252571-dd5a-11e6-9d9c-0242ac150002',
          },
        ],
      },
      identifier: 'UNKNOWN',
      attributes: [],
      retired: false,
      links: [
        {
          rel: 'self',
          uri: 'http://localhost:8090/openmrs/ws/rest/v1/provider/f9badd80-ab76-11e2-9e96-0800200c9a66',
        },
        {
          rel: 'full',
          uri: 'http://localhost:8090/openmrs/ws/rest/v1/provider/f9badd80-ab76-11e2-9e96-0800200c9a66?v=full',
        },
      ],
      resourceVersion: '1.9',
    },
    sessionLocation: { uuid: 'hghgggggg' },
    user: {
      uuid: '45ce6c2e-dd5a-11e6-9d9c-0242ac150002',
      display: 'admin',
      username: '',
      systemId: 'admin',
      userProperties: {
        loginAttempts: '0',
      },
      person: {
        uuid: '24252571-dd5a-11e6-9d9c-0242ac150002',
        display: 'Super User',
        links: [
          {
            rel: 'self',
            uri: 'http://localhost:8090/openmrs/ws/rest/v1/person/24252571-dd5a-11e6-9d9c-0242ac150002',
          },
        ],
      },
      privileges: [],
      roles: [
        {
          uuid: '8d94f852-c2cc-11de-8d13-0010c6dffd0f',
          display: 'System Developer',
          links: [
            {
              rel: 'self',
              uri: 'http://localhost:8090/openmrs/ws/rest/v1/role/8d94f852-c2cc-11de-8d13-0010c6dffd0f',
            },
          ],
        },
        {
          uuid: '8d94f280-c2cc-11de-8d13-0010c6dffd0f',
          display: 'Provider',
          links: [
            {
              rel: 'self',
              uri: 'http://localhost:8090/openmrs/ws/rest/v1/role/8d94f280-c2cc-11de-8d13-0010c6dffd0f',
            },
          ],
        },
      ],
      retired: false,
      links: [
        {
          rel: 'self',
          uri: 'http://localhost:8090/openmrs/ws/rest/v1/user/45ce6c2e-dd5a-11e6-9d9c-0242ac150002',
        },
        {
          rel: 'full',
          uri: 'http://localhost:8090/openmrs/ws/rest/v1/user/45ce6c2e-dd5a-11e6-9d9c-0242ac150002?v=full',
        },
      ],
      resourceVersion: '1.8',
    },
  },
};
