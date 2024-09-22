import { DataTypes } from "sequelize";

export const RideTableStructure =
{
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    standsUpDateAndTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDateAndTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    linkRef: {
        type: DataTypes.STRING,
        allowNull: false,
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
    bingMapUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true
        },
    },
    startLocation: {
        type: DataTypes.STRING,
        allowNull: true
    },
    latitude: {
        type: DataTypes.INTEGER,
        validate: {
            min: -90,
            max: 90,
        },
    },
    longitude: {
        type: DataTypes.INTEGER,
        validate: {
            min: -180,
            max: 180,
        },
    },
};

