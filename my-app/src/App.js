
import './App.css';
import React , {useEffect, useState} from 'react';
import axios from 'axios';
import * as emailjs from 'emailjs-com';
import CustomTable from './CustomTable';

function App() {
  const [dataStorage, setDataStorage] = useState([]);
  // const [session_id_storage, setsession_id_storage] = useState([]);
  // let data_storage = [];
  let session_id_storage = [];
  useEffect(() => {
    console.log("in useeffect");
     // eslint-disable-next-line no-unused-expressions
  timerCallingFunction();
    
  },[]);


  const extractMedchalData = (responseData) => {
    if(responseData){
      // console.log('in useeffect of responseData dependency')
      const arrayData=responseData.centers;
      var i;
        for(i=0;i<arrayData.length;i++){
          var individual_centre = arrayData[i];
          var j;
          for(j=0;j<individual_centre.sessions.length;j++){
            var pre_session =individual_centre.sessions[j];
            // console.log("pre_session",pre_session)
            if(pre_session.min_age_limit === 45 && pre_session.vaccine === "COVISHIELD"){
              if(pre_session.available_capacity_dose2 >0 && !session_id_storage.includes(pre_session.session_id) ){
                console.log('individual centre obj struc',individual_centre);
                // eslint-disable-next-line no-loop-func
                setDataStorage(dataStorage =>{
                  return [...dataStorage,{
                    centre_details:individual_centre,
                    session_array_index:j,
                  }]
                });
                session_id_storage.push(pre_session.session_id);
                 sendMail(individual_centre);
                 alert(`found centre ${individual_centre.name}`)
              }
            }
          }
          
        }

    }
  }

  const sendMail = (individual_centre) => {
    console.log('in sendMail');
      let templateParams1 = {
            from_name: "saisoumith1818@gmail.com",
            to_name:"saisoumith1818@gmail.com",
            subject: "COVID VACCINATION",
            message: `Hi vaccination opened for centre with name ${individual_centre.name}`,
          }
          // let templateParams2 = {
          //   from_name: "saisoumith1818@gmail.com",
          //   to_name:"sahithirao163@gmail.com",
          //   subject: "COVID VACCINATION",
          //   message: `Hi vaccination opened for centre with name  ${presentCentreDetails.name}`,
          // }
          let templateParams3 = {
            from_name: "saisoumith1818@gmail.com",
            to_name:"bbhavana16@gmail.com",
            subject: "COVID VACCINATION",
            message: `Hi vaccination opened for centre with name  ${individual_centre.name}`,
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
            templateParams3,
            'user_tsNRFZzd0abE658TBfDyY',
            
          )
  }


  const timerCallingFunction =  () => {
    // const apiUrl ="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=294&date=24-05-2021"
    // const apiNizamabad="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=600&date=26-05-2021";
    // const apiMedchal ="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=596&date=26-05-2021";
    const apiHyderabad = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=581&date=27-05-2021"
    axios
    .get(apiHyderabad)
    .then((response) => {
      // setResponseData(response.data.sessions);
      // extractData(response.data.sessions);
      console.log("in then")
      console.log("response.data",response.data);
      extractMedchalData(response.data);
    })
    .catch(() => {
      console.log(console);

    });
    console.log('calling api again')
   setTimeout(timerCallingFunction, 10000);
  }

  return (
    <div className="App">
      <div className="heading">Soumith's Vaccination Alert Pushing Dashboard</div>
       <CustomTable  data_storage={dataStorage} />
    </div>
  );
}

export default App;

