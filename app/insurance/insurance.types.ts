export interface IInsurance {
    insuranceNumber: string;
    policyName: string;
    policyType: string;
    premium: string;
    coverageStart: Date;
    coverageEnd: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface IHealthProblem {
    id: string;
    name: string;
    description: string;
}

export interface ITreatment {
    id: string;
    treatmentType: string;
    medicinesNeeded: string[];
}

// one health problem can have multiple treatments and one treatment can be linked to multiple health problems
export interface IHealthProblemTreatment {
    id: string;
    patientId: string;
    healthProblemId: string;
    treatmentId: string;
    daysToCure: string;
} 