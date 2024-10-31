/** @format */

"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import CommonBlock from "@/components/styles/ryder.style";
import Header from "@/components/styles/ryderHeader.style";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { GetToDoTaskService, PutShiftsID } from "@/services/riderService";
import Loader from "@/components/Loader";
import { PATH_DASHBOARD, RIDER } from "@/routes/paths";
import ProfilePopover from "@/components/common/ProfilePopover";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { SHIFT_STATUS, TO_DO_STATUS } from "@/constants/keywords";
import {
    setShiftObjData,
    shiftDataState,
} from "@/redux/ShiftData/ShiftReducer";
import { UpdateShiftByIdService } from "@/services/hubManagerServices ";
import { toast } from "react-toastify";
import {
    resetNextCurrentOrderIndex,
    setCurrentView,
} from "@/redux/Auth/AuthSlice";
import ToDoTimer from "@/components/rider/ToDoTimer";

const PreShiftIdleView = () => {
    const [todoTaskList, setTodoTaskList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { push } = useRouter();
    const dispatch = useDispatch();
    const { t } = useTranslation("common");
    const { shiftObjData: currentShiftData } = useSelector(shiftDataState);

    const shiftTime = currentShiftData?.ts_start_planned;
    const shiftStatus = currentShiftData?.status;

    const isPicked = useMemo(
        () => shiftStatus === SHIFT_STATUS.ACTIVE_PICKED,
        [shiftStatus],
    );

    useEffect(() => {
        if (!currentShiftData?.id || shiftStatus !== SHIFT_STATUS.ACCEPTED)
            return;
        updateShiftStatus();
    }, [currentShiftData?.id]);

    useEffect(() => {
        dispatch(resetNextCurrentOrderIndex());
        getToDoTask();
    }, []);

    useEffect(() => {
        if (!currentShiftData.id) return;
    }, [currentShiftData]);

    const updateShiftStatus = async () => {
        if (!currentShiftData?.id) return;
        const payload = {
            id: currentShiftData?.id,
            data: {
                // ts_start: new Date().toISOString(),
                status: SHIFT_STATUS.ACTIVE_IDLE,
            },
        };
        const { status, data } = await UpdateShiftByIdService(payload);
        if (status) {
            toast.success(t("ShiftUpdatedSuccessfully"));
            dispatch(
                setShiftObjData({
                    ...currentShiftData,
                    ...data,
                }),
            );
        } else {
            toast.error(t("SomethingWentWrong"));
            setIsLoading(false);
        }
    };

    const getToDoTask = async () => {
        const task = isPicked
            ? TO_DO_STATUS.PRE_DELIVERING
            : TO_DO_STATUS.PRE_PICKING;
        try {
            setIsLoading(true);
            const { status, data } = await GetToDoTaskService(task);

            if (status && data) {
                const updatedData = data?.map((item, index) => ({
                    ...item,
                    id: index + 1,
                    checked: false,
                }));
                setTodoTaskList(updatedData);
            } else {
                toast.error(t("SomethingWentWrong"));
            }
        } catch (error) {
            console.error("Error fetching shifts:", error);
        } finally {
            setIsLoading(false);
        }
    };
    const handleCompleteToDo = async () => {
        if (!currentShiftData?.id) return;

        // update status to ACTIVE_PICKING from ACTIVE_IDLE
        // update status to ACTIVE_DELIVERING from ACTIVE_PICKED

        const payload = {
            id: currentShiftData?.id,
            data: {
                status: isPicked
                    ? SHIFT_STATUS.ACTIVE_DELIVERING
                    : SHIFT_STATUS.ACTIVE_PICKING,
                // ...(isPicked
                //     ? { ts_delivering_start: new Date().toISOString() }
                //     : { ts_picking_start: new Date().toISOString() }),
                // status: SHIFT_STATUS.ACTIVE_PICKING
            },
        };

        try {
            setIsLoading(true);
            const { data, status } = await UpdateShiftByIdService(payload);

            if (status) {
                toast.success(t("ShiftUpdatedSuccessfully"));
                dispatch(
                    setShiftObjData({
                        ...currentShiftData,
                        ...data,
                    }),
                );
                if (isPicked) {
                    dispatch(setCurrentView(RIDER.DELIVERY));
                    // push(PATH_DASHBOARD.rider.delivery);
                    return;
                } else {
                    dispatch(setCurrentView(RIDER.SHIFT_COMMISSIONING));
                    // push(PATH_DASHBOARD.rider.shiftCommissioning);
                    return;
                }
            } else {
                toast.error(t("SomethingWentWrong"));
                return;
            }
        } catch (error) {
            console.error("Error fetching shifts:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCheckboxChange = (index) => {
        const updatedList = todoTaskList.map((item, idx) =>
            idx === index ? { ...item, checked: !item.checked } : item,
        );
        setTodoTaskList(updatedList);
    };

    const areAllChecked = todoTaskList.every((item) => item.checked);

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
            {isLoading ? (
                <Loader />
            ) : (
                <div className="common-block-ryder">
                    <div className="shift-idle-block">
                        <ToDoTimer shiftTime={shiftTime} />
                        <div className="shift-idle-block-inner">
                            {/* todoTaskList */}
                            {todoTaskList?.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="shift-idle-block-inner-block"
                                    >
                                        <div className="shift-idle-block-text">
                                            <img
                                                alt=""
                                                src="/calender-icon.svg"
                                            />
                                            <span>{item.title}</span>
                                        </div>
                                        <div className="checkbox-custom">
                                            <div className="form-group">
                                                <input
                                                    type="checkbox"
                                                    id={`rider-${index}`}
                                                    checked={item.checked}
                                                    onChange={() =>
                                                        handleCheckboxChange(
                                                            index,
                                                        )
                                                    }
                                                ></input>
                                                <label
                                                    htmlFor={`rider-${index}`}
                                                ></label>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div
                            className={`btn-block-shift ${areAllChecked ? "checked" : ""}`}
                        >
                            <button
                                disabled={
                                    !areAllChecked || !todoTaskList?.length
                                }
                                onClick={() => {
                                    handleCompleteToDo();
                                }}
                            >
                                <img src="/start-icon.svg" />
                                <span>
                                    {t(
                                        isPicked
                                            ? "StartDelivering"
                                            : "StartPicking",
                                    )}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </CommonBlock>
    );
};

export default PreShiftIdleView;
