import i18next from "i18next";
import { action, makeAutoObservable } from "mobx";
import { injector } from "@/common/injector/Injector";
import { SessionUserRepository, UpdateProfileValues } from "@/common/session-user/api/session-user.repo";
import { NotificationService } from "@/infrastructure/notification/notification.service";
import { AuthService } from "@/common/auth/domain/auth.service";
import { SessionUserDto } from "@/common/session-user/api/dto/session-user.dto";
import { CreateMediaByBase64Values, Media, MediaRepository } from "@/common/media/api/media.repo";
import { Payment } from "@/common/auth/api/dto/auth.dto";
import {
  BaseSessionUserService,
  SessionUserPayment,
  UserDriverLicence
} from "@/common/session-user/domain/session-user.common.repo";
import {
  AUTH_SERVICE,
  MEDIA_REPOSITORY,
  NOTIFICATION_SERVICE,
  SESSION_USER_REPOSITORY
} from "@/common/injector/constants";


export class SessionUserService implements BaseSessionUserService {
  private _id: string;
  private _prefix: string;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _mobilePhone: string;
  private _whatsAppPhone: string;
  private _emergencyPhone: string;
  private _address: string;
  private _state: string;
  private _zip: string;
  private _role: string;
  private _notificationType: string;
  private _isActive: boolean;
  private _media: Media;
  private _payment: SessionUserPayment;
  private _createdProfileImage: Array<Media>;
  private _createdDriverLicences: Array<Media>;
  private _driverLicence: UserDriverLicence | null;

  constructor() {
    this._id = '';
    this._prefix = '';
    this._firstName = '';
    this._lastName = '';
    this._email = '';
    this._mobilePhone = '';
    this._whatsAppPhone = '';
    this._emergencyPhone = '';
    this._address = '';
    this._state = '';
    this._zip = '';
    this._role = '';
    this._notificationType = '';
    this._isActive = false;
    this._createdProfileImage = [];
    this._createdDriverLicences = [];
    this._driverLicence = null;
    this._media = {
      id: '',
      imageUrl: '',
      thumbnailUrl: '',
      type: '',
    };
    this._payment = {
      billingZipCode: '',
      cardNumbers: '',
      cardType: '',
      cardholderName: '',
      expDate: '',
      id: '',
      rentalDamageCover: '',
    }

    makeAutoObservable(this);
  }

