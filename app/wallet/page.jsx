import React from 'react';
const Wallet = () => {
  // rewrite this code @yumna, and create a wallet page!
  return (
    <div className='text-white'>
      <div className="cards bg-white w-full md:w-4/5 mx-auto bg-opacity-20 p-5 md:flex grid grid-cols-2 flex-col md:flex-row gap-5 md:my-10 justify-around md:gap-10 items-center">
        <div className="card w-[170px] text-sm md:w-[200px] md:text-md flex space-y-2 flex-col bg-white bg-opacity-30 px-6 py-2 rounded-md text-white">
          <span className='font-semibold text-xl'>Spendings</span>
          <span>$300</span>
        </div>
        <div className="card hidden md:flex w-[170px] text-sm md:w-[200px] md:text-md space-y-2 flex-col bg-white bg-opacity-30 px-6 py-2 rounded-md text-white">
          <span className='font-semibold text-xl'>Vouchers</span>
          <span>$300</span>
        </div>
        <div className="card w-[170px] text-sm md:w-[200px] md:text-md flex space-y-2 flex-col bg-white bg-opacity-30 px-6 py-2 rounded-md text-white">
          <span className='font-semibold text-md'><span className="font-normal">Balance:</span> $0.00</span>
          <button className='px-2 py-1 rounded-md text-sm bg-black bg-opacity-60 hover:bg-opacity-100 transition-opacity duration-300'>
            Add Money
          </button>
        </div>
      </div>
      <div className="mt-10 text-white font-semibold text-2xl mx-4">Add your Credit Card</div>
      <div className="addPaymentInfo mx-4 flex items-center flex-col md:flex-row justify-around">
        <div>
          <form action="" className='space-y-5'>
            <div className="flex flex-col">
              <label htmlFor="cardNumber text-lg">Enter your card Number</label>
              <input type="text" className='border-b-2 bg-transparent border-white' placeholder='1234 5678 1958 4321' />
            </div>

          </form>
        </div>
        <div>
          <img className='w-[200px] md:w-[350px]' src="./credit_card.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Wallet