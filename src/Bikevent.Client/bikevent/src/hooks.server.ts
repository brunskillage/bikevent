import { Sequelize } from "sequelize";
import { DBNAME, DBPASS, DBUSER, DBHOST, DBPORT } from '$env/static/private';
import { RideTableStructure } from "./db/ridesTable";
import { EventTableStructure } from "./db/eventTable";
import { ClubTableStructure } from "./db/clubTableStructure";
import { BranchTableStructure } from "./db/branchTableStructure";

const shouldMigrate = true;

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

const Timestamps = {
  createdOn: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedOn: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}

export const Ride = sequelize.define(
  "ride", { ...RideTableStructure, ...Timestamps })
export const Event = sequelize.define(
  "event", { ...EventTableStructure, ...Timestamps })
export const Club = sequelize.define(
  "club", { ...ClubTableStructure, ...Timestamps })
export const Branch = sequelize.define(
  "branch", { ...BranchTableStructure, ...Timestamps })


if (shouldMigrate) {
  try {
    await sequelize.sync({ force: false }).then(() => {
      console.log("DB Synced");
    });
  } catch (error) {
    console.log(error);
  }

}

// Club.hasMany(Branch);
// Branch.belongsTo(Club)
// Branch.hasMany(Ride);
// Branch.hasMany(Event);




// const ClubsSeed = `INSERT INTO 'clubs' ('id', 'nameOf', 'description', 'president', 'email', 'websiteUrl', 'mainImageRef', 'googleMapUrl', 'createdAt', 'updatedAt') VALUES
// (1, 'Ulysses Club of NZ', 'Ulysses Club of NZ Desc', 'Andy Smith', 'contact@ulysses.org.nz', 'https://ulysses.org.co.nz', NULL, NULL, '2024-09-22 23:00:42', '2024-09-22 23:00:42'),
// (2, 'Hamilton Social Riders Club', 'Hamilton Social Riders Club Desc', 'NA', 'social@bike.org', '', NULL, NULL, '2024-09-22 23:00:42', '2024-09-22 23:00:42');`


// const BranchesSeed = `INSERT INTO 'branches' ('id', 'nameOf', 'description', 'president', 'email', 'websiteUrl', 'createdAt', 'updatedAt', 'clubId') VALUES
//     (NULL, 'Waikato Ulysses Branch', 'Waikato Ulysses Branch Desc', 'A Brunskill', 'waikato@ulysses.org.uk', 'https://www.facebook.com/groups/ulysseswaikato', '2024-09-22 23:02:48', '2024-09-22 23:02:48', '1')
//   , (NULL, 'Rotorua Branch', 'Rotorua Branch Desc', 'Rotorua Branch Pres', 'Rotorua Branch email', 'Rotorua Branch web', '2024-09-22 23:02:48', '2024-09-22 23:02:48', 1);`
