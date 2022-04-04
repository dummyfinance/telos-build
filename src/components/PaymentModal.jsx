import { useState } from "react";
import { ethers } from "ethers";

function PaymentModal(props) {
  let [amount, setAmount] = useState(1);
  const PRECISION = 10 ** 18;

  // sets the modalShow state to false to disable rendering of modal
  function closeModal() {
    props.setModalShow(false);
  }

  // set the value of input element to state variable upon change
  function handleChange(e) {
    setAmount(e.target.value);
  }

  // call function in the smart contract to send TELOS token
  // to fund the project
  async function sendFund() {
    console.log("Sending fund...");
    if (amount <= 0) {
      alert('Amount is less than or equal to 0');
      return;
    }
    try {
      let fund = { value: ethers.utils.parseEther(amount.toString()) };
      let txn = await props.contract.fundProject(props.index, fund);
      await txn.wait();
      alert(`${amount} TELOS Succesfully Funded`);

      setAmount(1);
      closeModal();
    } catch (error) {
      console.log("Funding error: ");
      console.log(error);
      console.log("................");
      alert("Error Sending TELOS");
    }
  }

  return (
    <div>
    <input type="checkbox" id="my-modal-4" className="modal-toggle"></input>
    <div className="modal modal-bottom sm:modal-middle">
        <h1>
          Fund Project{" "}
          <span className="closeBtn" onClick={() => closeModal()}>
            &times;
          </span>
        </h1>
      <div className="py-4">
        <div className="paymentForm">
          <label className="paymentLabel">Amount (TELOS)</label>
          <input
            type="number"
            name="payment"
            id="payment"
            className="payment"
            placeholder="Enter TELOS amount"
            min="1"
            step="1"
            value={amount}
            onChange={handleChange}
            required
          />
          <button className="submit" onClick={() => sendFund()}>
            Fund
          </button>
        </div>
      </div>
    </div></div>

  );
}

export default PaymentModal;