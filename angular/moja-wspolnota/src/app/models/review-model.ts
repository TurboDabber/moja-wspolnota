import { ReligiousCenterModel } from "./religious-center-model";
import { UserModel } from "./user-model";

export interface ReviewModel {
    id: number;
    user: UserModel;
    religiousCenter: ReligiousCenterModel;
    mark: number;
    review: string;
}