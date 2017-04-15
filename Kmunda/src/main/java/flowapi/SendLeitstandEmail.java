package flowapi;

import org.camunda.bpm.engine.delegate.*;


import kmunda.WorkflowRecord;

// Mail imports
import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;



//import java.net.Proxy;
//import java.net.InetSocketAddress;

public class SendLeitstandEmail implements JavaDelegate {

	WorkflowRecord data;
	long notification_ID;

	String messageText;
	String messageSubject;
	
	public static String sMobileMsg = "WARNUNG, Temperatur zu hoch! Werte(r) ";
	
	public void execute(DelegateExecution execution) throws Exception {
		data = (WorkflowRecord) execution.getVariable("flowData");

		// String timeStamp = new SimpleDateFormat("EEE, MMM d, HH:mm").format(new Date());
		messageText = "Um den Fehler zu beheben oder den Schlummermodus zu aktivieren klicken Sie bitte auf den nachfolgenden Link \n\n"
					+ "http://dgf-leitstand.azurewebsites.net/WebContent/?process_id=" 
				    + execution.getVariable("Notification_ID")
				    + "&store="
				    + data.getMarkt_ID()
				    + "&departure="
				    + data.getAbteilungsName()
				    + "&sensor="
				    + data.getLogischeSensor_ID()
				    + " \n"
					+ "um weitere Dinge bearbeiten zu können.";
		
		messageSubject = "Im Markt " 
					+ data.getMarkt_ID() 
					+ " in der Abteilung" 
					+ data.getAbteilungsName()
					+ " hat der Sensor "
					+ data.getLogischeSensor_ID()
				    + " \n"
					+ " kritische Werte gemeldet!";
		
		System.out.println("Sending Email: \"" + messageText + "\"");
		sendMail();
		execution.setVariable("Notification_ID", notification_ID);
	}

	public void sendMail()
    {
		final String username = "kaufland.sensoren@gmail.com";
		final String password = "Kaufland2016";

		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.port", "587");

		Session session = Session.getInstance(props,
		  new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		  });

		try {
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress("kaufland.leitstand@gmail.com"));// kaufland.sensoren@gmail.com"));
			message.setRecipients(Message.RecipientType.TO, InternetAddress.parse("jonas_fritzsch@gmx.de"));

			//Damit Tasks vom Leitstand abgeschlossen werden können oder ein Schlummermodus gesetzt werden kann, muss 
			//zwingend eine URL der Mail beigefügt werden mit der Referenz zum spezifischen Task
			//Die URL sollte wie folgt aufgebaut werden, wobei die Rauten (#) dynamisch durch Werte ersetzt werden sollten
			//http://localhost:8080/Leitstand/?process_id=###&store=###&departure=###&sensor=###
			// process_id muss zwingend die aktuell gültige ID aus der Tabelle MobileNotification sein, für den die Nachricht erstellt wurde
			//store, departure, sensor haben reinen Anzeigecharackter und sollten sich wie folgt zusammensetzen:
			//store sollte Tabelle Markt die Marktnummer sein
			//departure sollte Tabelle Abteilungstyp die Bezeichnung sein
			//sensor sollte Tabelle Sensoren die Logische_ID sein
			
			message.setText(messageText);
			message.setSubject(messageSubject);
			Transport.send(message);

			System.out.println("Email erfolgreich gesendet.");

		} catch (MessagingException e) {
			throw new RuntimeException(e);
		}
    }
}
