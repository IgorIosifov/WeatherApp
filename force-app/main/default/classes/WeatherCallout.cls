public class WeatherCallout {
    
    static final Decimal HPA_TO_MMHG = 0.750062;
    public static void requestCurrentWeather(String city) {
        
        HttpRequest request = new HttpRequest();
		String endpoint = 'https://api.openweathermap.org/data/2.5/weather?';
        String appID = 'be44a17b8f33f7adf056ca9ad4501437';
        request.setEndpoint(endpoint + 'q=' + city + '&appid=' + appID + '&units=metric');
        request.setMethod('GET');
        
        Http http = new Http();
        HttpResponse response = http.send(request);

        if (response.getStatusCode() == 200) {
           Map<String,Object> results = (Map<String,Object>)JSON.deserializeUntyped(response.getBody());
           Map<String,Object> main = (Map<String,Object>)results.get('main');
           Integer currentTemp = Integer.valueof(main.get('temp'));
           Integer feelsTemp = Integer.valueof(main.get('feels_like'));
           Integer humidity = Integer.valueof(main.get('humidity'));
           Integer pressure = Integer.valueof((Integer)main.get('pressure')*HPA_TO_MMHG);
           System.debug(currentTemp);
           System.debug(feelsTemp);
           System.debug(humidity);
           System.debug(pressure);

        } else {
            System.debug(response.getStatusCode());
        }
    }
}