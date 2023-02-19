import { ReligiousCenterModel } from "./religious-center-model";
import { UserModel } from "./user-model";

export interface ReviewModel {
    id: number;
    religiousCenter: ReligiousCenterModel;
    mark: number;
    review_text: string;
    user_name: string;
    user_id: number;
}