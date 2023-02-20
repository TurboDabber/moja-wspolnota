import { ReligiousCenterModel } from "./religious-center-model";

export interface AnnouncementModel {
    id: number;
    religious_center_id: number,
    user_id: number,
    announcment: string,
    date : string,
    user_name : string
}
