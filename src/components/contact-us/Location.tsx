import { distance, point } from "@turf/turf";
import Map, {
    FullscreenControl,
    GeolocateControl,
    Marker,
    NavigationControl,
} from "react-map-gl"; // long, lati same with turf
import "mapbox-gl/dist/mapbox-gl.css";
import { MdLocationOn } from "react-icons/md";
import { useEffect, useState } from "react";

interface props {
    location: {
        latitude: number;
        longitude: number;
        name: string;
    };
}

function Location({ location }: props) {
    const [userLatitude, setUserLatitude] = useState<number>();
    const [userLongitude, setUserLongitude] = useState<number>();
    const [dist, setDist] = useState<number>();

    const getUserLocation = () => {
        if (!navigator.geolocation)
            return alert(
                "GeoLocation feature is not supported in this browser"
            );
        //------------------------------------------------------------//
        navigator.geolocation.getCurrentPosition(success, error, {
            enableHighAccuracy: true,
        });
        function success(pos: GeolocationPosition) {
            const { latitude, longitude } = pos.coords;
            setUserLatitude(latitude);
            setUserLongitude(longitude);
        }
        function error(error: GeolocationPositionError) {
            switch (error.code) {
                case 1:
                    alert(
                        "You've denied access to your location. Try refreshing the page or clearing your settings."
                    );
                    break;
                case 2:
                    alert("Position unavailable.");
                    break;
                case 3:
                    alert(
                        "You took too long to provide access to your location."
                    );
                    break;
            }
        }
    };

    //distance between the user and the store
    const calcDistance = () => {
        const storePoint = point([location.longitude, location.latitude]);
        const userPoint = point([userLongitude!, userLatitude!]);
        const dist = distance(userPoint, storePoint, {
            units: "kilometers",
        });
        setDist(dist);
    };

    useEffect(() => {
        if (userLatitude && userLongitude) {
            calcDistance();
        }
    }, [userLongitude]);

    return (
        <section>
            <h2 className="font-cormorant font-semibold text-4xl text-zinc-950 mb-6 uppercase mx-auto w-fit mt-8">
                our location
            </h2>
            <div className="mb-12">
                {/* different map styles can be obtained from here: https://docs.mapbox.com/api/maps/styles/ */}
                <Map
                    initialViewState={{
                        longitude: location.latitude,
                        latitude: location.longitude,
                        zoom: 2,
                    }}
                    style={{
                        width: "100%",
                        height: "600px",
                        border: "1px solid rgb(212 212 216)",
                    }}
                    mapStyle="mapbox://styles/mapbox/navigation-day-v1"
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
                >
                    <Marker
                        longitude={location.longitude}
                        latitude={location.latitude}
                    >
                        <MdLocationOn
                            size={56}
                            className="text-red-600 mb-[56px] animate-bounce"
                        />
                    </Marker>
                    <NavigationControl />
                    <GeolocateControl />
                    <FullscreenControl />
                </Map>
                {dist || dist === 0 ? (
                    <div className="font-mulish text-xl mt-2 text-zinc-900">
                        {dist >= 2 ? (
                            <span>
                                You're <b>{dist.toFixed(2)}</b> kilometers away
                                from us.
                            </span>
                        ) : (
                            <span>
                                You're <b>{(dist * 1000).toFixed(2)}</b> meters
                                away from us.
                            </span>
                        )}
                    </div>
                ) : (
                    <button
                        className="font-mulish text-xl max-sm:text-lg mt-2 text-zinc-900 hover:text-red-500 underline text-start"
                        onClick={() => {
                            getUserLocation();
                        }}
                    >
                        Calculate the distance between your position and us
                    </button>
                )}
            </div>
        </section>
    );
}

export default Location;
