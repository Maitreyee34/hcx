import patientRoutes from "../patient/patient.routes";
import { Route } from "./routes.types";

export const routes: Route[] = [
    { path: '/patient', router: patientRoutes.router }
]