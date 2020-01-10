public class WeatherCallout {
    static final Integer KELV_TO_CELS = 273;
    static final Decimal KPA_TO_MMHG = 7.50062;
    public static void requestCurrentWeather(String city) {
        
        HttpRequest request = new HttpRequest();
		String endpoint = 'https://api.openweathermap.org/data/2.5/weather?';
        String appID = 'be44a17b8f33f7adf056ca9ad4501437';
        request.setEndpoint(endpoint + 'q=' + city + '&appid=' + appID);
        request.setMethod('GET');
        
        Http http = new Http();
        HttpResponse response = http.send(request);

        if (response.getStatusCode() == 200) {
           Map<String,Object> results = (Map<String,Object>)JSON.deserializeUntyped(response.getBody());
           Map<String,Object> main = (Map<String,Object>)results.get('main');
           Integer currentTemp = Integer.valueof(main.get('temp'))-KELV_TO_CELS;
           Integer feelsTemp = Integer.valueof(main.get('feels_like'))-KELV_TO_CELS;
           Integer pressure = Integer.valueof(main.get('pressure')*KPA_TO_MMHG);
           System.debug(currentTemp);
           System.debug(feelsTemp);
           System.debug(pressure);

        } else {
            System.debug(response.getStatusCode());
        }
    }
}