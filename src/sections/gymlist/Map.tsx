import { useLoadScript, GoogleMap, Circle } from "@react-google-maps/api";
import { useState, useEffect, useMemo } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import { GOOGLE_MAP_API_KEY } from "../../config";
import { Location } from "../../types";
import { defaultLocation, defaultRadius } from "../../constants";
import { Card } from "@mui/material";

const cirlceOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: true,
    draggable: true,
    editable: true,
    visible: true,
    radius: defaultRadius,
    zIndex: 1,
}

export default function Map({ setCenter, setRadius, location, myLocation }: { setCenter: (c: Location) => void, setRadius: (r: number) => void, location: Location, myLocation: Location | null}) {

    const { isLoaded, loadError } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAP_API_KEY,
        language: 'ja',
        region: 'ja',
        // ...otherOptions
    })
    const [circle, setCircle] = useState<google.maps.Circle | null>(null)
    const center = useMemo<Location>(() => {
        if (myLocation) return myLocation
        return location
    }, [myLocation])
    return (
        <Card>
            {loadError ? <>Load error</> :
                isLoaded ?
                    <GoogleMap
                        mapContainerStyle={{ width: "100%", height: "600px" }}
                        center={center}
                        zoom={8}
                    >
                        <Circle
                            center={center}
                            options={cirlceOptions}
                            onLoad={(circleInstance) => setCircle(circleInstance)}
                            onCenterChanged={() => {
                                if (circle) {
                                    const result = circle.getCenter()!
                                    setCenter({ lat: result.lat(), lng: result.lng() })
                                }
                            }}
                            onRadiusChanged={() => {
                                if (circle) {
                                    setRadius(circle.getRadius())
                                }
                            }}
                        />
                    </GoogleMap>
                    :
                    <LoadingScreen />}
        </Card>)
}