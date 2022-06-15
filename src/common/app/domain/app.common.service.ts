import { UserRoles } from "@/common/constants/roles";


export interface BaseAppService {
  currentApp: UserRoles | "";
  isLoading: boolean;
  isOverlay: boolean;
}
