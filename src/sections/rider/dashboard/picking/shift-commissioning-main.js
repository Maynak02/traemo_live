"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import CommonBlock from "@/components/styles/ryder.style";
import Header from "@/components/styles/ryderHeader.style";
import { DayPicker } from "react-day-picker";
import { es, de } from "react-day-picker/locale";
import useMetaData from "@/hooks/useMetaData";
import { API_ROUTER } from "@/services/apiRouter";
import { useDispatch, useSelector } from "react-redux";
import {
    authState,
    resetNextCurrentOrderIndex,
    setCurrentView,
    setNextCurrentOrderIndex,
    setOrderDetailsInOrders,
    shiftCurrentOrderToLast,
    shiftCurrentProductToLast,
    updateOrderProductField,
} from "@/redux/Auth/AuthSlice";
import { axiosGet } from "@/services/axiosHelper";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import { truncateString } from "@/utils/globalFunctions";
import ButtonRenderer from "@/components/rider/shiftCommissioning/ButtonRenderer";
import { useRouter, useSearchParams } from "next/navigation";
import { decodeData, encodeData } from "@/utils/jwt";
import { PATH_DASHBOARD, RIDER } from "@/routes/paths";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
    setShiftObjData,
    shiftDataState,
} from "@/redux/ShiftData/ShiftReducer";
import { UpdateShiftByIdService } from "@/services/hubManagerServices ";
import { SHIFT_STATUS } from "@/constants/keywords";

