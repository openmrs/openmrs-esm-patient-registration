export const ConfigMock = {
  personAttributes: [
    {
      subTitle: 'Telephone Number',
      label: '',
      uuid: '14d4f066-15f5-102d-96e4-000c29c2a5d7',
      name: 'phoneNumber',
      placeholder: 'Enter Telephone Number',
      id: 'tel',
      validation: { required: true },
    },
    {
      subTitle: 'Email',
      label: '',
      uuid: '8d809d18-c2cc-11de-8d13-0010c6dffd0f',
      name: 'email',
      placeholder: 'Enter Email Address',
      id: 'unique two',
    },
  ],
  buttons: {
    enabled: true,
    list: [
      {
        label: 'SPA Page',
        link: {
          spa: true,
          url: '/some/route',
        },
      },
      {
        label: 'RefApp Page',
        link: {
          spa: false,
          url: '/openmrs/some/route',
        },
      },
    ],
  },
};
