import React from 'react';
import { useLocation } from 'react-router-dom';
import IPD from './IPD';
import OPD from './OPD';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const IPDOPDManagement = () => {
  const query = useQuery();
  const tab = query.get('tab');

  return (
    <div>
      { tab !== 'OPD-patients' ? <IPD/> : <OPD/> }
    </div>
  );
}

export default IPDOPDManagement;