const ShiftCommissioningMain = ({ setCurrentCommissioningView }) => {
    const dispatch = useDispatch();
    const { push } = useRouter();
    const { t } = useTranslation("common");
    const { orders, currentOrderIndex } = useSelector(authState);
    const [orderDetailsLoading, setOrderDetailsLoading] = useState(true);
    const { shiftObjData: currentShiftData } = useSelector(shiftDataState);

    useEffect(() => {
        // console.log("🚀 ~ ShiftCommissioningMain ~ orders:", {
        //     orders,
        //     currentOrderIndex,
        // });
        if (!orders[currentOrderIndex]?.order_id) return;
        // if (currentOrderIndex !== 0 && !orders[currentOrderIndex].isFetched) {
        //     dispatch(resetNextCurrentOrderIndex());
        // }
        if (!orders[currentOrderIndex]?.orderDetails) {
            getOrderDetails(orders[currentOrderIndex]?.order_id);
            return;
        } else {
            setOrderDetailsLoading(false);
        }
        const currentOrder = orders[currentOrderIndex];
        if (currentOrder?.isPicked) {
            if (currentOrderIndex === orders.length - 1) {
                if (orders[0].isPicked) {
                    updateShiftStatus();
                    return;
                } else {
                    dispatch(resetNextCurrentOrderIndex());
                }
            } else {
                if (currentOrderIndex < orders.length - 1) {
                    dispatch(setNextCurrentOrderIndex());
                }
            }
            return;
        }
        if (!currentOrder?.bag_id?.length > 0) {
            // TODO: comment this scan BAG ID redirection while test in local   ******
            // setOrderDetailsLoading(true);
            setCurrentCommissioningView("SCAN-BAG");
            return;
        }
        if (currentOrder?.isSolveLater) {
            setCurrentCommissioningView("PROBLEM");
            return;
        }
    }, [orders, currentOrderIndex]);

    const getOrderDetails = async (order_id) => {
        try {
            setOrderDetailsLoading(true);
            const { data, status } = await axiosGet(
                API_ROUTER.GET_ORDER_DETAILS(order_id),
            );
            if (status) {
                const mergedData = mergeItemsWithProductDetails(data);
                dispatch(
                    setOrderDetailsInOrders({
                        orderDetails: mergedData,
                    }),
                );
            } else {
                toast.error(t("SomethingWentWrong"));
            }
            setOrderDetailsLoading(false);
        } catch (error) {
            console.error("getOrderDetails ~ error:", error);
        } finally {
        }
    };

    const mergeItemsWithProductDetails = (data) => {
        const { items, products, ...rest } = data;
        return {
            ...rest,
            items: items.map((item) => {
                const productDetails = products.find(
                    (product) => product.id === item.product_id,
                );
                return {
                    ...item,
                    productDetails: productDetails
                        ? { ...productDetails }
                        : null,
                    acceptedCount: 0,
                    isDamaged: false,
                    isMissing: false,
                };
            }),
        };
    };

    const updateShiftStatus = async () => {
        if (!currentShiftData?.id) return;
        const payload = {
            id: currentShiftData?.id,
            data: {
                status: SHIFT_STATUS.ACTIVE_PICKED,
                // ts_picking_end: new Date().toISOString(),
            },
        };
        const { data, status } = await UpdateShiftByIdService(payload);
        if (status) {
            dispatch(
                setShiftObjData({
                    ...currentShiftData,
                    ...data,
                }),
            );
            dispatch(setCurrentView(RIDER.TO_DO));
            // push(PATH_DASHBOARD.rider.preShiftsIdle);
            toast.success(t("ShiftUpdatedSuccessfully"));
        } else {
            toast.error(t("SomethingWentWrong"));
            setIsLoading(false);
        }
    };

    const handleUpdateAcceptedCount = (product_id, operation = "add") => {
        const item = orders[currentOrderIndex]?.orderDetails?.items?.find(
            (item) => item.product_id === product_id,
        );

        if (!item) return;
        const { acceptedCount = 0, quantity, quantity_refunded = 0 } = item;

        if (
            operation === "add" &&
            acceptedCount >= quantity - quantity_refunded
        )
            return;

        const newValue =
            operation === "add" ? acceptedCount + 1 : acceptedCount - 1;
        if (newValue < 0) return;

        dispatch(
            updateOrderProductField({
                product_id,
                fieldKey: "acceptedCount",
                value: newValue,
            }),
        );
    };

    const handleDamagedAndMissingItem = (
        product_id,
        key = "isDamaged", // ("isMissing")
    ) => {
        const item = orders[currentOrderIndex]?.orderDetails?.items?.find(
            (item) => item.product_id === product_id,
        );
        if (!item || item[key]) return;

        const { acceptedCount = 0, quantity, quantity_refunded } = item;
        if (acceptedCount >= quantity - quantity_refunded)
            return toast.info(t("AllItemsAccepted"));
        dispatch(
            updateOrderProductField({
                product_id,
                fieldKey: key,
                value: true,
            }),
        );
        dispatch(shiftCurrentProductToLast({ product_id }));
    };

    const handleAddBag = () => {
        if (!orders[currentOrderIndex]?.order_id) return;
        setCurrentCommissioningView("SCAN-BAG");
        // push(PATH_DASHBOARD.rider.scanBag);
    };

    const handleHomeRoute = () => {
        window.location.href = "/";
    };

    if (
        orderDetailsLoading ||
        (orders?.length - 1 === currentOrderIndex &&
            orders[currentOrderIndex]?.isPicked)
    )
        return (
            <>
                <Loader />
            </>
        );

    return (
        <>
            <CommonBlock>
                <Header>
                    <div className="header-block">
                        <div className="header-block-left">
                            <div className="order-btn">
                                <p>
                                    {t("Order")}:{" "}
                                    {orders[currentOrderIndex]?.bag_id?.length >
                                    0 ? (
                                        <span>
                                            {truncateString(
                                                orders[currentOrderIndex]
                                                    ?.bag_id[0],
                                                3,
                                                4,
                                            )}
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                </p>
                            </div>
                        </div>
                        {orders[currentOrderIndex]?.isFetched ? (
                            <div className="header-block-right">
                                <button
                                    className="save-btn-block"
                                    onClick={handleAddBag}
                                >
                                    {t("AddBag")}
                                </button>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </Header>
                {orders[currentOrderIndex] &&
                orders[currentOrderIndex]?.isFetched &&
                !orders[currentOrderIndex]?.isPicked ? (
                    <div className="common-block-ryder">
                        <div className="commising-main">
                            <div className="commising-block">
                                {orders[
                                    currentOrderIndex
                                ]?.orderDetails?.items?.map((item, i) => (
                                    <Swiper
                                        className="mySwiper"
                                        slidesPerView="auto"
                                        centeredSlides={true}
                                        spaceBetween={20}
                                        initialSlide={0}
                                        slideOffsetBefore={0}
                                        slideOffsetAfter={0}
                                        loop={false}
                                        key={i}
                                    >
                                        <SwiperSlide>
                                            <div
                                                className="commising-product-block"
                                                key={i}
                                            >
                                                <div
                                                    className="commising-product-block-inner"
                                                    style={
                                                        item?.isDamaged ||
                                                        item?.isMissing
                                                            ? {
                                                                  border: "1px solid #b32317",
                                                              }
                                                            : {}
                                                    }
                                                >
                                                    <div className="top-img-block">
                                                        <div className="img-block">
                                                            <div className="img-block-inner">
                                                                <img
                                                                    src={
                                                                        item
                                                                            ?.productDetails
                                                                            ?.images[0] ||
                                                                        "/cheeseball.png"
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="top-img-block-text">
                                                            <h3>
                                                                {item
                                                                    ?.productDetails
                                                                    ?.title ||
                                                                    ""}
                                                            </h3>
                                                            <div className="top-img-block-text-inner">
                                                                <p>
                                                                    {item
                                                                        ?.productDetails
                                                                        ?.quantity ||
                                                                        0}{" "}
                                                                    {
                                                                        item
                                                                            ?.productDetails
                                                                            ?.unit
                                                                    }
                                                                </p>
                                                                {/* {item?.isDamaged ||
                                                        item?.isMissing ? (
                                                            <p>
                                                                damagedQty:{" "}
                                                                {item?.quantity -
                                                                    item?.acceptedCount}
                                                            </p>
                                                        ) : (
                                                            ""
                                                        )} */}

                                                                <div
                                                                    className={`top-img-block-text-pm ${
                                                                        (item?.quantity ||
                                                                            0) -
                                                                            (item?.quantity_refunded ||
                                                                                0) ==
                                                                        (item?.acceptedCount ||
                                                                            0)
                                                                            ? "all-accepted"
                                                                            : ""
                                                                    }`}
                                                                >
                                                                    <span>
                                                                        {item?.acceptedCount ||
                                                                            0}
                                                                        /
                                                                    </span>
                                                                    <span>
                                                                        {(item?.quantity ||
                                                                            0) -
                                                                            (item?.quantity_refunded ||
                                                                                0)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="plus-minus-button">
                                                        <div className="plus-minus-button-inner">
                                                            <button
                                                                className="minus-btn"
                                                                onClick={() =>
                                                                    handleUpdateAcceptedCount(
                                                                        item?.product_id,
                                                                        "subtract",
                                                                    )
                                                                }
                                                            >
                                                                <img src="/minus-icon-rider.svg" />
                                                            </button>
                                                        </div>
                                                        <div className="plus-minus-button-inner">
                                                            <button
                                                                className="plus-btn"
                                                                onClick={() =>
                                                                    handleUpdateAcceptedCount(
                                                                        item?.product_id,
                                                                        "add",
                                                                    )
                                                                }
                                                            >
                                                                <img src="/plus-icon-rider.svg" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide
                                            className="second-slide"
                                            style={{ width: "70vw" }}
                                        >
                                            <div className="damage-block-missing">
                                                <div
                                                    className="damage-block-missing-inner"
                                                    onClick={() =>
                                                        handleDamagedAndMissingItem(
                                                            item?.product_id,
                                                            "isDamaged",
                                                        )
                                                    }
                                                >
                                                    <div className="damage-block">
                                                        <img src="/damage-icon.svg" />
                                                        <h4>{t("Damaged")}</h4>
                                                    </div>
                                                </div>
                                                <div
                                                    className="damage-block-missing-inner"
                                                    onClick={() =>
                                                        handleDamagedAndMissingItem(
                                                            item?.product_id,
                                                            "isMissing",
                                                        )
                                                    }
                                                >
                                                    <div className="missing-block">
                                                        <img src="/mising-icon.svg" />
                                                        <h4>{t("Missing")}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                ))}
                            </div>
                            <ButtonRenderer
                                order={orders[currentOrderIndex]}
                                isLastOrderIndex={
                                    currentOrderIndex === orders.length - 1
                                }
                                setCurrentCommissioningView={
                                    setCurrentCommissioningView
                                }
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center min-h-screen bg-gray-100">
                        <div className="flex flex-col items-center">
                            <p className="text-center text-lg text-gray-700 p-4">
                                {t("noDataFound")}
                            </p>
                            <button
                                onClick={handleHomeRoute}
                                className="bg-transparent hover:bg-yellow-400 text-yellow-400 font-semibold hover:text-white py-2 px-4 border border-yellow-400 hover:border-transparent rounded mt-5"
                            >
                                {t("Next")}
                            </button>
                        </div>
                    </div>
                )}
            </CommonBlock>
        </>
    );
};

export default ShiftCommissioningMain;
