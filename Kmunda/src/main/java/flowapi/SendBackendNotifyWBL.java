package flowapi;

import kmunda.WorkflowRecord;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

import org.camunda.bpm.engine.delegate.DelegateExecution;

public class SendBackendNotifyWBL extends SendBackendNotify {

	String messageText;
	public static String sMobileMsg = "WARNUNG, Temperatur zu hoch in Abteilung ";

	public void execute(DelegateExecution execution) throws Exception {
		data = (WorkflowRecord) execution.getVariable("flowData");

	    SimpleDateFormat sdf = new SimpleDateFormat("EEE, MMM d, HH:mm");   
	    TimeZone tz = TimeZone.getTimeZone("Europe/Berlin");
	    sdf.setTimeZone(tz);
	    String formattedNowInTimeZone = sdf.format(new Date()); 
	    // will return a string rep of a date with the included format, better than:
	    // String timeStamp = new SimpleDateFormat("EEE, MMM d, HH:mm").format();
	    
		messageText = "[" + formattedNowInTimeZone + "] " + sMobileMsg +
				      data.getAbteilungsName() + ": " + data.getTemperaturwert() + " Grad.";
		System.out.println("Flow SendBackendNotify: \"" + messageText + "\"");
		sendMessage(data.getWBL_Mobile_ID(), messageText);
		execution.setVariable("Notification_ID", notification_ID);
	}
}