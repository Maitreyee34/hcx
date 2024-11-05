import { JWE, JWK, parse } from "node-jose";

const { PUBLIC_KEY, PRIVATE_KEY, ENCRYPTION_FORMAT, CONTENT_ALGORITHM, ALGORITHM } = process.env;


// const makeKeys = async () => {
    
//     const jwKeys = await Promise.all([
    //         JWK.asKey(PRIVATE_KEY, "pem"),
//         JWK.asKey(PUBLIC_KEY, "pem")
//     ]);

//     let keystore = JWK.createKeyStore();
//     await keystore.add(jwKeys[0]);
//     await keystore.add(jwKeys[1]);

//     return keystore;
// }

// const encrypt = async (data: any) => {
    
//     await makeKeys();

//     let publicKey = await JWK.asKey(PUBLIC_KEY, "pem");
//     const buffer = Buffer.from(JSON.stringify(data))
//     const encryptedData = await JWE.createEncrypt({ format: FORMAT, contentAlg: CONTENT_ALGORITHM, fields: { alg: ALGORITHM } }, publicKey)
//         .update(buffer).final();
//     return encryptedData;
// }

// const decrypt = async (data: any) => {
    
//     const keystore = await makeKeys();

//     let output = parse.compact(data);
//     let decryptedVal = await output.perform(keystore);
//     let claims = Buffer.from(decryptedVal.plaintext).toString();
//     return claims;
// }

const makeKeys = async () => {
    console.log("inside makeKeys function");

    const jwKeys = await Promise.all([
        JWK.asKey(PRIVATE_KEY, "pem"),
        JWK.asKey(PUBLIC_KEY, "pem")
    ]);
    console.log("jwKeys: ",jwKeys);
    let keystore = JWK.createKeyStore();
    console.log("keystore: ",keystore);
    const publicKey = await keystore.add(jwKeys[0]);
    const privateKey = await keystore.add(jwKeys[1]);
    console.log(`publicKey in makeKeys: ${publicKey}, privateKey in makeKeys: ${privateKey}`);
    return { publicKey, privateKey };
}

// Step 2: Encrypt the payload
const encryptJWE = async (payload: string): Promise<string> => {
    console.log("inside encrypt function");
    let { publicKey } = await makeKeys();
    console.log("public key in encrypt: ",publicKey);
    const buffer = Buffer.from(JSON.stringify(payload));
    const encrypted = await JWE.createEncrypt({ format: "compact", contentAlg: CONTENT_ALGORITHM, fields: { alg: ALGORITHM } }, publicKey)
        .update(buffer).final();
    return encrypted;
};

// Step 3: Decrypt the JWE
const decryptJWE = async (jwe: string): Promise<string> => {
    const { privateKey } = await makeKeys();

    const decryptor = JWE.createDecrypt(privateKey);
    const result = await decryptor.decrypt(jwe);
    return result.plaintext.toString();
};

// // Main function to demonstrate encryption and decryption
// (async () => {
//   try {

//     // Define the payload to encrypt
//     const payload = JSON.stringify({ userId: 123, email: "user@example.com" });

//     // Encrypt the payload
//     const jwe = await encryptJWE(payload);
//     console.log("Encrypted JWE:", jwe);

//     // Decrypt the JWE
//     const decryptedPayload = await decryptJWE(jwe);
//     console.log("Decrypted Payload:", decryptedPayload);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// })();

const headers = {
   "x-hcx_sender_code": "6a77bf22-01ba-4b7e-8bde-a1e4a46eb6e6",
   "x-hcx_recipient_code": "77946ffe-ec47-44bb-95f4-94e7483c52c7",
   "x-hcx_api_call_id": "fad7a505-ef5d-40cb-9733-6f8a697e8945",
   "x-hcx_correlation_id": "99288819-60ae-4636-a7ff-83d7a40991a0",
   "x-hcx-timestamp": "1730736466"
}

