import React from 'react';

function App() {
  const paymentStyles = {
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
            <p className="text-2xl font-bold text-gray-900">₹1.00</p>
          </div>

          <button 
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => console.log('Payment button clicked')}
          >
            Pay Now
          </button>

          <div className="flex items-center justify-center space-x-4 mt-6">
            <img src="social.png" alt="razorpay" className="h-6" />
            <img src="shield.gif" alt="secure" className="h-6" />
          </div>

          <p className="text-xs text-center text-gray-500 mt-4">
            This is a secure, encrypted payment
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;