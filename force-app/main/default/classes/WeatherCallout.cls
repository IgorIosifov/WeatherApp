public class WeatherCallout {
    
    static final Decimal HPA_TO_MMHG = 0.750062;
    public static void requestCurrentWeather(String city) {
        
        HttpRequest request = new HttpRequest();
		String endpoint = 'https://api.openweathermap.org/data/2.5/forecast?';
        String appID = 'be44a17b8f33f7adf056ca9ad4501437';
        request.setEndpoint(endpoint + 'q=' + city + '&appid=' + appID + '&units=metric');
        request.setMethod('GET');
        
        Http http = new Http();
        HttpResponse response = http.send(request);

        if (response.getStatusCode() == 200) {
           Map<String,Object> results = (Map<String,Object>)JSON.deserializeUntyped(response.getBody()); 
           List<Object> forecasts = (List<Object>)results.get('list'); // lists of all forecasts
           
           for (Integer i=0; i<forecasts.size();i++){
           Map<String,Object> forecast = (Map<String,Object>)(forecasts.get(i));

           List<Object> weathers = (List<Object>)forecast.get('weather');   // weathers array from one forecast
           Map<String,Object> weather = (Map<String,Object>)(weathers.get(0));
           String weatherDescription = String.valueof(weather.get('description'));

           Map<String,Object> main = (Map<String,Object>)forecast.get('main');
           Integer tempAtTime = Integer.valueof(main.get('temp'));
           Integer feelsTemp = Integer.valueof(main.get('feels_like'));
           Integer humidity = Integer.valueof(main.get('humidity'));
           Integer pressure = Integer.valueof((Integer)main.get('pressure')*HPA_TO_MMHG);
           
           Map<String,Object> wind = (Map<String,Object>)forecast.get('wind');
           Integer windSpeed = Integer.valueof(wind.get('speed'));
           
           String forecastTime = (String)forecast.get('dt_txt');
           System.debug('Temperature at time '  + forecastTime +' ' + 'will be: ' + tempAtTime + ' C');
        }
    
        } else {
            System.debug(response.getStatusCode());
        }
    }
}