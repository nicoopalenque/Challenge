# Host: localhost  (Version 5.5.5-10.4.13-MariaDB)
# Date: 2020-08-24 20:22:36
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "tclient"
#

DROP TABLE IF EXISTS `tclient`;
CREATE TABLE `tclient` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `c_dni` varchar(8) NOT NULL DEFAULT '',
  `c_name` varchar(50) NOT NULL DEFAULT '',
  `c_lastname` varchar(50) NOT NULL DEFAULT '',
  `c_dni_front` varchar(255) DEFAULT '',
  `c_dni_back` varchar(255) DEFAULT '',
  `c_status` varchar(6) NOT NULL DEFAULT '',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

#
# Procedure "addDniBack"
#

DROP PROCEDURE IF EXISTS `addDniBack`;
CREATE PROCEDURE `addDniBack`(
IN pdni VARCHAR(8),
IN pdniBack VARCHAR(255)
)
BEGIN
UPDATE tclient SET c_dni_back=pdniBack WHERE c_dni=pdni;
END;

#
# Procedure "addDniFront"
#

DROP PROCEDURE IF EXISTS `addDniFront`;
CREATE PROCEDURE `addDniFront`(
IN pdni VARCHAR(8),
IN pdniFront VARCHAR(255)
)
BEGIN
UPDATE tclient SET c_dni_front=pdniFront WHERE c_dni=pdni;
END;

#
# Procedure "clientDni"
#

DROP PROCEDURE IF EXISTS `clientDni`;
CREATE PROCEDURE `clientDni`(IN pdni VARCHAR(8))
BEGIN
SELECT * FROM tclient WHERE c_dni=pdni;

END;

#
# Procedure "deleteClient"
#

DROP PROCEDURE IF EXISTS `deleteClient`;
CREATE PROCEDURE `deleteClient`(IN pdni VARCHAR(8))
BEGIN
DELETE FROM tclient WHERE c_dni=pdni;
END;

#
# Procedure "insertClient"
#

DROP PROCEDURE IF EXISTS `insertClient`;
CREATE PROCEDURE `insertClient`(
IN pdni VARCHAR(8),
IN pname VARCHAR(50),
IN plastname VARCHAR(50)
)
BEGIN
INSERT INTO tclient(c_dni,c_name,c_lastname,c_status) VALUES (pdni,pname,plastname,'TRUE');
END;

#
# Procedure "listClients"
#

DROP PROCEDURE IF EXISTS `listClients`;
CREATE PROCEDURE `listClients`()
BEGIN
SELECT * FROM tclient WHERE c_status='TRUE';
END;

#
# Procedure "logicDeleteClient"
#

DROP PROCEDURE IF EXISTS `logicDeleteClient`;
CREATE PROCEDURE `logicDeleteClient`(
IN pdni VARCHAR(8)
)
BEGIN
UPDATE tclient SET c_status='FALSE' WHERE c_dni=pdni;
END;

#
# Procedure "updateClient"
#

DROP PROCEDURE IF EXISTS `updateClient`;
CREATE PROCEDURE `updateClient`(
IN pdni VARCHAR(8),
IN pname VARCHAR(50),
IN plastname VARCHAR(50),
IN pdniFront VARCHAR(50),
IN pdniBack VARCHAR(50)
)
BEGIN
UPDATE tclient SET c_name=pname, c_lastname=plastname,c_dni_front=pdniFront,c_dni_back=pdniBack WHERE c_dni=pdni;
END;
