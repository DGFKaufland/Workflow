package flowapi;

import org.camunda.bpm.engine.delegate.*;

import kmunda.Status;

public class GetNotificationStatus implements JavaDelegate {

	public void execute(DelegateExecution exe) throws Exception {
		long x = (long) exe.getVariable("Notification_ID");
		System.out.println("Pruefe Notification Status fuer ID: " + x);
		int result = Status.dbs_sensordata.getNotificationStatus(x);
		exe.setVariable("Notification_Status", result);
		System.out.println("Notification Status fuer ID " + x + " ist " + result);
	}
}
