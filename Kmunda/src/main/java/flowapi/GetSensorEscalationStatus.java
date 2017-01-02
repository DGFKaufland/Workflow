package flowapi;

import org.camunda.bpm.engine.delegate.*;

import kmunda.WorkflowRecord;
import kmunda.Status;

public class GetSensorEscalationStatus implements JavaDelegate {

	public void execute(DelegateExecution exe) throws Exception {

		WorkflowRecord data = (WorkflowRecord) exe.getVariable("flowData");
		System.out.println("Pruefe Temperaturueberschreitung fuer Sensor: " + data.getLogischeSensor_ID());
		boolean Temp_ueber_Limit = Status.dbs_sensordata.getSensorStatus(data.getLogischeSensor_ID());
		exe.setVariable("Temp_ueber_Limit", Temp_ueber_Limit);
		System.out.println("Temperatur ueber Limit: " + Temp_ueber_Limit);
	}
}
