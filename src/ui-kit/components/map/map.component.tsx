import React, { FC, useCallback, useState } from "react";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from "react-google-maps";

interface MapWrapperProps {
  defaultZoom?: number;
  defaultCenter: DefaultCenterCoordinate;
  markers?: Array<Coordinate>;
}

interface DefaultCenterCoordinate {
  lat: number;
  lng: number;
}

interface Coordinate {
  latitude: number;
  longitude: number;
}

const MapWrapper: FC<MapWrapperProps> = ({
  defaultZoom,
  defaultCenter,
  markers,
}): JSX.Element => {
  const [center, setCenter] = useState<DefaultCenterCoordinate>(defaultCenter);
  const [zoom, setZoom] = useState<number>(10);

  const onMarkerClickHandler = useCallback(
    (marker) => {
      setCenter({
        lat: marker.latLng.lat(),
        lng: marker.latLng.lng(),
      });
      setZoom(15);
    },
    [setCenter]
  );

  return (
    <GoogleMap
      defaultZoom={defaultZoom || 10}
      defaultCenter={defaultCenter}
      center={center}
      zoom={zoom}
      onZoomChanged={()=> setZoom(10)}
    >
      {markers?.map((marker) => (
        <Marker
          position={{
            lat: marker.latitude,
            lng: marker.longitude,
          }}
          onClick={(marker) => onMarkerClickHandler(marker)}
        />
      ))}
    </GoogleMap>
  );
};

export const Map = withScriptjs(withGoogleMap(MapWrapper));
