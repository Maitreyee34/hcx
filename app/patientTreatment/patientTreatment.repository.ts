import { PatientTreatmentModel } from "./patientTreatment.model";
import { IPatientTreatment } from "./patientTreatment.types";

export const create = (treatmentData: Omit<IPatientTreatment, 'id'>) => {
    try {
        return PatientTreatmentModel.create(treatmentData);
    } catch (error) {
        throw error;
    }
}

export default {
    create
}