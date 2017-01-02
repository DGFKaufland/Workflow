package kmunda;

import org.camunda.bpm.engine.RuntimeService;

import java.util.HashMap;
import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.ProcessEngineConfiguration;
import org.camunda.bpm.engine.RepositoryService;
import org.camunda.bpm.engine.runtime.ProcessInstance;

public class FlowStarter extends Thread {

	private String threadName;
	RepositoryService repositoryService = null;
	RuntimeService runtimeService = null;
	ProcessInstance processInstance = null;
	ProcessEngine processEngine = null;
	WorkflowRecord flowData;

	public FlowStarter(String name, WorkflowRecord aFlowRec) {
		threadName = name;
		flowData = aFlowRec;
	}

	public void run() {
		try {
			System.out.println("Camunda Thread: " + threadName + " starting...");

			// Create process engine
			processEngine = ProcessEngineConfiguration.createStandaloneInMemProcessEngineConfiguration()
					.setDatabaseSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE)
					.setJobExecutorActivate(true).setJdbcUrl("jdbc:h2:mem:" + threadName + ";DB_CLOSE_ON_EXIT=TRUE")
					.buildProcessEngine();

			// Get services
			repositoryService = processEngine.getRepositoryService();
			runtimeService = processEngine.getRuntimeService();

			// Deploy the process definition
			repositoryService.createDeployment().addClasspathResource("kmunda-workflow.bpmn").deploy();

			// Start a process instance and pass flowData
			HashMap<String, Object> variables = new HashMap<String, Object>();
			variables.put("flowData", flowData);
			variables.put("Oeffnungszeiten_innerhalb", flowData.getOeffnungszeiten_innerhalb());
			variables.put("Temp_ueber_Limit", true);
			variables.put("Notification_ID", -1);
			variables.put("Notification_Status", -1);
			processInstance = runtimeService.startProcessInstanceByKey("kmunda-workflow", variables);
			String pid = processInstance.getId();
			do {
				Thread.sleep(1000);
				processInstance = runtimeService.createProcessInstanceQuery().processInstanceId(pid).singleResult();
			} while (processInstance != null && !processInstance.isEnded());
			System.out.println("Camunda Thread: " + threadName + " finished.");

			processEngine.close();
			Thread.sleep(1);
		} catch (InterruptedException e) {
			System.out.println("Camunda Thread " + threadName + " interrupted.");
		}

		if (processEngine != null) {

			// runtimeService.deleteProcessInstance(processInstance.getId() ,
			// null);
			processEngine.close();
		}
		System.out.println("Camunda Thread: " + threadName + " exiting.");
	}
}
