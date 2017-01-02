# WorkflowData

SELECT Sensoren.ID AS Sensor_ID, 
       Sensordaten.LogischeSensor_ID, 
       Sensordaten.Wert AS Temperaturwert, 
       Abteilungstyp.Grenzwert,
       COUNT(Sensordaten.LogischeSensor_ID) AS Anzahl,
       Sensordaten.Timestamp, 
       Markt.Oeffnungszeiten_von,
       Markt.Oeffnungszeiten_bis,
       (TIME(Sensordaten.Timestamp) >= Markt.Oeffnungszeiten_von AND
        TIME(Sensordaten.Timestamp) < Markt.Oeffnungszeiten_bis) AS Oeffnungszeiten_innerhalb,
       Abteilung.Name AS Abteilungsname,
       Abteilung.Snooze_Open,
       Abteilung.Snooze_Progress,
       Abteilung.Warenbereichsleiter_id AS WBL_User_ID,
       User_WBL.Anrede AS WBL_Andrede,
       User_WBL.Vorname AS WBL_Vorname,
       User_WBL.Nachname AS WBL_Nachname,
       User_WBL.Email AS WBL_Email,
       User_WBL.MobileContact_ID AS WBL_Mobile_ID,
       Mobile_WBL.name AS WBL_MobileName,
       Markt.Hausleiter_id AS HL_User_ID,
       User_HL.Anrede AS HL_Anrede,
       User_HL.Vorname AS HL_Vorname,
       User_HL.Nachname AS HL_Nachname,
       User_HL.Email AS HL_Email,
       User_HL.MobileContact_ID AS HL_Mobile_ID,
	   Mobile_HL.name AS HL_MobileName
FROM Sensordaten
JOIN (Sensoren JOIN (((Abteilung JOIN Abteilungstyp 
                                 ON Abteilung.Abteilungstyp_ID = Abteilungstyp.ID
                                 JOIN Markt
                                 ON Markt.ID = Abteilung.Markt_ID
                      )
                     JOIN (User AS User_WBL JOIN MobileContact AS Mobile_WBL
                                ON User_WBL.MobileContact_ID = Mobile_WBL.id)
                     ON Abteilung.Warenbereichsleiter_id = User_WBL.ID)
                     JOIN (User AS User_HL JOIN MobileContact AS Mobile_HL
                                ON User_HL.MobileContact_ID = Mobile_HL.id)
                     ON Markt.Hausleiter_id = User_HL.ID

                    )
                     
               ON Sensoren.Abteilung_ID = Abteilung.ID)
ON Sensoren.Logische_ID = Sensordaten.LogischeSensor_ID
WHERE Timestamp > (now() - interval 5000 minute)
  AND Timestamp < now()
  AND Sensoren.Status = 'aktiv'
  AND Sensordaten.Wert > Abteilungstyp.Grenzwert
GROUP BY Sensordaten.LogischeSensor_ID
HAVING (Anzahl > 1)


# SensorStatus


SELECT Sensordaten.LogischeSensor_ID,
	   Sensordaten.Timestamp
FROM Sensordaten
JOIN (Sensoren JOIN (Abteilung JOIN Abteilungstyp 
                                 ON Abteilung.Abteilungstyp_ID = Abteilungstyp.ID
                      )
               ON Sensoren.Abteilung_ID = Abteilung.ID)
ON Sensoren.Logische_ID = Sensordaten.LogischeSensor_ID
WHERE Timestamp > (now() - interval 5000 minute)
  AND Timestamp < now()
  AND Sensordaten.LogischeSensor_ID = Sensor_ID
  AND Sensordaten.Wert > Abteilungstyp.Grenzwert
  AND Sensordaten.Timestamp = (SELECT max(Sensordaten.Timestamp) FROM Sensordaten
    WHERE Sensordaten.LogischeSensor_ID = Sensor_ID)
    
    
 # NotificationStatus
 
 SELECT state from MobileNotification WHERE id = notification_ID
	
 # Escalate
 
 INSERT INTO Eskalation (LogischeSensor_ID)
values (LogSens_ID)