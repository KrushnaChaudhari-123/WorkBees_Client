import React, { useEffect, useState } from "react";
import "./Pay.scss";
import {  useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51OxwRFSCbVMazcRcHDib1dDyWyOKMOo6QeM69bkOSTu0xYd3ppsncIb5hiQkF6XYh1EOITvsBdsGC4LTaaTkqPfv007pYjlAfw"
);

const Pay = () => {
 
  const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const makeRequest = async () => {
     
      try {
        if(localStorage.getItem('currentUser') === null){
     
          navigate('/login');
          return;
        }
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    
   
    makeRequest();
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return <> 
  <div className="container">
  <div className="pay">
    {clientSecret && (
      <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
  </div>
  </div>
      </>
};

export default Pay;
