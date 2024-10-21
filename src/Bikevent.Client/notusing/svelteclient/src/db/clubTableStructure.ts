import { DataTypes, Sequelize } from "sequelize";

export const ClubTableStructure =
{
    nameOf: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    president: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    websiteUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true
        },
    },
    mainImageRef: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    googleMapUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true
        },
    },
    createdOn: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedOn: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
};

