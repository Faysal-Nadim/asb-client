import React from "react";
import {
  shipment,
  request,
  purchase,
  calculator,
  express,
  rfq,
} from "../../assets";
import { useNavigate } from "react-router-dom";

/**
 * @author
 * @function OurServices
 **/

export const OurServices = (props) => {
  const services = [
    {
      name: "Request Shipment",
      description: "We provide fast and reliable shipment services.",
      image: shipment,
      to: "/request-shipment",
    },
    {
      name: "Purchase Order",
      description: "We help you purchase products from various vendors.",
      image: purchase,
      to: "/purchase-order",
    },
    {
      name: "Request Product",
      description:
        "You can request products that are not available in the market.",
      image: request,
      to: "/request-product",
    },
    {
      name: "Cost Calculator",
      description: "Use our calculator to estimate costs and savings.",
      image: calculator,
      to: "/cost-calculator",
    },
    {
      name: "Express Delivery",
      description:
        "Get your products delivered quickly with our express delivery service.",
      image: express,
      to: "/express-delivery",
    },
    {
      name: "RFQ",
      description: "Submit your RFQ to get competitive quotes from suppliers.",
      image: rfq,
      to: "/rfq",
    },
  ];

  const navigate = useNavigate();

  return (
    // <div>
    <div className="lg:p-4 md:p-2 sm:p-0 sm:py-4 w-full mx-auto text-center rounded-lg border border-gray-200 bg-white">
      <div className="sm:mx-4 lg:mx-0 md:mx-0">
        <h1 className="text-lg font-bold mb-2">Our Services</h1>

        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-2 gap-2 rounded-lg shadow-md flex flex-col justify-center items-center text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => navigate(service.to)}
            >
              <img
                src={service.image}
                alt={service.name}
                className="lg:w-8 md:w-6 sm:w-6 h-auto lg:mb-2 sm:mb-1"
              />
              <p className="text-sm lg:font-semibold md:font-medium sm:font-normal">
                {service.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
