import { NextFunction, Request, Response, Router } from "express";
import patientServices from "./patient.services";
import encryptData from "../utilities/encrypt-data";

const router = Router();

router.post(
    "/",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { patientData, treatmentForHealthProblemId } = req.body;
            const response = await patientServices.capturePatientDetails(patientData, treatmentForHealthProblemId);
            res.send(response);
        } catch (error) {
            next(error);
        }
    }
)

router.get(
    "/",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
        const payload = JSON.stringify(`
          {
    protected: headers,
    ciphertext: "eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZHQ00iLCJraWQiOiI5cWQyMWtEQjFBQXF3NlB3Tk9Sb3phcHozejFzUHRXc3V3aHF6c1VSS3Y4In0.GXxekb1CG9KuiOeYf1XIBuquJwqlnnlvSDBty2a0X9YRS-Qim2hOxdTZnxwg113hLXMIWrzz1AD6BLE7jbSH0xeFkP-YT7MX3pI_lCkcV_dGwlsGYTzfgP11AnswTwJCQEC1bVeIx6DXDU-SVkzmoCJJpLA0751yBefxlqzHQrkwO2L0RSJF2SCF2q-4I5lIcanPzPyJ4MDMHPgC9XPXGB06izPwNZFwF5wsuBVDR5plNb2eBmyS4reJj42RFR0I475EbQZs7kY3W_FkCGbJxe28feD8tHnZD7MQi2vTsHJGc_0D5-RoLDeq4QktJqW7VZLpvisw48A6BkVFA2Y4RA.AUFnO0dF2EExSmMj.WIm_r63YDlKI-GuDznMb9grYKVGcf24puTKO6pa-i9gbuTf_q6HEttqoSEewVpqJedTR4UU-gvCkGkjxitJ3Xaq9xTU_4C-PNEp7RgPB3Pu-DUS6RMHW2fTMmcx5PLtrz1MLQ2FRwyXB0VhLOy-PlFPQqHvk98VskX-RIZdjyB3zjZFiMV75dcdOpnQBvT1FejcBKpulgq2b25xsWJIg5oFlITtkF6z6vtVmHSqhppU7UuwRvezCG15r29rJ4J8sSj3x_YU8HQMWI2k0E648Te1HynxoVrofTRO9Z_iwQ-P5x9bSyRrv6iUh4-nhUyndbdalFfOrBvmnJoPm_e1mgaERNd8muzrwMF-mNikZXw3HC3fcYNuzCzbRL93u3PIijsqBq_DECx9EgeDvGVUlBW8gL6wiGne6ZjbHOLO2wCenDqHF-9czpqk1yWGlycR416KOKXYUpC2FTWlqRZnGBiiB4R3TPV1MRfStrLqeS2tKsIvmOXXGn_mHTkKCsBCcxHyybDghZ-A8qVFGYRrTVh9QYK7wDzmLqY5JfJGRo7XpA--d0xso885o-mXHoGPoa7VdBdKNiM63lhONG1H9cX-m-2zDzPEiJn03l14j2wD6kEorktE3mHZYLeQMIIB_bKk8lG4zolNY-14agumWMLWW5QUb5c9oDZFtrJxaVJRN4YuRXXJlQO8QA6uEaclT--Du1h7w4jbLh0-y0NfXeyDj81Gb2i-WdnZJai16Ma20KSjGkH8Oa9j88vfmGB9apb1jabCgSqSFvfWgLKUuoJyNOjF8xTHdqVu-jUNv4PC_3LWC6U8utLUYHtw6irspOCBzQuOmsvwW2etJM2hsvf7UtvD2icvte6Sb_KNmiF_R8m9RRtRFc6unYQUeYaASJKvT-Txf6s0hW0FJwGRIyZTVRmhG_WR-v73xRCs3bQ2WVWiY_a3IMyoou9Dhoc94d6o-6Tf3gnLq9O2xaTy-Ik5xsPflVGt85tW_xZ7IQ2d6etrrNfZRf2XPzzIoMIWnC7RY6ye__nrRQlTyk19CHyi43RN0G2dZzZEO26EyW_hn-iet3eLm412dSW15st7ORw-wSGQmeTZ6IIcIX-T6uAdFTFpjbGN2B1K-vmMwpYEWeaGT-KTKMIM52xA1pI3qzGCtXjYejdbYyM7SDCDHMZIEHwbejsRupW6YZHRnKiQePj6elY5CIDtNB1bN8uanKgww79TeaY_Eq8cBidHPQuHovRqNjdTAsthJc2JxtDvQxRXCsvJYOeLzvMchW99SnWLd6G5mQOBc8aq1X16ZwK4d87RY7lTwH8kl5qT94DJMoYhJiPUtN-FOWl70iTBvGq5HzgvIuREXLDTfT6BZLwmvcm_C.9QugiIQplYUCEimru4FHGQ",
    tag: "abcd"
}
          `)
        const encryptedPayload = await encryptData.encryptJWE(payload);
        // console.log(encryptedPayload);
        res.send(encryptedPayload);
        } catch (error) {
            next(error);
        }
    }
)

export default { router };