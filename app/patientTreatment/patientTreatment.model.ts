import { DataTypes } from "sequelize";
import { sequelize } from "../connections/mysql.connect";

export const PatientTreatmentModel = sequelize.define(
    'patient_treatments',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        patientId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'patients',
                key: 'id'
            }
        },
        treatmentForHealthProblemId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'health_problem_treatment',
                key: 'id'
            }
        }
    }
)