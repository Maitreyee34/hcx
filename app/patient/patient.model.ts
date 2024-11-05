import { DataTypes } from "sequelize";
import { sequelize } from "../connections/mysql.connect";
import { PatientTreatmentModel } from "../patientTreatment/patientTreatment.model";

export const PatientModel = sequelize.define(
    'patients',
    {
        abhaId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateOfBirth: {
            type: DataTypes.DATE,
            allowNull: false
        },
        gender: {
            type: DataTypes.ENUM(...['male', 'female', 'other']),
            allowNull: false
        },
        contactNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        zipCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        insuranceNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'insurance',
                key: 'insuranceNumber'
            }
        }
    },
    {
        timestamps: true,
        paranoid: true,
        freezeTableName: true
    }
)
