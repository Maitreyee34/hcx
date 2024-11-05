import patientTreatmentRepository from "./patientTreatment.repository";
import { IPatientTreatment } from "./patientTreatment.types";

export const create = async (treatmentData: Omit<IPatientTreatment, 'id'>) => {
    try {
        const createdTreatmentData = await patientTreatmentRepository.create(treatmentData);
        return createdTreatmentData;
    } catch (error) {
        throw error;
    }
}

export default {
    create
}