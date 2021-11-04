import { IonHeader, IonTitle, IonToolbar, IonCard } from '@ionic/react';
import React, { useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io'
import './Donations.css';

const Donations: React.FC = () => {

  // Donation History
  const [history, setHistory] = useState([
    { month: 'April', date: '21 April 2021', payment: 'Debit', amount: 'R 300', id:1 },
    { month: 'May',  date: '21 May 2021', payment: 'Credit', amount: 'R 550', id:2 },
    { month: 'June',  date: '21 June 2021', payment: 'Debit', amount: 'R 600', id:3 },
    { month: 'July',  date: '21 July 2021', payment: 'Credit', amount: 'R 150', id:4 },
    { month: 'August',  date: '21 August 2021', payment: 'Debit', amount: 'R 300', id:6 },
    { month: 'September',  date: '21 September 2021', payment: 'Credit', amount: 'R 550', id:7 },

  ])

  



  return (

    <div id='main-container' style={{overflowY:'scroll'}}>

      {/* header */}
      <IonHeader id='header'>

        <IoMdArrowBack id='backIcon' />

        <IonToolbar>
          
          <IonTitle id='title'>Donation history</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div id='content'>
          {
            history.map((donation) => {
              return (
                <>
                  <h2 className='monthHeading' >{donation.month}</h2>
                  <IonCard id='posts' >

                    {/* date */}
                    <h3 id='date'>{donation.date}</h3>

                    <div id='right'>
                      {/* payment type */}
                      <p className='paymentType'>{donation.payment}</p>

                      {/* amount */}
                      <h4 className='amount'>
                        {donation.amount}
                      </h4>

                    </div>

                  </IonCard>

                </>
              )
            })
          }
        </div>


      
      
    </div>
  );
};

export default Donations;
