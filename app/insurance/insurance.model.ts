import { DataTypes } from "sequelize";
import { sequelize } from "../connections/mysql.connect";

export const InsuranceModel = sequelize.define(
    'insurances',
    {
        insuranceNumber: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        policyName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        policyType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        premium: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        coverageStart: {
            type: DataTypes.DATE,
            allowNull: false
        },
        coverageEnd: {
            type: DataTypes.DATE,
            allowNull: false
        },
        contactNumber: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: true,
        paranoid: true
    }
)