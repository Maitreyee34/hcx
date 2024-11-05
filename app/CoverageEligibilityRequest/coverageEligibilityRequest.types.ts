import { z } from "zod";
import { COMMON_CONSTANTS } from "../utilities/common.types";

// revole 3 comments by giving types to them

const coverageSchema = z.object({
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
    status: z.enum(COMMON_CONSTANTS.COVERAGE_STATUS_ARRAY),
    priority: z.object({
        coding: z.array(
            z.object({
                system: z.string(),
                version: z.string(),
                code: z.string(),
                display: z.string(),
                userSelected: z.boolean()
            })
        ),
        text: z.string()
    }),
    purpose: z.enum(COMMON_CONSTANTS.PURPOSE_ARRAY_FOR_COVERAGE_ELIGIBILITY_REQUEST),
    policyHolder: z.object({
        reference: z.union([
            z.string().regex(/^Patient\//),
            z.string().regex(/^RelatedPerson\//),
            z.string().regex(/^Organization\//)
        ]),
        type: z.string(),
        identifier: z.string(),
        display: z.string()
    }),
    subscriber: z.object({
        reference: z.union([
            z.string().regex(/^Patient\//),
            z.string().regex(/^RelatedPerson\//)
        ]),
        type: z.string(),
        identifier: z.string(),
        display: z.string()
    }),
    subscriberId: z.string(),
    beneficiary: z.object({
        reference: z.string().regex(/^Patient\//),
        type: z.string(),
        identifier: z.string(),
        display: z.string()
    }),
    dependent: z.string(),
    relationship: z.object({
        coding: z.array(
            z.object({
                system: z.string(),
                code: z.string(),
                display: z.string(),
            })
        )
    }),
    period: z.object({
        start: z.string().regex(COMMON_CONSTANTS.DATE_TIME_REGEX),
        end: z.string().regex(COMMON_CONSTANTS.DATE_TIME_REGEX)
    }),
    payor: z.object({
        reference: z.union([
            z.string().regex(/^Organization\//),
            z.string().regex(/^Patient\//),
            z.string().regex(/^RelatedPerson\//)
        ]),
        type: z.string(),
        identifier: z.string(),
        display: z.string()
    }),
    class: z.array(
        z.object({
            type: z.object({
                coding: z.array(
                    z.object({
                        system: z.string(),
                        version: z.string(),
                        code: z.string(),
                        display: z.string(),
                        userSelected: z.boolean()
                    })
                ),
                text: z.string()
            }),
            value: z.string(),
            name: z.string()
        })
    ),
    order: z.number().positive(),
    network: z.string(),
    costToBeneficiary: z.array(
        z.object({
            type: z.object({
                coding: z.array(
                    z.object({
                        system: z.string(),
                        version: z.string(),
                        code: z.string(),
                        display: z.string(),
                        userSelected: z.string()
                    })
                ),
                text: z.string()
            }),
            exception: z.array(
                z.object({
                    type: z.object({
                        coding: z.array(
                            z.object({
                                system: z.string(),
                                version: z.string(),
                                code: z.string(),
                                display: z.string(),
                                userSelected: z.string()
                            })
                        ),
                        text: z.string()
                    }),
                    period: z.object({
                        start: z.string().regex(COMMON_CONSTANTS.DATE_TIME_REGEX),
                        end: z.string().regex(COMMON_CONSTANTS.DATE_TIME_REGEX)
                    })
                })
            )
        })
    ),
    subrogation: z.boolean(),
    contract: z.object({
        reference: z.string().regex(/^Contract\//),
        type: z.string(),
        identifier: z.string(),
        display: z.string()
    })
})