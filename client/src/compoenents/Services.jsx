import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { MdSecurity } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";

const Services = () => {
  return (
    <div className="services">
      <div className="service-container">
        <div className="service-item service-1">
          <h2>
            <TbTruckDelivery />
          </h2>
          <p>Super Fast and Free Delivery</p>
        </div>
        <div className="col-services">
          <div className="service-item service-2">
            <h2>
              <MdSecurity />
            </h2>
            <p>Non-Contact Shipping</p>
          </div>
          <div className="service-item service-3">
            <h2>
              <GiReceiveMoney />
            </h2>
            <p>Money-back Garanteed</p>
          </div>
        </div>
        <div className="service-item service-4">
          <h2>
            <RiSecurePaymentLine />
          </h2>
          <p>Super-Secure Payment System</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
