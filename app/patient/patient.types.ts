import { z } from "zod";
import { COMMON_CONSTANTS } from "../utilities/common.types";

export interface IPatient {
    abhaId: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
    contactNumber: string;
    email: string;
    address: string;
    city: string;
    country: string;
    zipCode: string;
    insuranceNumber: string;
}

const patientSchema = z.object({
    resourceType: z.string(),
    identifier: z.array(
        z.object({
            type: z.object({
                coding: z.array(
                    z.object({
                        system: z.string(),
                        code: z.string(),
                        display: z.string(),
                    })
                )
            }),
            system: z.string(),
            value: z.string(),
            assigner: z.object({
                display: z.string()
            })
        })
    ),
    name: z.array(
        z.object({
            text: z.string()
        })
    ),
    telecom: z.array(
        z.object({
            system: z.enum(COMMON_CONSTANTS.TELECOM_SYSTEM_ARRAY),
            value: z.string()
        })
    ),
    gender: z.enum(COMMON_CONSTANTS.GENDER_ARRAY),
    birthDate: z.string().regex(COMMON_CONSTANTS.DATE_REGEX),
    address: z.object({
        use: z.string(),
        type: z.string(),
        text: z.string(),
        line: z.string(),
        city: z.string(),
        district: z.string(),
        state: z.string(),
        postalCode: z.string(),
        country: z.string(),
        period: z.object({
            start: z.string().regex(COMMON_CONSTANTS.DATE_TIME_REGEX),
            end: z.string().regex(COMMON_CONSTANTS.DATE_TIME_REGEX)
        }),
    }),
    contact: z.array(
        z.object({
            organization: z.object({
                reference: z.string().regex(/^Organization\//),
                type: z.string(),
                identifier: z.object({
                    id: z.string(),
                    extension: z.array(
                        z.object({
                            url: z.string()
                        })
                    )
                }),
                display: z.string()
            })
        })
    ),
    generalPractitioner: z.object({
        reference: z.union([
            z.string().regex(/^Organization\//),
            z.string().regex(/^Practitioner\//),
            z.string().regex(/^PractitionerRole\//),
        ]),
        type: z.string(),
        identifier: z.object({
            id: z.string(),
            extension: z.array(
                z.object({
                    url: z.string()
                })
            )
        }),
        display: z.string()
    }),
    managingOrganization: z.object({
        reference: z.string().regex(/^Organization\//),
        type: z.string(),
        identifier: z.object({
            id: z.string(),
            extension: z.array(
                z.object({
                    url: z.string()
                })
            )
        }),
        display: z.string()
    }),
    link: z.object({
        other: z.object({
            reference: z.union([
                z.string().regex(/^RelatedPerson\//),
                z.string().regex(/^Patient\//)
            ]),
            type: z.string(),
            identifier: z.object({
                id: z.string(),
                extension: z.array(
                    z.object({
                        url: z.string()
                    })
                )
            }),
            display: z.string()
        })
    })
})

export interface IPatientType extends z.infer<typeof patientSchema> {}