// PaymentScreen.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentScreen = ({amount}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePayment = async () => {

    let backend_url="https://payment-intregation.onrender.com"
    const { name, email, contact, address } = formData;

    if (!name || !email || !contact || !address) {
      alert("Please fill in all the fields.");
      return;
    }

    try {
      // First create order on backend
      const response = await fetch(`${backend_url}/api/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number: amount })
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to create order');
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: "INR",
        name: "₷oµmăɗİþ",
        description: "Payment For Work",
        image: "check.png",
        order_id: data.order.id,
        handler: async function (response) {
          try {
            const verifyResponse = await fetch(`${backend_url}/api/verify`, {
              method: 'POST',
              mode: 'no-cors',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              })
            });
            
            const verifyData = await verifyResponse.json();
            
            if (verifyData.success) {
              navigate(`/payment-success?reference=${response.razorpay_payment_id}`);
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Verification Error:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name,
          email,
          contact,
        },
        notes: {
          address,
        },
        theme: {
          color: "#A02727",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
      
      razor.on("payment.failed", (response) => {
        console.error("Payment Failed: ", response.error);
        alert(`Payment failed: ${response.error.description}`);
      });
    } catch (error) {
      console.error('Payment Error:', error);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="mx-auto w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Complete Payment</h1>
          <p className="text-gray-600 mt-2">Secure payment via Razorpay</p>
        </div>

        <div className="space-y-4">
          <div className="border rounded-md p-4">
            <p className="text-sm text-gray-600">Amount to Pay</p>
            <p className="text-2xl font-bold text-gray-900">₹{amount}.00</p>
          </div>

          <div className="space-y-2">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
            />
            <input
              type="tel"
              name="contact"
              placeholder="Your Phone Number"
              value={formData.contact}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
            />
            <input
              type="text"
              name="address"
              placeholder="Your Address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
            />
          </div>

          <button
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
            onClick={handlePayment}
          >
            Pay Now
          </button>

          <div className="flex items-center justify-center space-x-4 mt-6">
            <img src="social.png" alt="razorpay" className="h-6" />
            <img src="shield.gif" alt="secure" className="h-6" />
          </div>

          <p className="text-xs text-center text-gray-500 mt-4">
            This is a secure, encrypted payment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;