import { Model, Transaction } from "sequelize";
import { sequelize } from "../connections/mysql.connect";
import { PATIENT_ERRORS, PATIENT_RESPONSES } from "./patient.constants";
import patientRepository from "./patient.repository";
import { IPatient } from "./patient.types";
import patientTreatmentRepository from "../patientTreatment/patientTreatment.repository";

const capturePatientDetails = async (patientData: Omit<IPatient, 'abhaId'>, treatmentForHealthProblemId: string) => {
    let createTransaction;
    try {
        const { firstName, contactNumber, insuranceNumber } = patientData;

        const exsitingPatientRecord = await patientRepository.findOne({where: { firstName, contactNumber }});
        
        if(!exsitingPatientRecord){
            createTransaction = await sequelize.transaction();
            const createdRecord = await patientRepository.create(patientData);
            await patientTreatmentRepository.create({patientId: createdRecord.dataValues.abhaId, treatmentForHealthProblemId});
            createTransaction.commit();
        }

        const { abhaId: existingPatientId, insuranceNumber: existingInsuranceNumber } = exsitingPatientRecord.dataValues;

        if(existingInsuranceNumber!==insuranceNumber){
            throw PATIENT_ERRORS.INVALID_INSURANCE_DETAILS;
        }

        await patientTreatmentRepository.create({patientId: existingPatientId, treatmentForHealthProblemId })
        return PATIENT_RESPONSES.RECORD_CAPTURED; 
    } catch (error) {
        createTransaction?.rollback();
        throw error;
    }
}

const checkCoverageEligibilityRequest = () => {

}

export default {
    capturePatientDetails
}