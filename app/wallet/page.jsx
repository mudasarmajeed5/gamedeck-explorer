import React from 'react';
import "./walletPage.css";
const Wallet = () => {
  // rewrite this code @yumna, and create a wallet page!
  return (
    <>
  <header className="header">
    <div className="header-content">
      <h1 className="wallet-title">My Wallet</h1>
      <p className="wallet-slogan">Manage your funds, purchases, and transactions.</p>
    </div>
  </header>

  <section className="wallet-info">
    <div className="balance">
      <h2>Account Balance</h2>
      <p>$150.00</p>
    </div>

    <div className="transactions">
      <h2>Transaction History</h2>
      <ul>
        <li>Game Purchase - $40.00</li>
        <li>Game Deposit - $50.00</li>
        <li>Subscription - $10.00</li>
      </ul>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Transaction Type</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Game Purchase</td>
            <td>$40.00</td>
            <td>2024-12-20</td>
          </tr>
          <tr>
            <td>Game Deposit</td>
            <td>$50.00</td>
            <td>2024-12-18</td>
          </tr>
          <tr>
            <td>Subscription</td>
            <td>$10.00</td>
            <td>2024-12-15</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="add-funds">
      <h2>Add Funds</h2>
      <div className="dropdown">
        <button className="add-funds-btn">Add Funds</button>
        <ul className="dropdown-menu">
          <li><a href="#" className="fund-option" data-type="credit-card">Credit Card</a></li>
          <li><a href="#" className="fund-option" data-type="debit-card">Debit Card</a></li>
          <li><a href="#" className="fund-option" data-type="paypal">PayPal</a></li>
        </ul>
      </div>

      <div className="add-funds-form" id="add-funds-form">
        <h3>Enter Card Details</h3>
        <label htmlFor="card-number">Card Number</label>
        <input type="text" id="card-number" placeholder="Enter card number" />
        <label htmlFor="cnic-number">CNIC Number</label>
        <input type="text" id="cnic-number" placeholder="Enter CNIC number" />
        <label htmlFor="expiry-date">Expiry Date</label>
        <input type="text" id="expiry-date" placeholder="MM/YY" />
        <button type="submit">Submit</button>
      </div>
    </div>
  </section>

    </>
  )
}

export default Wallet