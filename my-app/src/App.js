
import './App.css';
import React , {useEffect, useState} from 'react';
import axios from 'axios';
import * as emailjs from 'emailjs-com';

function App() {

  let presentCentreDetails=null;
  let pastCentreDetails=null;
  useEffect(() => {
      timerCallingFunction();
  },[]);


  
  const extractData = (responseData) => {
    if(responseData){
      console.log('in useeffect of responseData dependency')
      const arrayData=responseData;
      var i;
        for(i=0;i<arrayData.length;i++){
          var individual_centre = arrayData[i];
          if(individual_centre.min_age_limit === 18 && individual_centre.vaccine === "COVISHIELD"){
            if(individual_centre.available_capacity_dose1 > 1 ){
              console.log('individual_centre',individual_centre);
              pastCentreDetails=presentCentreDetails;
              presentCentreDetails=individual_centre;
              console.log("inside if statemnt")
              // setTimeout(timerCallingFunction, 5000);
              if(presentCentreDetails.name!==pastCentreDetails.name)
              console.log('inside sendmail if')
              sendMail();
              
            }
          }
        }
    }
  }

   

 


  const sendMail = () => {
    console.log('in sendMail');
    // const email_message = renderMessageHtml(centre_details);

    if(presentCentreDetails.name!==pastCentreDetails.name)
    {
      let templateParams1 = {
            from_name: "saisoumith1818@gmail.com",
            to_name:"saisoumith1818@gmail.com",
            subject: "COVID VACCINATION",
            message: `Hi vaccination opened for centre with name${presentCentreDetails.name}`,
          }
          let templateParams2 = {
            from_name: "saisoumith1818@gmail.com",
            to_name:"sahithirao163@gmail.com",
            subject: "COVID VACCINATION",
            message: `Hi vaccination opened for centre with name  ${presentCentreDetails.name}`,
          }
          emailjs.send(
            'service_fzf7a84',
            'template_2x34oci',
            templateParams1,
            'user_tsNRFZzd0abE658TBfDyY',
            
          )
          emailjs.send(
            'service_fzf7a84',
            'template_2x34oci',
            templateParams2,
            'user_tsNRFZzd0abE658TBfDyY',
            
          )
    }
   
  }


  const timerCallingFunction = () => {
    // const apiUrl ="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=294&date=24-05-2021"
   const apiNizamabad="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=600&date=25-05-2021"
    axios
    .get(apiNizamabad)
    .then((response) => {
      // setResponseData(response.data.sessions);
      extractData(response.data.sessions);
    })
    .catch(() => {
      console.log(console);

    });
    console.log('calling api again')
    setTimeout(timerCallingFunction, 10000);
  }



  return (
    <div className="App">
{presentCentreDetails? presentCentreDetails:null}
    </div>
  );
}

export default App;

