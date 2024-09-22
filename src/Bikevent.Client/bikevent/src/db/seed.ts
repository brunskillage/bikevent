export const ClubsSeed = `INSERT INTO 'clubs' ('id', 'nameOf', 'description', 'president', 'email', 'websiteUrl', 'mainImageRef', 'googleMapUrl', 'createdAt', 'updatedAt') VALUES
(1, 'Ulysses Club of NZ', 'Ulysses Club of NZ Desc', 'Andy Smith', 'contact@ulysses.org.nz', 'https://ulysses.org.co.nz', NULL, NULL, '2024-09-22 23:00:42', '2024-09-22 23:00:42'),
(2, 'Hamilton Social Riders Club', 'Hamilton Social Riders Club Desc', 'NA', 'social@bike.org', '', NULL, NULL, '2024-09-22 23:00:42', '2024-09-22 23:00:42');`


export const BranchesSeed = `INSERT INTO 'branches' ('id', 'nameOf', 'description', 'president', 'email', 'websiteUrl', 'createdAt', 'updatedAt', 'clubId') VALUES 
    (NULL, 'Waikato Ulysses Branch', 'Waikato Ulysses Branch Desc', 'A Brunskill', 'waikato@ulysses.org.uk', 'https://www.facebook.com/groups/ulysseswaikato', '2024-09-22 23:02:48', '2024-09-22 23:02:48', '1')
  , (NULL, 'Rotorua Branch', 'Rotorua Branch Desc', 'Rotorua Branch Pres', 'Rotorua Branch email', 'Rotorua Branch web', '2024-09-22 23:02:48', '2024-09-22 23:02:48', 1);`
