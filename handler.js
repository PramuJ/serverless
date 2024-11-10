'use strict';
const axios = require('axios')

module.exports.showWeather = async (event) => {

  const city = event.queryStringParameters?.city;

  if(!city){
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          message: 'City name is required as a query parameter',
          input: event,
        },
        
      ),
    };
  }

  const apikey = "5990d538da1161f9d0216d66bb2db0af";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

  

  

  try {

    const response = await axios.get(url)
    const weather = response.data

  return{
    statusCode: 200,
    body: JSON.stringify(
      {
        city: weather.name,
        tempurature: weather.main.temp,

      },
      
    ),

  }
    
  } catch (error) {

    return{
      statusCode: 500,
      body: JSON.stringify({
        message: 'failed to fetch weather data',
        error: error.message
      })
    }
    
  }




  

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
