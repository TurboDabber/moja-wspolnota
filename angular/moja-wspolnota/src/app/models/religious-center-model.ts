import { AnnouncementModel } from "./announcement-model";
import { ReligionTypeModel } from "./religion-type-model";
import { ReviewModel } from "./review-model";
import { UserModel } from "./user-model";

export interface ReligiousCenterModel {
    id: number;
    name: string;
    lat: number;
    lng: number;
    Owner: UserModel;
    description: string;
    image: string;
    religionType: ReligionTypeModel;
    announcements: AnnouncementModel[] | undefined;
    reviews: ReviewModel[] | undefined;
}