"use client";
import React, { useEffect, useMemo, useState } from "react";
import { authState, setCurrentView } from "@/redux/Auth/AuthSlice";
import { useSelector } from "react-redux";
import PreShiftView from "@/sections/rider/dashboard/view/pre-shift-view";
import DeliveryMainView from "@/sections/rider/dashboard/view/delivery-view";
import PreShiftIdleView from "@/sections/rider/dashboard/view/to-do-view";
import CalendarShiftView from "@/sections/rider/dashboard/view/calendar-shift-view";
import { PATH_DASHBOARD, RIDER } from "@/routes/paths";
import ShiftCommissioningView from "@/sections/rider/dashboard/view/shift-commissioning-view";
import { SHIFT_HOURS, SHIFT_STATUS } from "@/constants/keywords";
import {
    resetToInitialState,
    setShiftObjData,
} from "@/redux/ShiftData/ShiftReducer";
import { GetShiftsList } from "@/services/riderService";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { resetNextCurrentOrderIndex } from "@/redux/Auth/AuthSlice";
import Loader from "@/components/Loader";

const DashBoardPage = () => {
    const { currentView } = useSelector(authState);
    const dispatch = useDispatch();
    const { push } = useRouter();
    const [shiftList, setShiftList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const ACTIVE_SHIFTS = [
        SHIFT_STATUS.ACTIVE_IDLE,
        SHIFT_STATUS.ACTIVE_PICKING,
        SHIFT_STATUS.ACTIVE_PICKED,
        SHIFT_STATUS.ACTIVE_DELIVERING,
    ];
    useEffect(() => {
        GetShiftList();
    }, []);

    useEffect(() => {
        if (!shiftList.length) return;

        const currentTime = moment.utc();
        const currentDate = currentTime.format("YYYY-MM-DD");

        const findShifts = (shifts) => {
            let currentShift = null;
            let nearestShift = null;
            let previousShift = null;
            const currentTime = moment.utc();
            const filteredShifts = shifts?.filter((shift) =>
                [
                    SHIFT_STATUS.ACCEPTED,
                    ...ACTIVE_SHIFTS,
                    // SHIFT_STATUS.ACTIVE_BACKUP,
                ].includes(shift.status),
            );

            const sortedShifts = filteredShifts?.sort((a, b) =>
                moment
                    .utc(a.ts_start_planned)
                    .diff(moment.utc(b.ts_start_planned)),
            );

            for (const shift of sortedShifts) {
                const shiftStart = moment.utc(shift.ts_start_planned);
                const shiftEnd = shiftStart.clone().add(SHIFT_HOURS, "hours");

                if (currentTime.isBetween(shiftStart, shiftEnd)) {
                    currentShift = shift;
                } else if (shiftEnd.isBefore(currentTime)) {
                    previousShift = shift;
                } else if (!nearestShift && shiftStart.isAfter(currentTime)) {
                    nearestShift = shift;
                }

                if (currentShift) break;
            }

            return { currentShift, nearestShift, previousShift };
        };

        const { currentShift, nearestShift, previousShift } =
            findShifts(shiftList);

        // console.log('first', { currentShift, nearestShift, previousShift })

        const processShift = (shift, isNearest = false) => {
            const { status, ts_start_planned } = shift;
            if (shift?.route_id === null && status !== SHIFT_STATUS.ACCEPTED) {
                let removedShift = [...shiftList].filter(
                    (elem) => elem.id !== shift.id,
                );
                setShiftList(removedShift);
                return;
            }
            dispatch(setShiftObjData(shift));

            const shiftPathMap = {
                [SHIFT_STATUS.ACCEPTED]: RIDER.TO_DO,
                [SHIFT_STATUS.ACTIVE_IDLE]: RIDER.TO_DO,
                [SHIFT_STATUS.ACTIVE_PICKING]: RIDER.SHIFT_COMMISSIONING,
                [SHIFT_STATUS.ACTIVE_PICKED]: RIDER.TO_DO,
                [SHIFT_STATUS.ACTIVE_DELIVERING]: RIDER.DELIVERY,
            };
            if (isNearest) {
                let path;
                if (ACTIVE_SHIFTS.includes(status)) {
                    path = shiftPathMap[status];
                } else {
                    const plannedTime = moment
                        .utc(ts_start_planned)
                        .format("HH:mm");
                    const timingStatus = getShiftTimingStatus(plannedTime);

                    path =
                        timingStatus === "preShiftsIdle" ||
                        status === SHIFT_STATUS.ACTIVE_IDLE
                            ? RIDER.TO_DO
                            : RIDER.PRE_SHIFT;
                }
                dispatch(setCurrentView(path || RIDER.CALENDER));
                return;
            } else if (shiftPathMap[status]) {
                dispatch(setCurrentView(shiftPathMap[status]));
                return;
            }
        };

        dispatch(resetToInitialState());
        dispatch(resetNextCurrentOrderIndex());

        if (
            previousShift &&
            [...ACTIVE_SHIFTS].includes(previousShift?.status)
            // &&  // TODO: REPLACE this condition
            // ACTIVE_SHIFTS.includes(previousShift?.status)
        ) {
            console.log("previousShift");
            processShift(previousShift);
        } else if (currentShift) {
            console.log("currentShift");
            processShift(currentShift);
        } else if (nearestShift) {
            console.log("nearestShift");
            const plannedStartDate = moment
                .utc(nearestShift.ts_start_planned)
                .format("YYYY-MM-DD");

            if (plannedStartDate === currentDate) {
                processShift(nearestShift, true);
            } else {
                dispatch(setCurrentView(RIDER.CALENDER));
                return;
            }
        } else {
            dispatch(setCurrentView(RIDER.CALENDER));
            return;
        }

        closeLoader();
    }, [shiftList]);

    const GetShiftList = async () => {
        setIsLoading(true);
        const yesterday = moment.utc().subtract(1, "days").format("YYYY-MM-DD");
        const tomorrow = moment.utc().add(1, "days").format("YYYY-MM-DD");

        const objParam = {
            offset: 0,
            limit: 50,
            sort_direction: "desc",
            filters: `ts_start_planned$gte${yesterday} and ts_start_planned$lte${tomorrow}`,
        };

        const { data, status } = await GetShiftsList(objParam);
        if (status) {
            setShiftList(data || []);
        } else {
            setIsLoading(false);
            console.log("Error fetching shifts:", { data });
        }
    };

    const closeLoader = () => {
        setTimeout(() => {
            setIsLoading(false);
        }, 300);
    };

    const getShiftTimingStatus = (plannedTime) => {
        if (!plannedTime) return false;
        const currentDateUTC = new Date();
        const currentTimeInMinutes =
            currentDateUTC.getUTCHours() * 60 + currentDateUTC.getUTCMinutes();

        const [plannedHours, plannedMinutes] = plannedTime
            .split(":")
            .map(Number);
        const plannedTimeInMinutes = plannedHours * 60 + plannedMinutes;
        const timeDifference = plannedTimeInMinutes - currentTimeInMinutes;

        if (timeDifference > 0 && timeDifference <= SHIFT_HOURS * 60)
            return "preShifts";
        if (timeDifference > -SHIFT_HOURS * 60 && timeDifference <= 0)
            return "preShiftsIdle";
        return false;
    };

    const renderCurrentView = useMemo(() => {
        switch (currentView) {
            case RIDER.CALENDER:
                return <CalendarShiftView />;
            case RIDER.PRE_SHIFT:
                return <PreShiftView />;
            case RIDER.TO_DO:
                return <PreShiftIdleView />;
            case RIDER.SHIFT_COMMISSIONING:
                return <ShiftCommissioningView />;
            case RIDER.DELIVERY:
                return <DeliveryMainView />;
            default:
                return null;
        }
    }, [currentView]);

    if (isLoading) {
        return <Loader />;
    }

    return <>{renderCurrentView}</>;
};

export default DashBoardPage;