const payload = {
    protected: headers,
    ciphertext: "eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZHQ00iLCJraWQiOiI5cWQyMWtEQjFBQXF3NlB3Tk9Sb3phcHozejFzUHRXc3V3aHF6c1VSS3Y4In0.GXxekb1CG9KuiOeYf1XIBuquJwqlnnlvSDBty2a0X9YRS-Qim2hOxdTZnxwg113hLXMIWrzz1AD6BLE7jbSH0xeFkP-YT7MX3pI_lCkcV_dGwlsGYTzfgP11AnswTwJCQEC1bVeIx6DXDU-SVkzmoCJJpLA0751yBefxlqzHQrkwO2L0RSJF2SCF2q-4I5lIcanPzPyJ4MDMHPgC9XPXGB06izPwNZFwF5wsuBVDR5plNb2eBmyS4reJj42RFR0I475EbQZs7kY3W_FkCGbJxe28feD8tHnZD7MQi2vTsHJGc_0D5-RoLDeq4QktJqW7VZLpvisw48A6BkVFA2Y4RA.AUFnO0dF2EExSmMj.WIm_r63YDlKI-GuDznMb9grYKVGcf24puTKO6pa-i9gbuTf_q6HEttqoSEewVpqJedTR4UU-gvCkGkjxitJ3Xaq9xTU_4C-PNEp7RgPB3Pu-DUS6RMHW2fTMmcx5PLtrz1MLQ2FRwyXB0VhLOy-PlFPQqHvk98VskX-RIZdjyB3zjZFiMV75dcdOpnQBvT1FejcBKpulgq2b25xsWJIg5oFlITtkF6z6vtVmHSqhppU7UuwRvezCG15r29rJ4J8sSj3x_YU8HQMWI2k0E648Te1HynxoVrofTRO9Z_iwQ-P5x9bSyRrv6iUh4-nhUyndbdalFfOrBvmnJoPm_e1mgaERNd8muzrwMF-mNikZXw3HC3fcYNuzCzbRL93u3PIijsqBq_DECx9EgeDvGVUlBW8gL6wiGne6ZjbHOLO2wCenDqHF-9czpqk1yWGlycR416KOKXYUpC2FTWlqRZnGBiiB4R3TPV1MRfStrLqeS2tKsIvmOXXGn_mHTkKCsBCcxHyybDghZ-A8qVFGYRrTVh9QYK7wDzmLqY5JfJGRo7XpA--d0xso885o-mXHoGPoa7VdBdKNiM63lhONG1H9cX-m-2zDzPEiJn03l14j2wD6kEorktE3mHZYLeQMIIB_bKk8lG4zolNY-14agumWMLWW5QUb5c9oDZFtrJxaVJRN4YuRXXJlQO8QA6uEaclT--Du1h7w4jbLh0-y0NfXeyDj81Gb2i-WdnZJai16Ma20KSjGkH8Oa9j88vfmGB9apb1jabCgSqSFvfWgLKUuoJyNOjF8xTHdqVu-jUNv4PC_3LWC6U8utLUYHtw6irspOCBzQuOmsvwW2etJM2hsvf7UtvD2icvte6Sb_KNmiF_R8m9RRtRFc6unYQUeYaASJKvT-Txf6s0hW0FJwGRIyZTVRmhG_WR-v73xRCs3bQ2WVWiY_a3IMyoou9Dhoc94d6o-6Tf3gnLq9O2xaTy-Ik5xsPflVGt85tW_xZ7IQ2d6etrrNfZRf2XPzzIoMIWnC7RY6ye__nrRQlTyk19CHyi43RN0G2dZzZEO26EyW_hn-iet3eLm412dSW15st7ORw-wSGQmeTZ6IIcIX-T6uAdFTFpjbGN2B1K-vmMwpYEWeaGT-KTKMIM52xA1pI3qzGCtXjYejdbYyM7SDCDHMZIEHwbejsRupW6YZHRnKiQePj6elY5CIDtNB1bN8uanKgww79TeaY_Eq8cBidHPQuHovRqNjdTAsthJc2JxtDvQxRXCsvJYOeLzvMchW99SnWLd6G5mQOBc8aq1X16ZwK4d87RY7lTwH8kl5qT94DJMoYhJiPUtN-FOWl70iTBvGq5HzgvIuREXLDTfT6BZLwmvcm_C.9QugiIQplYUCEimru4FHGQ",
    tag: "abcd"
}

export default {
    encryptJWE,
    decryptJWE
}