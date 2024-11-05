import { z } from "zod";
import { COMMON_CONSTANTS } from "../utilities/common.types";

const practitionerSchema = z.object({
    resourceType: z.string(),
    identifier: z.array(
        z.object({
            use: z.enum(COMMON_CONSTANTS.IDENTIFIER_USE_ARRAY),
            type: z.object({
                coding: z.array(
                    z.object({
                        system: z.string(),
                        code: z.string(),
                        display: z.string(),
                    })
                ),
                text: z.string(),
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
            value: z.string(),
            use: z.enum(COMMON_CONSTANTS.TELECOM_USE_ARRAY)
        })
    ),
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
    gender: z.enum(COMMON_CONSTANTS.GENDER_ARRAY),
    birthDate: z.string().regex(COMMON_CONSTANTS.DATE_REGEX),
    photo: z.array(
        z.object({
            contentType: z.string().regex(COMMON_CONSTANTS.MIME_TYPE_REGEX ),
            data: z.string().regex(COMMON_CONSTANTS.BASE_64_BINARY_REGEX)
        })
    ),
    qualification: z.array(
        z.object({
            code: z.object({
                coding: z.array(
                    z.object({
                        system: z.string().url(),
                        code: z.string().regex(COMMON_CONSTANTS.MIME_TYPE_REGEX),
                        display: z.string()
                    })
                )
            }),
            text: z.string(),
            issuer: z.object({
                organization: z.object({
                    reference: z.string().regex(/^Organization\//),
                    type: z.string(),
                    identifier: z.string(),
                    display: z.string()
                })
            })
        })
    )
})