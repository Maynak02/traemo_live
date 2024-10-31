"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import CommonBlock from "@/components/styles/ryder.style";
import Header from "@/components/styles/ryderHeader.style";
import Select from "react-select";
import { API_ROUTER } from "@/services/apiRouter";
import { axiosGet } from "@/services/axiosHelper";
import { GetHubByIdService } from "@/services/riderService";
import { PATH_DASHBOARD, RIDER } from "@/routes/paths";
import { useRouter } from "next/navigation";
import ProfilePopover from "@/components/common/ProfilePopover";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { CloseIcon } from "@/assets/svgs";
import moment from "moment";
import "moment/locale/de";
import { shiftDataState } from "@/redux/ShiftData/ShiftReducer";
import { toast } from "react-toastify";
import { getAddressFromObj } from "@/utils/globalFunctions";
import Loader from "@/components/Loader";
import { setCurrentView } from "@/redux/Auth/AuthSlice";

const PreShiftView = () => {
    const { t, i18n } = useTranslation("common");
    moment.locale(i18n.language || "de");
    const dispatch = useDispatch();
    const { shiftObjData: shiftObj } = useSelector(shiftDataState);
    const [hubData, setHubData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [address, setAddress] = useState("");

    const shiftTime = shiftObj?.ts_start_planned; // "2024-10-24T13:54:00Z";
    const formattedTime = moment(shiftTime)
        .locale(i18n.language || "de")
        .format(i18n.language === "de" ? "H:mm [Uhr]" : "h:mm A");
    // console.log("shiftObj", shiftObj);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const { push } = useRouter();
    const getHubById = async (shiftId) => {
        try {
            setIsLoading(true);
            const { status, data } = await GetHubByIdService(shiftId);
            // console.log("data-->", data);

            if (status) {
                setHubData(data);
                let address = getAddressFromObj(data?.address);
                setAddress(address);
            } else {
                toast.error(t("SomethingWentWrong"));
            }
        } catch (error) {
            console.error("Error fetching shifts:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!shiftObj?.hub_id) return;
        getHubById(shiftObj?.hub_id);
    }, [shiftObj?.hub_id]);

    useEffect(() => {
        const interval = setInterval(() => {
            const isAllow = isAllowedToPunchIn(shiftTime);
            setIsButtonEnabled(isAllow);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const isAllowedToPunchIn = (startTime) => {
        const currentTime = new Date().toISOString();
        const targetPunchTime = new Date(startTime);
        const allowedTime = new Date(
            targetPunchTime.getTime() - 10 * 60 * 1000,
        ).toISOString();
        return currentTime >= allowedTime;
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <CommonBlock>
            <Header>
                <div className="header-block">
                    <div className="header-block-left">
                        <div
                            className="error-block"
                            onClick={() => push(PATH_DASHBOARD.rider.errors)}
                        >
                            <img src="/error-img.png" />
                            <span>{t("errors")}</span>
                        </div>
                    </div>
                    <div className="header-block-right">
                        <ProfilePopover />
                    </div>
                </div>
            </Header>
            <div className="common-block-ryder">
                <div className="shift-common-block">
                    <div className="shift-common-time">
                        <h2>{t("startOfShift")}</h2>
                        {formattedTime ? <span>{formattedTime}</span> : ""}
                    </div>
                    <div className="shift-location">
                        <p>{address}</p>
                        <div className="shift-location-link">
                            <img src="/map-pin.svg" />
                            <img src="/arrow-drop.svg" />
                        </div>
                    </div>
                    <div
                        className={`btn-block-shift ${isButtonEnabled ? "checked" : ""}`}
                    >
                        <button
                            disabled={!isButtonEnabled}
                            onClick={
                                () => dispatch(setCurrentView(RIDER.TO_DO))
                                // push(PATH_DASHBOARD.rider.preShiftsIdle)
                            }
                        >
                            <img src="/timer-button.svg" />
                            <span>{t("shiftBegin")}</span>
                        </button>
                    </div>
                </div>
            </div>
        </CommonBlock>
    );
};

export default PreShiftView;
