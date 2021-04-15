import React, { useState, useEffect } from 'react';
import { useHistory, Prompt } from 'react-router-dom';
import { Action, Location } from 'history';
import Modal from 'carbon-components-react/es/components/Modal';

interface BeforeSavePromptProps {
  when: boolean;
}

const BeforeSavePrompt: React.FC<BeforeSavePromptProps> = ({ when }) => {
  const history = useHistory();

  useEffect(() => {
    const unblock = history.block(tx => {
      if (window.confirm(`Are you sure you want to leave?`)) {
        unblock();
      } else {
        unblock();
        history.push(history.location.pathname);
      }
    });
  }, []);

  return <></>;
};

export default BeforeSavePrompt;
