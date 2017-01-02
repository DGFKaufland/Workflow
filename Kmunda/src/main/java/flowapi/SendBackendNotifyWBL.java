package flowapi;

import kmunda.WorkflowRecord;

import java.text.SimpleDateFormat;
import java.util.Date;
import org.camunda.bpm.engine.delegate.DelegateExecution;

public class SendBackendNotifyWBL extends SendBackendNotify {

	String messageText;
	public static String sMobileMsg = "WARNUNG, Temperatur zu hoch! Werte(r) ";

	public void execute(DelegateExecution execution) throws Exception {
		data = (WorkflowRecord) execution.getVariable("flowData");

		String timeStamp = new SimpleDateFormat("EEE, MMM d, HH:mm").format(new Date());
		messageText = "[" + timeStamp + "] " + sMobileMsg + data.getHL_MobileName() + " aus Abteilung "
				+ data.getAbteilungsName() + ", " + data.getTemperaturwert() + " Grad.";
		System.out.println("Flow SendBackendNotify: \"" + messageText + "\"");
		sendMessage(data.getWBL_Mobile_ID(), messageText);
		execution.setVariable("Notification_ID", notification_ID);
	}
}