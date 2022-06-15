import {
  DefaultBehaviourBody,
  DomainErrorTree,
} from "@/infrastructure/exception/exception.repo";
import {
  PASSWORD_RESET_TOKEN_INVALID,
  SECURITY_DOMAIN,
} from "@/infrastructure/exception/constants/security.domain";
import {
  USER_ABOUT_IS_TOO_LONG,
  USER_DOMAIN,
  USER_STATUS_TOO_LONG,
} from "@/infrastructure/exception/constants/user.domain";
import {
  DELETE_POST_PERMISSION_DENIED,
  POST_IS_TOO_LONG,
  POST_NOT_FOUND,
  SOCIAL_DOMAIN,
} from "@/infrastructure/exception/constants/social.domain";

const data: DomainErrorTree<DefaultBehaviourBody> = {
  [SECURITY_DOMAIN]: {
    [PASSWORD_RESET_TOKEN_INVALID]: "exception.password_reset_link_is_broken",
  },
  [USER_DOMAIN]: {
    [USER_STATUS_TOO_LONG]: "exception.user_status_too_long",
    [USER_ABOUT_IS_TOO_LONG]: "exception.user_about_is_too_long",
  },
  [SOCIAL_DOMAIN]: {
    [POST_NOT_FOUND]: {
      title: "exception.post_not_found.title",
      message: "exception.post_not_found.message",
    },
    [DELETE_POST_PERMISSION_DENIED]: {
      title: "exception.no_access_to_delete.title",
      message: "exception.no_access_to_delete.message",
    },
    [POST_IS_TOO_LONG]: "exception.post_is_too_long",
  },
};

export default data;
