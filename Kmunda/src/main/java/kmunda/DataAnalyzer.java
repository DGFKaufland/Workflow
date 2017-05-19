package kmunda;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.ProcessEngineConfiguration;
import org.camunda.bpm.engine.RepositoryService;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.runtime.ProcessInstance;

import kmunda.DBStatements;

public class DataAnalyzer implements Runnable {

	private Thread t;
	private String threadName;
	private ArrayList<WorkflowRecord> workflowRecordList;
	private HashMap<String, String> Flows;

	RepositoryService repositoryService = null;
	RuntimeService runtimeService = null;
	ProcessInstance processInstance = null;
	ProcessEngine processEngine = null;
	WorkflowRecord flowData;

	public DataAnalyzer(String name) {
		threadName = name;
		Flows = new HashMap<String, String>();
		System.out.println("Starting Samsung Data Analyzer... ");
	}

	public void start() {
		if (t == null) {
			t = new Thread(this, threadName);
			t.start();
		}
	}

	public void run() {

		System.out.println("Starting up embedded Camunda Engine... ");
		// Create process engine
		processEngine = ProcessEngineConfiguration.createStandaloneInMemProcessEngineConfiguration()
				.setDatabaseSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE).setJobExecutorActivate(true)
				.setJdbcUrl("jdbc:h2:mem:" + "Kmunda" + ";DB_CLOSE_ON_EXIT=TRUE").buildProcessEngine();

		// Get services
		repositoryService = processEngine.getRepositoryService();
		runtimeService = processEngine.getRuntimeService();

		// Deploy the process definition
		repositoryService.createDeployment().addClasspathResource("kmunda-workflow.bpmn").deploy();

		try {
			Status.dbs_sensordata = new DBStatements();
			while (Status.bpmRunning) {
				workflowRecordList = new ArrayList<WorkflowRecord>();
				workflowRecordList = Status.dbs_sensordata.getUnprocessedData();

				for (WorkflowRecord currRec : workflowRecordList) {
					if (Flows.containsKey(currRec.getLogischeSensor_ID())) {
						System.out.println("Escalation Flow still running: \"" + currRec.getLogischeSensor_ID() + "\"");
					} else {

						// Start a WorkFlow instance
						HashMap<String, Object> variables = new HashMap<String, Object>();
						variables.put("flowData", currRec);
						variables.put("Oeffnungszeiten_innerhalb", currRec.getOeffnungszeiten_innerhalb());
						variables.put("Temp_ueber_Limit", true);
						variables.put("Notification_ID", -1);
						variables.put("Notification_Status", -1);
						processInstance = runtimeService.startProcessInstanceByKey("kmunda-workflow", variables);

						// Save the process ID
						Flows.put(currRec.getLogischeSensor_ID(), processInstance.getId());
						Status.dbs_sensordata.LogEscalation(currRec.getLogischeSensor_ID());
						System.out.println("Escalation Flow started: \"" + currRec.getLogischeSensor_ID() + "\" PID: "
								+ Flows.get(currRec.getLogischeSensor_ID()));
					}
				}

				// remove finished Escalation Flows
				// avoid java.util.ConcurrentModificationException
				List<String> toRemove = new ArrayList<String>();
				for (HashMap.Entry<String, String> entry : Flows.entrySet()) {
					String LogSensor_ID = entry.getKey();
					String aPid = entry.getValue();
					ProcessInstance aProcessInstance;
					aProcessInstance = runtimeService.createProcessInstanceQuery().processInstanceId(aPid)
							.singleResult();
					if (aProcessInstance == null || aProcessInstance.isEnded()) {
						toRemove.add(LogSensor_ID);
						System.out.println("Escalation Flow finished: \"" + LogSensor_ID + "\" PID: " + aPid);
					}
				}
				if (toRemove != null)
					for (String s : toRemove)
						Flows.remove(s);

				Thread.sleep(10000);
			}
		} catch (InterruptedException e) {
			System.out.println("Data Analyzer interrupted. Exiting.");
		}
		processEngine.close();
		System.out.println("Data Analyzer exiting.");
	}
}
