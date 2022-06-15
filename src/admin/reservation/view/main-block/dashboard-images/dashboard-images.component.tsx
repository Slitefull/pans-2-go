import React from "react";
import { observer } from "mobx-react";
import { ReservationService } from "@/common/reservation/domain/reservation.service";
import { injector } from "@/common/injector/Injector";
import { RESERVATION_SERVICE } from "@/common/injector/constants";
import { ImagePreview } from "@/ui-kit/components/files-dropzone-uploader/files-dropzone-uploader.component";
import CameraIcon from "@/ui-kit/components/camera-icon/camera-icon.component";
import { dateConvert } from "@/common/helpers/date.convert.helper";
import { mergeDateTime } from "@/common/helpers/mergeDateTime";
import "./dashboard-images.styles.scss";

//const mergeDateTime = require("@/common/helpers/mergeDateTime");


const DashboardImages = observer(() => {
  const reservationService: ReservationService = injector.get(RESERVATION_SERVICE);

  const startImage = reservationService?.startTripImage?.imageUrl;
  const endImage = reservationService?.endTripImage?.imageUrl;

  return (
    <div className="dashboard-image">
      <div className="dashboard-image__block">
        <div className="dashboard-image__avatar">
          {startImage ? (
            // <img
            //     width={350}
            //     height={350}
            //     src={`https://wheels2go-dev.s3.us-west-2.amazonaws.com/${startImage}`}
            //     alt=""
            // />
            <ImagePreview
              image={`https://wheels2go-dev.s3.us-west-2.amazonaws.com/${startImage}`}
            />
          ) : (
            <div className="dashboard-image__avatar_icon">
              <CameraIcon color="gray" size={20}/>
            </div>
          )}
          {}
        </div>
        <p>{startImage ? dateConvert(new Date(mergeDateTime(reservationService.pickUpDate, reservationService.pickUpTime))) : null}</p>
      </div>

      <div className="dashboard-image__block">
        <div className="dashboard-image__avatar">
          {endImage ? (
            // <img
            //     width={350}
            //     height={350}
            //     src={`https://wheels2go-dev.s3.us-west-2.amazonaws.com/${endImage}`}
            //     alt=""
            // />
            <ImagePreview
              image={`https://wheels2go-dev.s3.us-west-2.amazonaws.com/${endImage}`}
            />
          ) : (
            <div className="dashboard-image__avatar_icon">
              <CameraIcon color="gray" size={20}/>
            </div>
          )}
          {}
        </div>
        <p>{endImage ? dateConvert(new Date(mergeDateTime(reservationService.dropOffDate, reservationService.dropOffTime))) : null}</p>
      </div>
    </div>
  )
});

export default DashboardImages;
