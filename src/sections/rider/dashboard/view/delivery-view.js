"use client";

import React from "react";
import RiderDeliveryProvider from "@/context/rider-delivery-context";
import DeliveryView from "@/sections/rider/delivery/view/delivery-view";

const DeliveryMainView = () => {
    return (
        <RiderDeliveryProvider>
            <DeliveryView />
        </RiderDeliveryProvider>
    );
};

export default DeliveryMainView;
