package flowapi;

import org.camunda.bpm.engine.delegate.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import kmunda.WorkflowRecord;

//import java.net.Proxy;
//import java.net.InetSocketAddress;

abstract public class SendBackendNotify implements JavaDelegate {

	WorkflowRecord data;
	long notification_ID;

	abstract public void execute(DelegateExecution execution) throws Exception;
	
	@SuppressWarnings("unchecked")
	public void sendMessage(int receiver, String messageText) {
		try {
			URL url = new URL("http://dgf-mbe.azurewebsites.net/api/v1/notifications");
			// Proxy proxy = new Proxy(Proxy.Type.HTTP, new
			// InetSocketAddress("web-proxy", 8088));
			// HttpURLConnection conn = (HttpURLConnection)
			// url.openConnection(proxy);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");

			JSONObject notification = new JSONObject();
			notification.put("toContactId", new Integer(receiver));
			notification.put("fromContactName", "Kmunda");
			notification.put("fromContactId", 1);
			notification.put("body", messageText);
			notification.put("state", "OPEN");
			String input = notification.toString();

			OutputStream os = conn.getOutputStream();
			os.write(input.getBytes());
			os.flush();

			System.out.println("Flow SendBackendNotify: Sending Message to Backend...");
			if (conn.getResponseCode() != HttpURLConnection.HTTP_CREATED) {
				System.out.println("Flow SendBackendNotify: ERROR! HTTP error code " + conn.getResponseCode());
				// throw new RuntimeException("Failed : HTTP error code : "
				// + conn.getResponseCode());
			}

			
			String output;
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));
			String validoutput = "";
			while ((output = br.readLine()) != null) {
				System.out.println(output);
				validoutput = output;
			}
			
			JSONParser parser = new JSONParser();
			try {
				JSONObject response = (JSONObject) parser.parse(validoutput);
				notification_ID = (long) response.get("id");
				System.out.println("Got ID for Notification: " + notification_ID);
			} catch (ParseException e) {
				System.out.println("Flow SendBackendNotify: ERROR parsing JSON Response!");
				e.printStackTrace();
			}
			
			conn.disconnect();

		} catch (MalformedURLException e) {
			e.printStackTrace();

		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
