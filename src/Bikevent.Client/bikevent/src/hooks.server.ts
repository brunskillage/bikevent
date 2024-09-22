import { Sequelize } from "sequelize";
import { DBNAME, DBPASS, DBUSER, DBHOST, DBPORT } from '$env/static/private';
import { RideTableStructure } from "./db/ridesTable";
import { EventTableStructure } from "./db/eventTable";
import { ClubTableStructure } from "./db/clubTableStructure";
import { BranchTableStructure } from "./db/branchTableStructure";

const shouldMigrate = false;

export const sequelize = new Sequelize(DBNAME, DBUSER, DBPASS, {
  dialect: "mariadb",
  host: DBHOST,
  port: +DBPORT,
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

if (shouldMigrate) {
  await sequelize.sync({ force: true }).then(() => {
    console.log("DB Synced");
  });
}

export const Ride = sequelize.define(
  "ride", RideTableStructure)
export const Event = sequelize.define(
  "event", EventTableStructure)
export const Club = sequelize.define(
  "club", ClubTableStructure)
export const Branch = sequelize.define(
  "branch", BranchTableStructure)

Club.hasMany(Branch);
Branch.belongsTo(Club)
Branch.hasMany(Ride);
Branch.hasMany(Event);


const ClubsSeed = `INSERT INTO 'clubs' ('id', 'nameOf', 'description', 'president', 'email', 'websiteUrl', 'mainImageRef', 'googleMapUrl', 'createdAt', 'updatedAt') VALUES
(1, 'Ulysses Club of NZ', 'Ulysses Club of NZ Desc', 'Andy Smith', 'contact@ulysses.org.nz', 'https://ulysses.org.co.nz', NULL, NULL, '2024-09-22 23:00:42', '2024-09-22 23:00:42'),
(2, 'Hamilton Social Riders Club', 'Hamilton Social Riders Club Desc', 'NA', 'social@bike.org', '', NULL, NULL, '2024-09-22 23:00:42', '2024-09-22 23:00:42');`


const BranchesSeed = `INSERT INTO 'branches' ('id', 'nameOf', 'description', 'president', 'email', 'websiteUrl', 'createdAt', 'updatedAt', 'clubId') VALUES 
    (NULL, 'Waikato Ulysses Branch', 'Waikato Ulysses Branch Desc', 'A Brunskill', 'waikato@ulysses.org.uk', 'https://www.facebook.com/groups/ulysseswaikato', '2024-09-22 23:02:48', '2024-09-22 23:02:48', '1')
  , (NULL, 'Rotorua Branch', 'Rotorua Branch Desc', 'Rotorua Branch Pres', 'Rotorua Branch email', 'Rotorua Branch web', '2024-09-22 23:02:48', '2024-09-22 23:02:48', 1);`
