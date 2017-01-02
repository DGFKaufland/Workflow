package flowapi;

import org.camunda.bpm.engine.delegate.*;

//  kmunda.WorkflowRecord;

public class Flow implements JavaDelegate {

	public void execute(DelegateExecution exe) throws Exception {

		System.out.println("\nInside calculator again...\n");
		
//	    Integer x = (Integer) exe.getVariable("a");
//	    WorkflowRecord data = (WorkflowRecord) exe.getVariable("flowData");
//
//	    
//	    System.out.println("x is" + x);
//	    System.out.println("Sensor_ID is " + data.getTemperaturwert());
	    
	    //exe.setVariable("add", add);
	    // https://forum.camunda.org/t/retrieving-process-variables/1077
	    // https://community.alfresco.com/thread/220084-write-and-read-a-variable-from-an-object
		
		//Thread.sleep(5000);
	}
}
