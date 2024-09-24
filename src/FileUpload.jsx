import React, { useEffect, useState } from 'react';

const BillingDetails = () => {
  const [billingData, setBillingData] = useState(null);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const response = await fetch('./billingData.json');  // Update the path if necessary
        if (!response.ok) {
          throw new Error('Failed to fetch billing data');
        }
        const data = await response.json();
        setBillingData(data);
      } catch (error) {
        console.error('Error loading billing data:', error);
        setError(error.message);  // Set error state
      }
    };

    fetchBillingData();
  }, []);

  if (error) {
    return <div>Error loading billing data. Please try again later.</div>;  // Render error message
  }

  if (!billingData) {
    return <div>Loading...</div>;
  }

  const { billingDetails, paymentSummary, paymentHistory } = billingData;

  return (
    <div className="min-h-screen flex flex-col md:flex-row p-4 md:p-6">
      {/* Left Sidebar */}
      <div className="w-full md:w-1/4 bg-[#edf5ff] rounded-2xl shadow-lg p-4 md:p-6 mb-6 md:mb-0 lg:mx-14 md:mx-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Billing Details</h2>
          <button className="border border-[#007dff] bg-[#edf5ff] text-[#007dff] py-1 px-4 rounded-full text-sm md:text-base hover:bg-[#e0eaff]">
            Change
          </button>
        </div>
        <div className="space-y-4 text-sm md:text-base">
          <div>
            <p className="font-bold">Subscription Plan</p>
            <p>{billingDetails.subscriptionPlan}</p>
          </div>
          <div>
            <p className="font-bold">Billing Frequency</p>
            <p>{billingDetails.billingFrequency}</p>
          </div>
          <div>
            <p className="font-bold">User name</p>
            <p>{billingDetails.userName}</p>
          </div>
          <div>
            <p className="font-bold">Company Name</p>
            <p>{billingDetails.companyName}</p>
          </div>
          <div>
            <p className="font-bold">Address</p>
            <p>{billingDetails.address.line1}, {billingDetails.address.line2}, {billingDetails.address.city}, {billingDetails.address.state}, {billingDetails.address.postalCode}</p>
          </div>
          <div>
            <p className="font-bold">GST Number</p>
            <p>{billingDetails.gstNumber}</p>
          </div>
        </div>
        <div className="mt-4">
          <a href={billingDetails.supportLink} className="text-[#007dff] hover:underline text-sm md:text-base">Contact our support now</a>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-3/4 bg-white rounded-lg p-4 md:p-6">
        <div className="bg-[#fff5c3] rounded-lg p-4 mb-6 text-sm md:text-base">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p>Next Payment Due: ₹ {paymentSummary.nextPaymentDueAmount}</p>
            <p>Date: {paymentSummary.nextPaymentDueDate}</p>
            <button className="bg-[#008080] hover:bg-[#ffe6a8] text-white px-5 py-2 rounded-lg font-semibold shadow-md transition-colors duration-300">
              Pay Now
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm md:text-base">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Payment Mode</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr className="border-b" key={index}>
                  <td className="p-2">{payment.date}</td>
                  <td className="p-2">{payment.paymentMode}</td>
                  <td className="p-2">₹ {payment.amount}</td>
                  <td className="p-2">{payment.status}</td>
                  <td className="p-2 text-[#007dff] hover:underline cursor-pointer">
                    {payment.invoice ? <a href={`https://invoice.url/${payment.invoice}`}>{payment.invoice}</a> : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillingDetails;
