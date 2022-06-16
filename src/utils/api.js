const api = {
    key: '418f34ce5405a6d6387d94a71587cc38',
    baseUrl: 'http://api.openweathermap.org/data/2.5/',
  };

  const getWeatherData = (input,setInput,setLoading,setData) => {
    setLoading(true);
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${input}&units=metric&APPID=${api.key}`, {
            method: 'GET'
            })
     .then((response) => response.json())
      .then(res => {
        console.log(res);

        //Checking to see if result was a success 
         if(res.cod != 200){
            alert(res.message)
            return
         }
          //Filtering out days since we only need 1 weather report per day
          let forecast = res.list.filter(item => item.dt_txt.includes("00:00:00"))
        console.log(forecast);
        setData(forecast);
      })
      .catch(err => {
          alert(err.toString())
        console.dir(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  export default getWeatherData;