import React from "react";
import { useState } from "react";
import {
  IonCard,
  IonContent,
  IonTextarea,
  IonModal,
  useIonToast,
} from "@ionic/react";
import { BsFillCheckCircleFill } from "react-icons/bs";

const Donate = ({closeModal}) => {
    const [paymentType, setPaymentType] = useState("Card");
    const [confirmDonation, setConfirmDonation] = useState(false);
    const [donateAmount, setDonateAmount] = useState("");
    const [donateAnonymously, setDonateAnonymously] = useState(false);
    const [donationConfirmed, setDonationConfirmed] = useState(false);
    const [text, setText] = useState("");

    return (
        <>
            <IonContent class="ion-padding" id="donateModalContent">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setConfirmDonation(true);
              }}
            >
              <p id="donateInfo">
                Donate To The Christian Connect Development Team
              </p>

              <div style={{ margin: "10px" }} id="paymentType">
                <div>Payment type:</div>
                <div className="donatePaymentContainer">
                  <label
                    className={
                      paymentType === "Card"
                        ? "paymentTypeChecked"
                        : "paymentType"
                    }
                    htmlFor="CardMethod"
                  >
                    Card
                  </label>
                  <input
                    checked={paymentType === "Card"}
                    onClick={(e) => setPaymentType(e.target.value)}
                    value="Card"
                    name="paymentDonate"
                    type="radio"
                    id="CardMethod"
                  />
                  <label
                    className={
                      paymentType === "EFT"
                        ? "paymentTypeChecked"
                        : "paymentType"
                    }
                    htmlFor="EFTMethod"
                  >
                    EFT
                  </label>
                  <input
                    className="paymentType"
                    checked={paymentType === "EFT"}
                    onClick={(e) => setPaymentType(e.target.value)}
                    value="EFT"
                    name="paymentDonate"
                    type="radio"
                    id="EFTMethod"
                  />
                </div>
              </div>

              <div style={{ margin: "10px" }} id="donateAmount">
                <label> Amount(in ZAR): </label>
                <input
                  value={parseInt(donateAmount, 10)}
                  onChange={(e) => {
                    setDonateAmount(parseInt(e.target.value, 10));
                  }}
                  required
                  style={{ border: "1px solid gray", borderRadius: "5px" }}
                  size="7"
                  type="number"
                />
              </div>

              <div style={{ margin: "10px" }} id="donateMessage">
                <p> Message </p>

                <IonTextarea
                  rows="6"
                  placeholder="A word to accompany your donation..."
                  className="donateTextArea"
                  value={text}
                  onIonChange={(e) => setText(e.target.value)}
                ></IonTextarea>
              </div>

              <div
                style={{
                  margin: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  id="donateAnonymously"
                  style={{ margin: "0 10px" }}
                  type="checkbox"
                  checked={donateAnonymously}
                  onChange={() => setDonateAnonymously(!donateAnonymously)}
                />
                <label htmlFor="donateAnonymously">Donate Anonymously</label>
              </div>

              <div
                style={{
                  margin: "10px",
                  display: "flex",
                  justifyContent: "center",
                }}
                className="donateButtonsContainer"
              >
                <button onClick={() => closeModal()}>Cancel</button>
                <button type="submit">Donate</button>
              </div>
            </form>
          </IonContent>confirmDonation
          <IonModal isOpen={confirmDonation}>
        <IonContent className="ion-padding" id="DonateConfirmationContainer">
          <IonCard className="confirmDonationMessage">
            {donationConfirmed ? (
              <p
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column-reverse",
                }}
              >
                <div>Thank you for you contribution !</div>
                <BsFillCheckCircleFill size="4em" color="white" />
              </p>
            ) : (
              <p style={{ textAlign: "center" }}>
                Your are about to make a donation of{" "}
                <b>
                  <em>R{donateAmount}</em>
                </b>{" "}
                <b>{donateAnonymously ? "Anonymously " : ""}</b>
                to the Christian Connect Dev Team. Please Confirm
              </p>
            )}
          </IonCard>
          {donationConfirmed ? (
            ""
          ) : (
            <div
              style={{
                margin: "10px",
                display: "flex",
                justifyContent: "center",
              }}
              className="donateButtonsContainer"
            >
              <button
                onClick={() => {
                  setConfirmDonation(false);
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setDonationConfirmed(true);
                  setTimeout(() => {
                    setConfirmDonation(false);
                    closeModal();
                    setDonateAmount("");
                  }, 1500);
                }}
              >
                Confirm
              </button>
            </div>
          )}
        </IonContent>
      </IonModal>
      
        </>
    )
}

export default Donate;