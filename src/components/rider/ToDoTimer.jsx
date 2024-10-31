"use client";
import moment from "moment";
import React, { useEffect, useState } from "react";

const ToDoTimer = ({ shiftTime }) => {
    const [timer, setTimer] = useState("");

    useEffect(() => {
        if (!shiftTime) return;

        const plannedStartTime = moment(shiftTime);

        const formatTime = (duration) => {
            const hours = duration.hours().toString().padStart(2, "0");
            const minutes = duration.minutes().toString().padStart(2, "0");
            const seconds = duration.seconds().toString().padStart(2, "0");
            return `${hours}:${minutes}:${seconds}`;
        };

        const calculateTimeLeft = () => {
            const currentTime = moment();
            const diff = moment.duration(plannedStartTime.diff(currentTime));
            const isPast = diff.asMilliseconds() < 0;
            const formattedTime = formatTime(
                moment.duration(Math.abs(diff.asMilliseconds())),
            );
            setTimer(`${isPast ? "-" : ""}${formattedTime}`);
        };

        calculateTimeLeft();
        const intervalId = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(intervalId);
    }, [shiftTime]);

    return (
        timer && (
            <div className="clock-img-block">
                <img alt="Clock icon" src="/clock-icon.svg" />
                <span>{timer}</span>
            </div>
        )
    );
};

export default ToDoTimer;
