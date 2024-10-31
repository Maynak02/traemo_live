"use client";
import Loader from "@/components/Loader";
import {
    resetNextCurrentOrderIndex,
    setCurrentView,
    setRouteDirection,
} from "@/redux/Auth/AuthSlice";
import { shiftDataState } from "@/redux/ShiftData/ShiftReducer";
import { API_ROUTER } from "@/services/apiRouter";
import { axiosGet } from "@/services/axiosHelper";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ShiftCommissioningMain from "../picking/shift-commissioning-main";
import ShiftCommissioningProblem from "../picking/shift-commissiong-problem";
import ScanBag from "../picking/scan-bag";
import { RIDER } from "@/routes/paths";

const ShiftCommissioningView = () => {
    const { shiftObjData: currentShiftData } = useSelector(shiftDataState);
    const dispatch = useDispatch();
    const { t } = useTranslation("common");
    const [routesLoading, setRoutesLoading] = useState(true);
    const [currentCommissioningView, setCurrentCommissioningView] =
        useState("MAIN"); // ["MAIN", "PROBLEM", "SCAN-BAG"]

    const fetchRoutes = async (routeId) => {
        if (!routeId) return;
        try {
            const index = 0;
            setRoutesLoading(true);
            // let payload = {
            //     offset: 0,
            //     limit: 10,
            // };
            // const { data, status } = await axiosGet(
            //     API_ROUTER.GET_ROUTES,
            //     payload,
            // );
            const { data, status } = await axiosGet(
                API_ROUTER.GET_ROUTES_BY_ID(routeId),
            );
            if (status) {
                if (!data?.directions?.length) {
                    toast.error(t("NoRoutesFound"));
                    dispatch(setCurrentView(RIDER.CALENDER));
                }
                const directions =
                    Array.isArray(data) && data.length > 0
                        ? data[index]?.directions
                        : data?.directions || [];
                if (directions) {
                    const updatedDirections = directions?.map((direction) => ({
                        ...direction,
                        isPicked: false,
                        orderDetails: null,
                        isChecked: false,
                        isSolveLater: false,
                    }));
                    dispatch(
                        setRouteDirection({ directions, updatedDirections }),
                    );
                }
                closeLoader();
            } else {
                closeLoader();
                toast.error(t("SomethingWentWrong"));
            }
        } catch (error) {
            console.error("Error fetching routes:", error);
        }
    };

    const closeLoader = () => {
        setTimeout(() => {
            setRoutesLoading(false);
        }, 300);
    };

    useEffect(() => {
        if (currentShiftData?.route_id) {
            fetchRoutes(currentShiftData?.route_id);
        }
    }, [currentShiftData?.route_id]);

    const renderCurrentView = useMemo(() => {
        switch (currentCommissioningView) {
            case "MAIN":
                return (
                    <ShiftCommissioningMain
                        setCurrentCommissioningView={
                            setCurrentCommissioningView
                        }
                    />
                );
            case "PROBLEM":
                return (
                    <ShiftCommissioningProblem
                        setCurrentCommissioningView={
                            setCurrentCommissioningView
                        }
                    />
                );
            case "SCAN-BAG":
                return (
                    <ScanBag
                        setCurrentCommissioningView={
                            setCurrentCommissioningView
                        }
                    />
                );
            default:
                null;
        }
    }, [currentCommissioningView]);

    if (routesLoading) {
        return <Loader />;
    }

    return <>{renderCurrentView}</>;
};

export default ShiftCommissioningView;
