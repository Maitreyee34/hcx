export const COMMON_CONSTANTS = {
    IDENTIFIER_USE_ARRAY: ["usual", "official", "temp", "secondary", "old"] as const,
    TELECOM_SYSTEM_ARRAY: ["phone", "fax", "email", "pager", "url", "sms", "other"] as const,
    TELECOM_USE_ARRAY: ["home", "work", "temp", "old", "mobile"] as const,
    GENDER_ARRAY: ["male", "female", "other", "unknown"] as const,
    DATE_REGEX: /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?/,
    DATE_TIME_REGEX: /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00)))?)?)?/,
    MIME_TYPE_REGEX: /[^\s]+(\s[^\s]+)*/,
    BASE_64_BINARY_REGEX: /(\s*([0-9a-zA-Z\+\=]){4}\s*)+/,
    COVERAGE_STATUS_ARRAY: ["active", "cancelled", "draft", "entered-in-error"] as const,
    SYSTEM_VALUE_FOR_ORGANIZATION: "http://terminology.hl7.org/CodeSystem/organization-type",
    PURPOSE_ARRAY_FOR_COVERAGE_ELIGIBILITY_REQUEST: ["auth-requirements", "benefits", "discovery", "validation"] as const,
}
