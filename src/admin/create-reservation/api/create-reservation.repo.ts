export interface NewReservationByAdminRepository {
  activateUserByAdmin(userId: string): Promise<void>;
}
