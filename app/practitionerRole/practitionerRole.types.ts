import { z } from "zod";
import { COMMON_CONSTANTS } from "../utilities/common.types";

const practitionerRoleSchema = z.object({
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
    practitioner: z.object({
        reference: z.string().regex(/^Organization\//),
        type: z.string(),
        identifier: z.string(),
        display: z.string()
    }),
    organization: z.object({
        reference: z.string().regex(/^Organization\//),
        type: z.string(),
        identifier: z.string(),
        display: z.string()
    }),
    code: z.object({
        coding: z.array(
            z.object({
                system: z.string(),
                code: z.string(),
                display: z.string(),
            })
        )
    }),
    speciality: z.array(
        z.object({
            coding: z.array(
                z.object({
                    system: z.string(),
                    code: z.string(),
                    display: z.string(),
                })
            ),
            text: z.string()
        }),
    ),
    telecom: z.array(
        z.object({
            system: z.enum(COMMON_CONSTANTS.TELECOM_SYSTEM_ARRAY),
            value: z.string()
        })
    )
})