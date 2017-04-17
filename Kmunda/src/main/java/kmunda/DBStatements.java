package kmunda;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.apache.log4j.Logger;

public class DBStatements extends DBConnection {
	private static Logger log = Logger.getLogger(DBStatements.class.getName());

	public DBStatements() {
		createConnectionFactory(null);
	}

	public DBStatements(final String config) {
		createConnectionFactory(config);
	}

	public final ArrayList<WorkflowRecord> getUnprocessedData() {
		ArrayList<WorkflowRecord> criticalTempData = new ArrayList<WorkflowRecord>();

		Connection con = null;
		ResultSet rs = null;
		String query = "{CALL WorkflowData()}";
		CallableStatement stmt = null;
		try {
			con = getCf().createConnection();
			stmt = con.prepareCall(query);
			rs = stmt.executeQuery();

			int rowcount = 0;
			if (rs.last()) {
				rowcount = rs.getRow();
				rs.beforeFirst();
			}
			System.out.println("Got " + rowcount + " rows.");

			while (rs.next()) {
				WorkflowRecord record = new WorkflowRecord();
				record.setSensor_ID(rs.getInt("Sensor_ID"));
				record.setLogischeSensor_ID(rs.getString("LogischeSensor_ID"));
				record.setAnzahl(rs.getInt("Anzahl"));
				record.setTemperaturwert(Double.parseDouble(rs.getString("Temperaturwert")));
				record.setTimestamp(rs.getTimestamp("Timestamp"));
				record.setAbteilungsName(rs.getString("Abteilungsname"));
				record.setGrenzwert(rs.getDouble("Grenzwert"));
				record.setWBL_User_ID(rs.getInt("WBL_User_ID"));
				record.setWBL_Mobile_ID(rs.getInt("WBL_Mobile_ID"));
				record.setWBL_MobileName(rs.getString("WBL_MobileName"));
				record.setHL_User_ID(rs.getInt("HL_User_ID"));
				record.setHL_Mobile_ID(rs.getInt("HL_Mobile_ID"));
				record.setHL_MobileName(rs.getString("HL_MobileName"));
				record.setMarkt_ID(rs.getInt("Marktnummer"));
				record.setOeffnungszeiten_von(rs.getTimestamp("Oeffnungszeiten_von"));
				record.setOeffnungszeiten_bis(rs.getTimestamp("Oeffnungszeiten_bis"));
				record.setOeffnungszeiten_innerhalb(rs.getInt("Oeffnungszeiten_innerhalb"));
				record.setSnooze_Open(rs.getInt("Snooze_Open"));
				record.setSnooze_Progress(rs.getInt("Snooze_Progress"));
				record.setWBL_Andrede(rs.getString("WBL_Andrede"));
				record.setWBL_Vorname(rs.getString("WBL_Vorname"));
				record.setWBL_Nachname(rs.getString("WBL_Nachname"));
				record.setWBL_Email(rs.getString("WBL_Email"));
				record.setHL_Andrede(rs.getString("HL_Anrede"));
				record.setHL_Vorname(rs.getString("HL_Vorname"));
				record.setHL_Nachname(rs.getString("HL_Nachname"));
				record.setHL_Email(rs.getString("HL_Email"));
				criticalTempData.add(record);
			}
			return criticalTempData;
		} catch (SQLException e) {
			log.error("Fehler beim Auslesen von getAllSensorsToStoreDepartment aus der Datenbank!", e);
		}
		finally
        {
            close( con, stmt, null );
        }
		return null;
	}

	public final void LogEscalation(String LogSens_ID) {
		Connection con = null;
		String query = "{CALL Escalate(?)}";
		CallableStatement stmt = null;
		try {
			con = getCf().createConnection();
			stmt = con.prepareCall(query);
			stmt.setString(1, LogSens_ID);
			stmt.executeQuery();

			System.out.println("Logged Escalation for Sensor ID " + LogSens_ID);
		} catch (SQLException e) {
			log.error("Fehler beim Loggen einer Eskalation.", e);
		}
		finally
        {
            close( con, stmt, null );
        }
	}

	public final boolean getSensorStatus(String LogSens_ID) {
		Connection con = null;
		String query = "{CALL SensorStatus(?)}";
		ResultSet rs = null;
		CallableStatement stmt = null;
		try {
			con = getCf().createConnection();
			stmt = con.prepareCall(query);
			stmt.setString(1, LogSens_ID);
			rs = stmt.executeQuery();

			int rowcount = 0;
			if (rs.last()) {
				rowcount = rs.getRow();
				rs.beforeFirst();
			}
			if (rowcount > 0) {
				System.out.println(
						"Temperaturdaten-Abfrage fuer Sensor: \"" + LogSens_ID + "\" Temperatur immernoch zu hoch!");
				return true;
			} else {
				System.out.println("Temperaturdaten-Abfrage fuer Sensor: \"" + LogSens_ID
						+ "\" Temperatur wieder im Normalbereich.");
				return false;
			}
		} catch (SQLException e) {
			log.error("Fehler bei der Temperaturdaten-Abfrage: ", e);
		}
		finally
        {
            close( con, stmt, null );
        }
		return false;
	}

	public final int getNotificationStatus(long notification_ID) {
		Connection con = null;
		String query = "{CALL NotificationStatus(?)}";
		ResultSet rs = null;
		CallableStatement stmt = null;
		try {
			con = getCf().createConnection();
			stmt = con.prepareCall(query);
			stmt.setLong(1, notification_ID);
			rs = stmt.executeQuery();

			int rowcount = 0;
			if (rs.last()) {
				rowcount = rs.getRow();
				rs.beforeFirst();
			}
			if (rowcount > 0) {
				int result = -1;
				while (rs.next())
					result = rs.getInt("state");
				System.out.println("NotificationStatus Abfrage fuer ID\"" + notification_ID + "\":" + result);
				return result;
			} else {
				System.out.println("Fehler bei der NotificationStatus Abfrage: " + notification_ID);
				return -1;
			}
		} catch (SQLException e) {
			log.error("Fehler bei der NotificationStatus-Abfrage: ", e);
		}
		finally
        {
            close( con, stmt, null );
        }
		return -1;
	}
}