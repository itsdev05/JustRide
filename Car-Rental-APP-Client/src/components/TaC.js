import React, { useState } from 'react';
import '../App.css'
import StripeCheckout from 'react-stripe-checkout';
const TaC = ({onToken, totalAmount}) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleCheckboxChange = () => {
    setAcceptedTerms(!acceptedTerms);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (acceptedTerms) {
      // Proceed with rental process
      
      <StripeCheckout/>

    } else {
      alert('Please accept the terms and conditions to proceed.');
    }
  };

  return (
    <div>
      <h2>Vehicle Rental Terms and Conditions</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={handleCheckboxChange}
          />
          I have read and accept the terms and conditions
        </label>
        <br />
        <StripeCheckout
         token={onToken}
         shippingAddress
         billingAddress={true}
         currency="inr"
         amount={totalAmount * 100}
         stripeKey="pk_test_51K8lJeSGkXsHpk6s64EtVo37lQmikIps217LhE2fmpwRMj2Ro0iKQvYXcFkMBHjjM4Z6BC5uvxV8XsTbKQFfbQ5y000eSg9RUb">
        <button type="submit" disabled={!acceptedTerms} style={{color:"black"}}>
          Rent Vehicle
        </button>
        </StripeCheckout>
      </form>
      <div>
        <h3>Terms and Conditions:</h3>
        <ul className='numbered-list'>
          <li className='tc'>Late Pickup Policy:
a. If the customer picks up the vehicle later than the scheduled pickup time, the rental charges will not be adjusted. The rental period will commence from the originally agreed upon pickup time.
b. It is the responsibility of the customer to inform us of any delays in picking up the vehicle. Failure to do so may result in the cancellation of the reservation and forfeiture of any payments made.</li>
          <li className='tc'>
          Late Delivery Policy:
a. Customers are expected to return the vehicle at the agreed upon time specified in the rental agreement.
b. If the vehicle is returned later than the scheduled return time, the customer will be subject to additional charges. These charges will be calculated based on the hourly or daily rate specified in the rental agreement.
c. Any additional charges incurred due to late delivery must be paid by the customer upon returning the vehicle.
          </li>
          <li className='tc'>Extension of Rental Period:
a. If the customer wishes to extend the rental period, they must inform us in advance. The extension is subject to vehicle availability and approval by us.
b. Late pickup or delivery of the extended rental period will be subject to the same policies mentioned above.</li>
<li className='tc'>Communication of Delays:
a. In case of delays in pickup or delivery, it is the responsibility of the customer to notify us immediately.
b. We will make reasonable efforts to accommodate any changes in schedule, but cannot guarantee availability or adjustments to rental charges.</li>
<li className='tc'>Exceptions:
a. In exceptional circumstances such as severe weather conditions, natural disasters, or unforeseen events beyond the control of the customer, we may waive the late delivery charges. Documentation or proof of such circumstances may be required.</li>
<li className='tc'>Dispute Resolution:
a. Any disputes regarding late pickup or delivery charges will be resolved in accordance with the terms outlined in the rental agreement.
b. Customers may contact our customer service department for assistance in resolving disputes.</li>
        </ul>
      </div>
    </div>
  );
};

export default TaC;
