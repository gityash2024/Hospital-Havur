import React from 'react'
import Widget from "./Widget"
import {FaMoneyCheck ,FaUserInjured  ,FaUserNurse  , FaFileInvoice , FaMoneyBill  , FaCoins ,FaBed  } from 'react-icons/fa';
import { FaUserDoctor } from "react-icons/fa6";

const AdminWidget = () => {
  return (
    <div>
      <div className="row">
        <div className="col-xl-3 col-sm-6 mb-4">
          <Widget
            href="#"
            icon={<FaFileInvoice className="fs-1-xl text-white" />}
            title="Invoice Amount"
            count=" ₹ 4.52M"
            subtitle="Invoice Amount"
          />
        </div>
        <div className="col-xl-3 col-sm-6 mb-4">
          <Widget
            href="#"
            icon={<FaMoneyBill  className="fs-1-xl text-white" />}
            title="Total Revenue"
            count="₹ 1.08M"
            subtitle="Bill Amount"
          />
        </div>
        <div className="col-xl-3 col-sm-6 mb-4">  
          <Widget
            href="#"
            icon={<FaCoins  className="fs-1-xl text-white" />}
            title="Payment Amount"
            count="₹ 220.07k"
            subtitle="Payment Amount"
          />
        </div>
        <div className="col-xl-3 col-sm-6 mb-4">
          <Widget
            href=""
            icon={<FaMoneyCheck  className="fs-1-xl text-white" />}
            title="Advance Payment Amount"
            count="₹ 824.44k"
            subtitle="Advance Payment Amount"
          />
        </div>
        <div className="col-xl-3 col-sm-6 mb-4">
          <Widget
            href=""
            icon={<FaUserDoctor   className="fs-1-xl text-white" />}
            title="Doctors"
            count="146"
            subtitle="Doctors"
          />
        </div>
        <div className="col-xl-3 col-sm-6 mb-4"> 
          <Widget
            href=""
            icon={<FaUserInjured    className="fs-1-xl text-white" />}
            title="Patients"
            count="351"
            subtitle="Patients"
          />
        </div>
        <div className="col-xl-3 col-sm-6 mb-4">
          <Widget
            href=""
            icon={<FaUserNurse     className="fs-1-xl text-white" />}
            title="Nurses"
            count="21"
            subtitle="Nurses"
          />
        </div>
        <div className="col-xl-3 col-sm-6 mb-4">
          <Widget
            href=""
            icon={<FaBed      className="fs-1-xl text-white" />}
            title="Avaiable Beds" 
            count="58"
            subtitle="Avaiable Beds"
          />
        </div>
      </div>
    </div>
  )
}

export default AdminWidget