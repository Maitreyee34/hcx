import { DestroyOptions } from "sequelize";
import { PatientModel } from "./patient.model";
import { IPatient } from "./patient.types";

const create = (patientData: Omit<IPatient, 'abhaId'>) => {
    try {
        return PatientModel.create(patientData);
    } catch (error) {
        throw error;
    }
}

const findOne = (query: any) => {
    try {
        return PatientModel.findOne(query);
    } catch (error) {
        throw error;
    }
}

const findAll = (query: any) => {
    try {
        return PatientModel.findAll(query);
    } catch (error) {
        throw error;
    }
}

const update = (data: Partial<IPatient>, query: any) => {
    try {
        return PatientModel.update(data, query);
    } catch (error) {
        throw error;
    }
}

const destroy = (query: DestroyOptions<Pick<IPatient, 'abhaId'>>) => {
    try {
        return PatientModel.destroy(query)
    } catch (error) {
        throw error;
    }
}

export default {
    create,
    findOne,
    findAll,
    update,
    destroy
}