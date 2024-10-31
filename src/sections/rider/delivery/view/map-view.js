"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import CommonBlock from "@/components/styles/ryder.style";
import useMapLoader from "@/hooks/useMapLoader";
import Loader from "@/components/Loader";
import { PATH_DASHBOARD } from "@/routes/paths";
import useGeoLocation from "@/hooks/useGeoLocation";
import DeliveryMap from "../DeliveryMap";
import { useTranslation } from "react-i18next";
import { useRiderDelivery } from "@/context/rider-delivery-context";
import { calculateDistance, getAddressFromObj } from "@/utils/globalFunctions";

const MapView = () => {
    const { currentOrder, onChangeView, currentIndex } = useRiderDelivery();

    // ** States
    const [isRideCompleted, setIsRideCompleted] = useState(false);
    const [destinationLocation, setDestinationLocation] = useState({
        lat: "",
        lng: "",
    });
    const [riderAddress, setRiderAddress] = useState("");
    const [destinationAddress, setDestinationAddress] = useState("");

    // ** Hooks
    const { isLoaded, error } = useMapLoader();
    const { push } = useRouter();
    const { t } = useTranslation("common");

    // ** Effects
    useEffect(() => {
        if (currentOrder?.orderDetails?.address) {
            setDestinationLocation({
                lng: currentOrder?.orderDetails?.address?.location?.coordinates?.at(
                    0,
                ),
                lat: currentOrder?.orderDetails?.address?.location?.coordinates?.at(
                    1,
                ),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex]);

    const {
        location: { coordinates, loaded },
        error: locationPermissionError,
    } = useGeoLocation();

    const isMapConfigLoading = useMemo(
        () => !isLoaded || !loaded,
        [isLoaded, loaded],
    );

    // ** Handlers
    const onRideCompleted = useCallback(() => setIsRideCompleted(true), []);

    const onConfirmRiderReachedAtDest = () => {
        onChangeView("productView"); // TODO: added for testing purpose
        return;

        if (destinationLocation?.lat && destinationLocation?.lng) {
            const distanceToDestination = calculateDistance(
                coordinates,
                destinationLocation,
            );

            if (distanceToDestination <= 0.0001) {
                onChangeView("productView");
            }
        }
    };

    if (error)
        return (
            <div className="flex flex-col items-center justify-center p-4 space-y-4">
                <p className="text-red-500 font-medium">{error}</p>
            </div>
        );

    if (locationPermissionError)
        return (
            <div className="flex flex-col items-center justify-center p-4 space-y-4">
                <p className="text-red-500 font-medium">
                    {locationPermissionError}
                </p>
            </div>
        );

    if (isMapConfigLoading) return <Loader />;

    return (
        <CommonBlock>
            <div className="map-block-location">
                {isRideCompleted ? (
                    <div>{t("destinationReachedSuccess")}</div>
                ) : (
                    coordinates?.lat &&
                    coordinates?.lng && (
                        <div className="map-block-location-map">
                            <DeliveryMap
                                riderLocation={coordinates}
                                destinationLocation={destinationLocation}
                                onRideCompleted={onRideCompleted}
                                setRiderAddress={setRiderAddress}
                                setDestinationAddress={setDestinationAddress}
                                riderAddress={riderAddress}
                                destinationAddress={destinationAddress}
                                isRideCompleted={isRideCompleted}
                            />
                        </div>
                    )
                )}
                <div className="map-block-location-bottom">
                    <div className="bottom-bar-target-top">
                        <p>{`${t("Order")}: ${currentOrder?.order_id}`}</p>
                        <div className="bottom-bar-block">
                            <img src="/map-pin.svg" alt="map-logo" />
                            <h4>
                                {currentOrder
                                    ? getAddressFromObj(
                                          currentOrder?.orderDetails?.address,
                                      )
                                    : destinationAddress}
                            </h4>
                        </div>
                    </div>
                    <div className="bottom-bar-target">
                        <div
                            className="error-block"
                            onClick={() => push(PATH_DASHBOARD.rider.errors)}
                        >
                            <img src="/error-img.png" alt="error-logo" />
                            <span>{t("errors")}</span>
                        </div>
                        <div className="btn-target">
                            <button
                                // disabled={!isRideCompleted} // TODO: commented for testing purpose
                                onClick={onConfirmRiderReachedAtDest}
                            >
                                {t("atTheDestination")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </CommonBlock>
    );
};

export default MapView;
