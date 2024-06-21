import React from "react";

const CartPage = () => {
  return (
    <div id="cart">
      <h1 id="items">Your Items</h1>
      <form id="cartForm">
        <label htmlFor="shipping-address">Shipping Address:</label>
        <input
          type="text"
          id="shipping-address"
          name="shipping-address"
          required
        />
        <br />
        <label htmlFor="billing-address">Billing Address:</label>
        <input
          type="text"
          id="billing-address"
          name="billing-address"
          required
        />
        <br />
        <label htmlFor="card-number">Credit Card Number:</label>
        <input type="text" id="card-number" name="card-number" required />
        <br />
        <label htmlFor="expiration-date">Expiration Date:</label>
        <input
          type="text"
          id="expiration-date"
          name="expiration-date"
          required
        />
        <br />
        <label htmlFor="cvv">CVV:</label>
        <input type="text" id="cvv" name="cvv" required />
        <br />
        <button
          id="checkout"
          onClick={() => alert("Thank you for your order!")}
        >
          Checkout
        </button>
      </form>
    </div>
  );
};

export default CartPage;
