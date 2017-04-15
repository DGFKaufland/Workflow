package kmunda;

import java.io.Serializable;
import java.sql.Timestamp;

public class WorkflowRecord implements Serializable {
	private static final long serialVersionUID = 1L;

	private int Sensor_ID;
	private String LogischeSensor_ID;
	private int Anzahl;
	private double Temperaturwert;
	private double Grenzwert;
	private Timestamp Timestamp;
	private Timestamp Oeffnungszeiten_von;
	private Timestamp Oeffnungszeiten_bis;
	private int Oeffnungszeiten_innerhalb;
	private String AbteilungsName;
	private int Snooze_Open;
	private int Snooze_Progress;
	private int Markt_ID;

	private String WBL_Andrede;
	private String WBL_Vorname;
	private String WBL_Nachname;
	private String WBL_Email;
	private int WBL_User_ID;
	private int WBL_Mobile_ID;
	private String WBL_MobileName;

	private String HL_Andrede;
	private String HL_Vorname;
	private String HL_Nachname;
	private String HL_Email;
	private int HL_User_ID;
	private int HL_Mobile_ID;
	private String HL_MobileName;

	public WorkflowRecord() {
	}

	public int getSensor_ID() {
		return Sensor_ID;
	}

	public void setSensor_ID(int aSensor_ID) {
		Sensor_ID = aSensor_ID;
	}

	public String getLogischeSensor_ID() {
		return LogischeSensor_ID;
	}

	public void setLogischeSensor_ID(String aLogischeSensor_ID) {
		LogischeSensor_ID = aLogischeSensor_ID;
	}

	public int getAnzahl() {
		return Anzahl;
	}

	public void setAnzahl(int aAnzahl) {
		Anzahl = aAnzahl;
	}

	public double getTemperaturwert() {
		return Temperaturwert;
	}

	public void setTemperaturwert(double aTemperaturwert) {
		Temperaturwert = aTemperaturwert;
	}

	public Timestamp getTimestamp() {
		return Timestamp;
	}

	public void setTimestamp(Timestamp aTimestamp) {
		Timestamp = aTimestamp;
	}

	public Timestamp getOeffnungszeiten_von() {
		return Oeffnungszeiten_von;
	}

	public void setOeffnungszeiten_von(Timestamp aOeffnungszeiten_von) {
		Oeffnungszeiten_von = aOeffnungszeiten_von;
	}

	public Timestamp getOeffnungszeiten_bis() {
		return Oeffnungszeiten_bis;
	}

	public void setOeffnungszeiten_bis(Timestamp aOeffnungszeiten_bis) {
		Oeffnungszeiten_bis = aOeffnungszeiten_bis;
	}

	public int getOeffnungszeiten_innerhalb() {
		return Oeffnungszeiten_innerhalb;
	}

	public void setOeffnungszeiten_innerhalb(int aOeffnungszeiten_innerhalb) {
		Oeffnungszeiten_innerhalb = aOeffnungszeiten_innerhalb;
	}

	public String getAbteilungsName() {
		return AbteilungsName;
	}

	public void setAbteilungsName(String aAbteilungsName) {
		AbteilungsName = aAbteilungsName;
	}

	public double Grenzwert() {
		return Grenzwert;
	}

	public void setGrenzwert(double aGrenzwert) {
		Grenzwert = aGrenzwert;
	}

	public int getSnooze_Open() {
		return Snooze_Open;
	}

	public void setSnooze_Open(int aSnooze_Open) {
		Snooze_Open = aSnooze_Open;
	}

	public int getSnooze_Progress() {
		return Snooze_Progress;
	}

	public void setSnooze_Progress(int aSnooze_Progress) {
		Snooze_Progress = aSnooze_Progress;
	}

	public int getMarkt_ID() {
		return Markt_ID;
	}

	public void setMarkt_ID(int aMarkt_ID) {
		Markt_ID = aMarkt_ID;
	}

	
	// Warenbereichsleiter

	public String getWBL_Andrede() {
		return WBL_Andrede;
	}

	public void setWBL_Andrede(String aWBL_Andrede) {
		WBL_Andrede = aWBL_Andrede;
	}

	public String getWBL_Vorname() {
		return WBL_Vorname;
	}

	public void setWBL_Vorname(String aWBL_Vorname) {
		WBL_Vorname = aWBL_Vorname;
	}

	public String getWBL_Nachname() {
		return WBL_Nachname;
	}

	public void setWBL_Nachname(String aWBL_Nachname) {
		WBL_Nachname = aWBL_Nachname;
	}

	public String getWBL_Email() {
		return WBL_Email;
	}

	public void setWBL_Email(String aWBL_Email) {
		WBL_Nachname = aWBL_Email;
	}

	public int getWBL_User_ID() {
		return WBL_User_ID;
	}

	public void setWBL_User_ID(int aWBL_User_ID) {
		WBL_User_ID = aWBL_User_ID;
	}

	public int getWBL_Mobile_ID() {
		return WBL_Mobile_ID;
	}

	public void setWBL_Mobile_ID(int aWBL_Mobile_ID) {
		WBL_Mobile_ID = aWBL_Mobile_ID;
	}

	public String getWBL_MobileName() {
		return WBL_MobileName;
	}

	public void setWBL_MobileName(String aWBL_MobileName) {
		WBL_MobileName = aWBL_MobileName;
	}

	// Hausleiter

	public String getHL_Andrede() {
		return HL_Andrede;
	}

	public void setHL_Andrede(String aHL_Andrede) {
		HL_Andrede = aHL_Andrede;
	}

	public String getHL_Vorname() {
		return HL_Vorname;
	}

	public void setHL_Vorname(String aHL_Vorname) {
		HL_Vorname = aHL_Vorname;
	}

	public String getHL_Nachname() {
		return HL_Nachname;
	}

	public void setHL_Nachname(String aHL_Nachname) {
		HL_Nachname = aHL_Nachname;
	}

	public String getHL_Email() {
		return HL_Email;
	}

	public void setHL_Email(String aHL_Email) {
		HL_Nachname = aHL_Email;
	}

	public int getHL_User_ID() {
		return HL_User_ID;
	}

	public void setHL_User_ID(int aHL_User_ID) {
		HL_User_ID = aHL_User_ID;
	}

	public int getHL_Mobile_ID() {
		return HL_Mobile_ID;
	}

	public void setHL_Mobile_ID(int aHL_Mobile_ID) {
		HL_Mobile_ID = aHL_Mobile_ID;
	}

	public String getHL_MobileName() {
		return HL_MobileName;
	}

	public void setHL_MobileName(String aHL_MobileName) {
		HL_MobileName = aHL_MobileName;
	}
}
