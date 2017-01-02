package kmunda;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;

import org.apache.commons.dbcp.DriverManagerConnectionFactory;

public class DBConnection {

	private static DriverManagerConnectionFactory cf;

	public DBConnection() {
		try {
			// com.mysql.jdbc.Driver
			// org.mariadb.jdbc.Driver
			Class.forName("com.mysql.jdbc.Driver");
		}

		catch (Exception e) {
			e.printStackTrace();
		}
	}

	protected final void createConnectionFactory(final String config) {
		if (getCf() == null) {
			DBConnection.setCf(null);
			Properties properties = new Properties();
			InputStream stream = null;
			if (config != null) {
				stream = DBConnection.class.getClassLoader().getResourceAsStream(config);
			} else {
				stream = DBConnection.class.getClassLoader().getResourceAsStream("dbconfig.properties");
			}
			try {
				properties.load(stream);
			} catch (Exception e) {
				e.printStackTrace();
			}
			setCf(new DriverManagerConnectionFactory(properties.getProperty("url"), properties.getProperty("benutzer"),
					properties.getProperty("pw")));
		}
	}

	public final void close(final Connection con, final PreparedStatement stmt, final ResultSet rs) {
		try {
			if (con != null) {
				con.close();
			}
			if (stmt != null) {
				stmt.close();
			}
			if (rs != null) {
				rs.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static DriverManagerConnectionFactory getCf() {
		return cf;
	}

	public static void setCf(final DriverManagerConnectionFactory cf1) {
		DBConnection.cf = cf1;
	}
}
