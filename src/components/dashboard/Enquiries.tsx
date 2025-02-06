import React from 'react'

const Enquiries = () => {
  return (
    <div>
      <div className="card mb-4 mt-2" >
        <div className="card-header pb-0 px-10 border-0 bg-white">
          <h3 className="mb-0 title_sm">Enquiries</h3>
        </div>
        <div className="card-body py-5 d-flex align-items-center justify-content-center flex-column">
          <h4 className="mb-4 text-center fs-4">No Enquiries yet...</h4>
          <span role="img" aria-label="sad face" className="fs-1">😞</span>
        </div>
      </div>
    </div>
  )
}

export default Enquiries