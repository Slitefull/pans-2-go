import {BodyTypes} from "@/common/constants/bodyTypes";
import {UserRoles} from "@/common/constants/roles";

export interface Reservation {
    id: string,
    rentTypePick: string,
    carType: BodyTypes,
    user: User,
    pickupDateTime: string,
    dropOffDateTime: string,
    additionalRequest: Array<string>,
    price: number,
    totalPrice: number,
    paymentStatus: string
}

interface User {
    id: string,
    email: string,
    isActive: boolean,
    role: UserRoles,
    firstName: string,
    lastName: string,
    mobilePhone: string,
    whatsAppPhone: string,
    emergencyPhone: string,
    prefix: string,
    address: string,
    state: string,
    zip: string,
    notificationType: string,
    media: Media,
}

interface Media {
    id: string,
    imageUrl: string,
    thumbnailUrl: string,
    type: string,
}
