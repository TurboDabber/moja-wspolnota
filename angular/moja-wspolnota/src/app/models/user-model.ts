import { ReligiousCenterModel } from "./religious-center-model";

export interface UserModel {
    id: number;
    email: string;
    name: string;
    isAdmin: boolean;
    belongingReligiousCenters: ReligiousCenterModel[];
}