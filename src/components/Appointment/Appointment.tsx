import React from 'react'
import AppointmentListing from './AppointmentListing'
import AppointmentTransaction from './AppointmentTransaction'
import { useLocation } from 'react-router-dom';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Appointment = () => {

  const query = useQuery();
  const tab = query.get('tab');

  return (
    <div>
      { tab !== 'appointment-transaction' ? <AppointmentListing/> : <AppointmentTransaction/> }
         
        {/* <Patient_details/> */}
         
        {/*<Doctor_details_tabs/>*/}
    </div>
  )
}

export default Appointment