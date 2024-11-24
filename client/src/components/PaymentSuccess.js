import React, { useEffect, useState } from "react";
import { CheckCircle, ArrowLeft } from "lucide-react";

const PaymentSuccess = () => {
  const [showCheck, setShowCheck] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowCheck(true), 500);
    setTimeout(() => setShowContent(true), 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div
          className={`flex justify-center transition-all duration-700 transform ${
            showCheck ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        >
          <CheckCircle className="w-24 h-24 text-green-500" />
        </div>
        <div
          className={`mt-6 text-center transition-all duration-700 ${
            showContent ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
          }`}
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">
            Your transaction has been completed successfully. We've sent a confirmation email to your inbox.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Amount Paid</span>
              <span className="font-semibold text-gray-800">₹2,499</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Transaction ID</span>
              <span className="font-semibold text-gray-800">TXN123456789</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date</span>
              <span className="font-semibold text-gray-800">November 24, 2024</span>
            </div>
          </div>
          <div className="space-y-3">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
              View Receipt
            </button>
            <button
              className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
              onClick={() => window.location.href = "/"}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;