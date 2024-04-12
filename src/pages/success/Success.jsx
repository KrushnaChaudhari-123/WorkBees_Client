import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./success.css";

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.put("/orders", { payment_intent });
        setTimeout(() => {
          navigate("/orders");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, []);

  // window.onload = function() {
  //   var successMessage = document.getElementById('success');
  //   successMessage.classList.add('show');
  // };
  
  return (
    <div className="block">
    <div id='success'>
      <img id ='image'src="../../../public/images/success.png" alt="" />
      <span id="heading">Payment successful. </span>
      You are being redirected to the orders page. Please do
      not close the page
    </div>
    </div>
  );
};

export default Success;
