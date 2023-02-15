import { ReligiousCenterModel } from "./religious-center-model";

export interface AnnouncementModel {
    id: number;
    religiousCenter: ReligiousCenterModel;
    announcement: string;
}