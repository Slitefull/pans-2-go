import React, { FC, useMemo } from "react";
import cn from "classnames";

import { RoundButton } from "@/ui-kit/components/round-button/round-button.component";

import defaultAvatar from "../../images/default-avatar.svg";

import "./avatar.styles.scss";


export enum AvatarStatus {
  ONLINE = "ONLINE",
  WAS_ONLINE = "WAS_ONLINE",
  AWAY = "AWAY",
}

export interface AvatarProps {
  className?: string;
  alt: string;
  image?: string | File;
  size: number;
  status?: AvatarStatus;
  statusPosition?: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
  onEdit?: () => void;
  skeleton?: boolean;
}

export const Avatar: FC<AvatarProps> = (props) => {
  const size = { width: props.size, height: props.size };
  const rootClassNames = cn("avatar", props.className);
  const statusClassNames = cn("avatar__status", {
    avatar__status_wasOnline: props.status === AvatarStatus.WAS_ONLINE,
    avatar__status_away: props.status === AvatarStatus.AWAY,
    avatar__status_hidden: !props.status,
  });
  const imageUrl = useMemo(() => {
    if (props.image) {
      return typeof props.image === "string"
        ? props.image
        : URL.createObjectURL(props.image);
    }

    return defaultAvatar;
  }, [props.image]);

  return (
    <div className={rootClassNames} style={size}>
      <img
        src={imageUrl}
        className="avatar__image"
        style={size}
        alt={props.alt}
      />
      <div className={statusClassNames} style={props.statusPosition}/>
      <div
        className={cn("avatar__overlay", {
          avatar__overlay_skeleton: props.skeleton,
        })}
      />
      {props.onEdit && !props.skeleton && (
        <RoundButton
          className="avatar__editButton"
          onClick={props.onEdit}
          name="pencil"
          marketplug
        />
      )}
    </div>
  );
};
