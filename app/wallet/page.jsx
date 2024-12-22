import React from 'react';
import "./walletPage.css";
const Wallet = () => {
  // rewrite this code @yumna, and create a wallet page!
  return (
    <>
    <section className='header'>
      <h2>Wallet</h2>
      <p>Manage your funds, view transaction history, and make secure purchases for your gaming experience.</p>
    </section>
    <div className='dashboard'>
      <div className='box'>
        <h4>Your Current Balance: </h4>
        <p>$0.00</p>
      </div>
      <button className='box'>Add funds</button>
      <button className='box'>View Transaction History</button>
    </div>
    </>
  )
}

export default Wallet