package kmunda;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class Main {
	String message0 = "";
	DataAnalyzer T1;
	int counter = 0;

	public Main() {
	}

	@RequestMapping("/bpm")
	public ModelAndView init() {
		System.out.println("UI: Got /bpm, Request #" + ++counter);
		if (Status.bpmRunning) {
			message0 = "BPM-Workflow für Samsung Tizen aktiv... <br> ";
		} else
			message0 = "BPM-Workflow für Samsung Tizen inaktiv<br>";

		ModelAndView mav = new ModelAndView();
		mav.setViewName("index");
		mav.addObject("message", message0);
		return mav;
	}

	@RequestMapping("/run")
	public ModelAndView swicth() {
		System.out.println("UI: Got /run, Request #" + ++counter);
		if (Status.bpmRunning) {
			message0 = "BPM-Workflow für Samsung Tizen aktiv ... <br> ";
		} else {
			Status.bpmRunning = true;
			T1 = new DataAnalyzer("DataAnalyzer");
			T1.start();
		}
			
		ModelAndView mav = new ModelAndView();
		mav.setViewName("index");
		String message1 = "Workflow Engine für Samsung Tizen wurde gestartet...";
		mav.addObject("message", message1);

		return mav;
	}

	@RequestMapping("/reset")
	public ModelAndView startCollection() {
		System.out.println("UI: Got /reset, Request #" + ++counter);
		message0 = "Workflow Engine für Samsung Tizen wurde gestoppt...";

		Status.bpmRunning = false;

		return new ModelAndView("index", "message", message0);
	}
}