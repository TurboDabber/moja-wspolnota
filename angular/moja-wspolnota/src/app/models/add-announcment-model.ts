import { ReligiousCenterModel } from "./religious-center-model";
import { UserModel } from "./user-model";

export interface AddAnnouncmentModel {
    religious_center_id: number;
    user_id: number;
    announcment: string;
}