public class WeatherCallout {
    public static void makeGetCallout() {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
		String endpoint = 'https://api.openweathermap.org/data/2.5/weather?';
		String city = 'London';
        request.setEndpoint(endpoint + 'q='+city+'&appid=be44a17b8f33f7adf056ca9ad4501437');
        request.setMethod('GET');
   
        HttpResponse response = http.send(request);

        if (response.getStatusCode() == 200) {
            Map<String,Object> results = (Map<String,Object>)JSON.deserializeUntyped(response.getBody());
            System.debug(results);
        } else {
            System.debug(response.getStatusCode());
        }
    }
}