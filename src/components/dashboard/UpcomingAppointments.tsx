import React from 'react'
import Table from 'react-bootstrap/Table';

const UpcomingAppointments = () => {
  return (
    <div>
      <div className="card mb-7 mt-2">
        <div className="card-header border-0 bg-white"> 
          <h3 className='mb-0 title_sm'><strong>Upcoming Appointments</strong></h3>
        </div>
        <div className="card-body py-3">
          <div className='table-responsive'>  
            <Table hover className='upcoming_appointment mt-4'>
              <thead>
                <tr>
                  <th>Doctor Name</th>
                  <th>Department</th>
                  <th>Patient Name</th>
                  <th>Appointment Date & Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} className="text-center py-5">
                    <h4 className="mb-4">No upcoming appointments</h4>
                    <span role="img" aria-label="calendar" className="fs-1">📅</span>
                  </td>  
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpcomingAppointments