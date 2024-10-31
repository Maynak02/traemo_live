"use client";

import React, { useEffect, useMemo, useState } from "react";

import Loader from "@/components/Loader";

import { useRiderDelivery } from "@/context/rider-delivery-context";

import MapView from "./map-view";
import ProductView from "./product-view";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { PATH_DASHBOARD } from "@/routes/paths";

const DeliveryView = () => {
    // ** Hooks
    const { isOrdersLoading, currentView, isOrderExist, markShiftAsCompleted } =
        useRiderDelivery();
    const { t } = useTranslation("common");
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowButton(true);
        }, 6 * 1000);
        return () => clearTimeout(timer);
    }, []);

    // ** Renders
    const renderCurrentView = useMemo(() => {
        switch (currentView) {
            case "map":
                return <MapView />;
            case "productView":
                return <ProductView />;
            default:
                return null;
        }
    }, [currentView]);

    // ** Returns
    if (isOrdersLoading || isOrderExist === null) return <Loader />;

    if (isOrderExist === false)
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="flex flex-col items-center">
                    <p className="text-center text-lg text-gray-700 p-4">
                        {t("noOrdersForDelivery")}
                    </p>
                    {showButton && (
                        <button
                            onClick={() => markShiftAsCompleted()}
                            className="bg-transparent hover:bg-yellow-400 text-yellow-400 font-semibold hover:text-white py-2 px-4 border border-yellow-400 hover:border-transparent rounded mt-5"
                        >
                            {t("MarkAsCompleted")}
                        </button>
                    )}
                </div>
            </div>
        );

    return <>{renderCurrentView}</>;
};

export default DeliveryView;
