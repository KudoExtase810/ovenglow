import Link from "next/link";
import { useEffect, useState } from "react";
import Map, { FullscreenControl, GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { MdLocationOn } from "react-icons/md";
import { toast } from "react-toastify";

interface props {
    locationName: string;
}

function LocateStore({ locationName }: props) {
    type coord = {
        latitude: number;
        longitude: number;
    };
    const [selectedPos, setSelectedPos] = useState<coord | undefined>();
    const [locationInfo, setLocationInfo] = useState<any>();

    // Used to change the state when the value is successfully updated in the backend
    const [currentLocation, setCurrentLocation] = useState(locationName);

    useEffect(() => {
        if (!navigator.geolocation)
            alert("GeoLocation feature is not supported in this browser");
    }, []);

    useEffect(() => {
        const getAddress = async () => {
            const API_KEY = process.env.NEXT_PUBLIC_TOMTOM_API_KEY;

            const lat = selectedPos?.latitude;
            const lon = selectedPos?.longitude;
            const URL = `https://api.tomtom.com/search/2/reverseGeocode/${lat},${lon}.json?key=${API_KEY}&radius=100`;
            //
            if (selectedPos) {
                const response = await axios.get(URL);
                if (!response.data.addresses[0]?.address)
                    return toast.error(
                        "The location you selected has no address."
                    );

                if (response.status >= 400)
                    return toast.error("Couldn't get that location.");

                setLocationInfo(response.data.addresses[0].address);
            }
        };
        getAddress();
    }, [selectedPos]);

    const handleSave = async () => {
        const URL = "/api/general/location";
        const response = await axios.patch(URL, {
            newLocation: {
                ...selectedPos,
                name: `${locationInfo?.country || "No country"}, ${
                    locationInfo?.freeformAddress || "No address"
                }`,
            },
        });
        if (response.status === 200) {
            toast.success("Your store's location has been saved successfully.");
            setCurrentLocation(
                `${locationInfo?.country || "No country"}, ${
                    locationInfo?.freeformAddress || "No address"
                }`
            );
        } else toast.error("Couldn't update the location, try again later..");
    };

    return (
        <section className="font-mulish pb-8">
            <div className="text-lg flex justify-center gap-8 max-xl:flex-col-reverse">
                <div className="w-full h-[420px] max-xl:h-[460px]">
                    <Map
                        onClick={(e) => {
                            const { lngLat } = e;
                            setSelectedPos({
                                latitude: lngLat.lat,
                                longitude: lngLat.lng,
                            });
                        }}
                        style={{
                            border: "1px solid rgb(212 212 216)",
                        }}
                        mapStyle={
                            (typeof window !== "undefined" &&
                                localStorage.getItem("mapbox-style")) ||
                            "mapbox://styles/mapbox/navigation-day-v1"
                        }
                        mapboxAccessToken={
                            process.env.NEXT_PUBLIC_MAPBOX_API_KEY
                        }
                        initialViewState={{ latitude: 28, longitude: 1.6 }}
                    >
                        <GeolocateControl />
                        <FullscreenControl />
                        {selectedPos && (
                            <Marker
                                longitude={selectedPos.longitude}
                                latitude={selectedPos.latitude}
                            >
                                <MdLocationOn
                                    size={56}
                                    className="text-red-600 mb-[56px]"
                                />
                            </Marker>
                        )}
                    </Map>
                </div>
                <div>
                    <h2 className="font-cormorant font-bold text-3xl text-zinc-950 mb-2 uppercase">
                        store location
                    </h2>
                    <p className="text-zinc-600 mb-3">
                        Select the location of your store in order to allow your
                        customers to see it in the{" "}
                        <Link href="/contact-us" className="text-blue-500">
                            contact us
                        </Link>{" "}
                        page.
                    </p>
                    <p className="text-zinc-600 my-3">
                        You can set the store's location manually by clicking on
                        the desired location on the map below. <br />
                        You can also use the button in the top-right corner to
                        jump to your <b>current position</b>.
                    </p>
                    <div>
                        <input
                            type="checkbox"
                            name="store_location"
                            id="at_store"
                            className="mr-1"
                            onChange={(e) => {
                                if (e.target.checked) {
                                    navigator.geolocation.getCurrentPosition(
                                        (position: GeolocationPosition) =>
                                            setSelectedPos({
                                                latitude:
                                                    position.coords.latitude,
                                                longitude:
                                                    position.coords.longitude,
                                            }),
                                        (error: GeolocationPositionError) =>
                                            alert(error),
                                        {
                                            enableHighAccuracy: true,
                                        }
                                    );
                                } else {
                                    setSelectedPos(undefined);
                                    setLocationInfo(undefined);
                                }
                            }}
                        />
                        <label htmlFor="at_store">
                            I am at the store right now, save me the trouble and
                            set my current location as the store's location.
                        </label>
                    </div>
                </div>
            </div>
            <div className="mx-auto w-fit">
                <h3 className="font-mulish text-xl font-bold my-6">
                    Current store location: {currentLocation}
                </h3>
                <h3 className="text-xl font-bold my-6">
                    Selected location:{" "}
                    {locationInfo
                        ? `${locationInfo?.country || "No country"}, ${
                              locationInfo?.freeformAddress || "No address"
                          }`
                        : "No location selected."}
                </h3>

                <button
                    className="text-zinc-50 bg-zinc-900 disabled:bg-gray-400 uppercase px-12 py-4 text-sm tracking-widest hover:bg-brown transition-colors duration-300 w-max block mx-auto"
                    onClick={() => {
                        if (!selectedPos) {
                            return toast.error("No location selected!");
                        }
                        if (
                            !locationInfo.country ||
                            !locationInfo.freeformAddress
                        ) {
                            return toast.error("This location has no address!");
                        }
                        handleSave();
                    }}
                    disabled={!selectedPos}
                >
                    save
                </button>
            </div>
        </section>
    );
}

export default LocateStore;
