"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import CommonBlock from "@/components/styles/ryder.style";
import Header from "@/components/styles/ryderHeader.style";
import ProfilePopover from "@/components/common/ProfilePopover";
import { PATH_DASHBOARD } from "@/routes/paths";
import { useTranslation } from "react-i18next";

const RiderShiftsErrorsView = () => {
    // ** Hooks
    const { t } = useTranslation("common");

    // ** Constants
    const ERRORS = useMemo(
        () => [
            {
                icon: "/error-img.png",
                label: t("shiftErrors.sicknote"),
                id: "sicknote",
            },
            {
                icon: "/error-img.png",
                label: t("shiftErrors.pay"),
                id: "pay",
            },
            {
                icon: "/error-img.png",
                label: t("shiftErrors.accident"),
                id: "accident",
            },
            {
                icon: "/error-img.png",
                label: t("shiftErrors.tardiness"),
                id: "tardiness",
            },
            {
                icon: "/error-img.png",
                label: t("shiftErrors.checkIn"),
                id: "checkIn",
            },
        ],
        [t],
    );
    return (
        <CommonBlock>
            <Header>
                <div className="header-block">
                    <div className="header-block-left">
                        <Link href={PATH_DASHBOARD.rider.dashboard}>
                            <img
                                alt="back-arrow"
                                src="/back-arrrow-header.svg"
                            />
                        </Link>
                    </div>
                    <div className="header-block-right">
                        <ProfilePopover />
                    </div>
                </div>
            </Header>
            <div className="common-block-ryder">
                <div className="shift-common-error">
                    {ERRORS.map((item) => (
                        <div className="shift-common-error-inner" key={item.id}>
                            <img src={item.icon} alt="error-logo" />
                            <p>{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </CommonBlock>
    );
};

export default RiderShiftsErrorsView;
