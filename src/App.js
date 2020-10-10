import React, { useState } from 'react';
import { parse } from 'papaparse';


function App() {

  const [ addresses , setAddresses ] = useState([]);

  return (
    <div style={{ 
        display:"flex", 
        flexDirection:"column", 
        alignItems:"center",
        justifyContent:"center", 
        height:"100vh" }}>
      <h1>CSV PARSER</h1>
      <div style={{
          border:"solid 2px", 
          height:"150px", 
          width:"250px", 
          display:"flex", 
          justifyContent:"center",
          alignItems:"center"
          }}
          
          //to handle a dropzone we need to control these two events
          //to prevent the browsers default behaviour 
          onDragOver = {(e) => {
            //console.log("dragged")
            e.preventDefault();
          }}

          onDrop = { (e) => {
            e.preventDefault();
            //console.log("dropped");
            //console.log(e.dataTransfer.files)
           
            //if we want to filter the type of file we can use
            /*
              .filter(file => file.type === 'text/csv');
            */
            Array.from(e.dataTransfer.files).forEach(async (file) => {
              
              //text() returns a promise
              const text = await file.text();
              
              //using papaparse method parse with header set to true because we have a header on our csv
              //and we don´t want to parse it
              const result = parse(text, { header: true });
              //console.log(result);
              
              setAddresses(existingData => [...existingData, ...result.data] );
            });
            
          }}
         >
        <h2>Drop Zone</h2>
      </div>
      
      <div>
        <ul>
          {addresses && addresses.map((address,index) => (
            <li key={index}>
              {address.FirstName} {address.LastName} lives in {address.city} in {address.state}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
