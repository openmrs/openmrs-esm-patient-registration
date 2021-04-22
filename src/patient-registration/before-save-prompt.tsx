import React, { useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'carbon-components-react/es/components/Modal';
import { useTranslation } from 'react-i18next';

const getUrlWithoutPrefix = url => url.split(window['getOpenmrsSpaBase']())?.[1];
const noop = () => {};

interface BeforeSavePromptProps {
  when: boolean;
}

const BeforeSavePrompt: React.FC<BeforeSavePromptProps> = ({ when }) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [newUrl, setNewUrl] = useState(undefined);
  const { t } = useTranslation();

  const cancelNavFn = useCallback(evt => {
    if (!open && !evt.detail.navigationIsCanceled) {
      evt.detail.cancelNavigation();
      setNewUrl(evt.detail.newUrl);
      setOpen(true);

      // once the listener is run, we want to remove it immediately in case an infinite loop occurs due
      // to constant redirects
      evt.target.removeEventListener('single-spa:before-routing-event', cancelNavFn);
    }
  }, []);

  useEffect(() => {
    if (when) {
      window.addEventListener('single-spa:before-routing-event', cancelNavFn);
      window.onbeforeunload = () => {
        return 'do you want to leave?';
      };
    }

    return () => {
      window.onbeforeunload = noop;
    };
  }, [when]);

  return (
    <Modal
      {...{
        open,
        danger: true,
        modalHeading: t('discardModalHeader'),
        primaryButtonText: t('discard'),
        secondaryButtonText: t('cancel'),
        onRequestClose: () => {
          setOpen(false);
          // add the route blocked when
          window.addEventListener('single-spa:before-routing-event', cancelNavFn);
        },
        onRequestSubmit: () => {
          history.push(`/${getUrlWithoutPrefix(newUrl)}`);
        },
      }}>
      {t('discardModalBody')}
    </Modal>
  );
};

export default BeforeSavePrompt;
