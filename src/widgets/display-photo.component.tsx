import React, { useEffect, useState } from 'react';
import { useConfig } from '@openmrs/esm-react-utils';
import placeholder from '../assets/placeholder.png';
import { fetchPatientPhotoUrl } from '../patient-registration/patient-registration.resource';

export default function DisplayPatientPhoto(props: { patientUuid: string }) {
  const [photo, setPhoto] = useState(placeholder);
  const config = useConfig();

  useEffect(() => {
    const ac = new AbortController();
    if (props.patientUuid) {
      fetchPatientPhotoUrl(props.patientUuid, config.concepts.patientPhotoUuid, ac)
        .then(data => data && setPhoto(data))
        .catch(error => {
          if (error.code !== 20) {
            return Promise.reject(error);
          }
        });
    }
    return () => ac.abort();
  }, [props.patientUuid]);

  return (
    <div>
      <img src={photo} alt="Patient avatar" style={{ width: '100%' }} />
    </div>
  );
}
