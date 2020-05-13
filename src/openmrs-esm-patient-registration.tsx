import './set-public-path';
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Root from './root.component';
import { backendDependencies } from './openmrs-backend-dependencies';

const { bootstrap, mount, unmount } = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
});

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

export { bootstrap, mount, unmount, backendDependencies, importTranslation };
