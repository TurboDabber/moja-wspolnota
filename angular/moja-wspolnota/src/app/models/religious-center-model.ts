import { AnnouncementModel } from "./announcement-model";
import { ReligionTypeModel } from "./religion-type-model";
import { ReviewModel } from "./review-model";
import { UserModel } from "./user-model";

export interface ReligiousCenterModel {
    id: number;
    name: string;
    lat: number;
    lng: number;
    user_name: string;
    user_id: number;
    desc: string;
    image: string;
    religion_type_id: number;
    type_name: string;
}