  @action
  public async createProfileImage(
    values: Array<CreateMediaByBase64Values>
  ): Promise<void> {
    try {
      const { data: createdMediaIds } = await this._mediaRepo.createMediaByBase64(values);
      this._createdProfileImage = createdMediaIds;
      this._notificationService.notify({
        message: i18next.t("admin.mediaUploaded"),
        status: "success",
      })
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async createDriverLicenceImage(
    values: Array<CreateMediaByBase64Values>
  ): Promise<void> {
    try {
      const { data: createdMediaIds } = await this._mediaRepo.createMediaByBase64(values);
      this._createdDriverLicences = [...this._createdDriverLicences, ...createdMediaIds];
      this._notificationService.notify({
        message: i18next.t("admin.mediaUploaded"),
        status: "success",
      })
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async attachUserPayment(paymentMethodId: string): Promise<void> {
    try {
      await this._sessionUserRepo.attachUserPayment(paymentMethodId);
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async updatePayment(values: Payment): Promise<void> {
    try {
      await this._sessionUserRepo.updatePayment(values);
      await this._authService.getMe();
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async updateProfile(values: UpdateProfileValues): Promise<void> {
    try {
      await this._sessionUserRepo.updateProfile(values);
      await this._authService.getMe();
      this._notificationService.notify({
        message: i18next.t("sessionUser.userHasBeenSuccessfullyUpdated"),
        status: "success",
      });
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
      this._createdDriverLicences = [];
    }
  }

  @action
  public async deleteUserAvatar(avatarId: string): Promise<void> {
    try {
      await this._sessionUserRepo.deleteUserAvatar(avatarId);
      await this._authService.getMe();
      this._notificationService.notify({
        message: i18next.t("sessionUser.avatarHasBeenRemovedSuccessfully"),
        status: "success",
      });
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  public async deleteUserDriverLicence(mediaIds: Array<string>): Promise<void> {
    try {
      await this._sessionUserRepo.deleteUserDriverLicence(mediaIds);
      this._createdDriverLicences = [];
      await this._authService.getMe();
      this._notificationService.notify({
        message: i18next.t("Driver licence medias has been deleted!"),
        status: "success",
      });
    } catch (e) {
      this._notificationService.notify({
        message: (e as any).response.data.description,
        status: "error",
      })
    }
  }

  @action
  fillFields(data: SessionUserDto): void {
    this._id = data.id;
    this._prefix = data.prefix;
    this._firstName = data.firstName;
    this._lastName = data.lastName;
    this._email = data.email;
    this._mobilePhone = data.mobilePhone;
    this._whatsAppPhone = data.whatsAppPhone;
    this._emergencyPhone = data.emergencyPhone;
    this._address = data.address;
    this._state = data.state;
    this._zip = data.zip;
    this._role = data.role;
    this._notificationType = data.notificationType;
    this._media = data.media;
    this._payment = data.payment;
    this._isActive = data.isActive;
    this._driverLicence = data.driverLicence;
  }

  @action
  reset(): void {
    this._id = '';
    this._prefix = '';
    this._firstName = '';
    this._lastName = '';
    this._email = '';
    this._mobilePhone = '';
    this._whatsAppPhone = '';
    this._emergencyPhone = '';
    this._address = '';
    this._state = '';
    this._zip = '';
    this._role = '';
    this._notificationType = '';
    this._media = {
      id: '',
      imageUrl: '',
      thumbnailUrl: '',
      type: '',
    };
    this._driverLicence = {
      DOB: '',
      expDate: '',
      issueDate: '',
      licenceNumber: '',
      medias: [{
        id: '',
        imageUrl: '',
        thumbnailUrl: '',
        type: '',
      }],
    };
  }

  get id(): string {
    return this._id;
  }

  get zip(): string {
    return this._zip;
  }

  get notificationType(): string {
    return this._notificationType;
  }

  get state(): string {
    return this._state;
  }

  get address(): string {
    return this._address;
  }

  set notificationType(value: string) {
    this._notificationType = value;
  }

  get emergencyPhone(): string {
    return this._emergencyPhone;
  }

  get whatsAppPhone(): string {
    return this._whatsAppPhone;
  }

  get mobilePhone(): string {
    return this._mobilePhone;
  }

  get email(): string {
    return this._email;
  }

  get lastName(): string {
    return this._lastName;
  }

  get firstName(): string {
    return this._firstName;
  }

  get media(): Media {
    return this._media;
  }

  get role(): string {
    return this._role;
  }

  get prefix(): string {
    return this._prefix;
  }

  get payment(): SessionUserPayment {
    return this._payment;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get driverLicence(): UserDriverLicence | null {
    return this._driverLicence;
  }

  get createdDriverLicences(): Array<Media> {
    return this._createdDriverLicences;
  }

  get createdProfileImage(): Array<Media> {
    return this._createdProfileImage;
  }

  set createdProfileImage(value: Array<Media>) {
    this._createdProfileImage = value;
  }

  set driverLicence(value: UserDriverLicence | null) {
    this._driverLicence = value;
  }

  set createdDriverLicences(value: Array<Media>) {
    this._createdDriverLicences = value;
  }

  set isActive(value: boolean) {
    this._isActive = value;
  }

  set payment(value: SessionUserPayment) {
    this._payment = value;
  }

  set prefix(value: string) {
    this._prefix = value;
  }

  set role(value: string) {
    this._role = value;
  }

  set id(value: string) {
    this._id = value;
  }

  set zip(value: string) {
    this._zip = value;
  }

  set state(value: string) {
    this._state = value;
  }

  set address(value: string) {
    this._address = value;
  }

  set emergencyPhone(value: string) {
    this._emergencyPhone = value;
  }

  set whatsAppPhone(value: string) {
    this._whatsAppPhone = value;
  }

  set mobilePhone(value: string) {
    this._mobilePhone = value;
  }

  set email(value: string) {
    this._email = value;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  set media(value: Media) {
    this._media = value;
  }

  private get _authService() {
    return injector.get<AuthService>(AUTH_SERVICE);
  }

  private get _mediaRepo() {
    return injector.get<MediaRepository>(MEDIA_REPOSITORY);
  }

  private get _notificationService() {
    return injector.get<NotificationService>(NOTIFICATION_SERVICE);
  }

  private get _sessionUserRepo() {
    return injector.get<SessionUserRepository>(SESSION_USER_REPOSITORY);
  }
}
