import { z } from "zod";
import { COMMON_CONSTANTS } from "../utilities/common.types";

const organizationSchema = z.object({
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
    type: z.array(
        z.object({
            coding: z.array(
                z.object({
                    system: z.literal(COMMON_CONSTANTS.SYSTEM_VALUE_FOR_ORGANIZATION),
                    code: z.string(),
                    display: z.string(),
                })
            )
        }),
    ),
    name: z.string(),
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
    partOf: z.object({
            reference: z.string().regex(/^Organization\//),
            type: z.string(),
            identifier: z.string(),
            display: z.string()
    })
})