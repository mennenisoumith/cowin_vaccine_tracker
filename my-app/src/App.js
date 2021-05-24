
import './App.css';
import React , {useEffect, useState} from 'react';
import axios from 'axios';


function App() {
  const [responseData, setResponseData] = useState(null);
  // let arrayData;
  useEffect(() => {
      timerCallingFunction();
  },[]);

  // useEffect(() => {
  //   if(responseData){
  //     const arrayData=responseData;
  //     var i;
  //     for(i=0;i<arrayData.length;i++){
  //       console.log('arrayData',arrayData[i]);
  //     }
  //   }
   

  // },[responseData]);

  const timerCallingFunction = () => {
    const apiUrl ="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=294&date=24-05-2021"
    axios
    .get(apiUrl)
    .then((response) => {
      setResponseData(response.data.sessions);
      if(responseData){
        const arrayData=responseData;
        var i;
        for(i=0;i<arrayData.length;i++){
          console.log('arrayData',arrayData[i]);
        }
      }
      // console.log(response.data.sessions)
      // setLoading(false);
    })
    .catch(() => {
      // console.log(console);
      // setLoading(false);
      // setErrorPage(true);
    });
    // setTimeout(timerCallingFunction, 10000000000000000000000000000);
  }



  return (
    <div className="App">
     {

     }
    </div>
  );
}

export default App;

