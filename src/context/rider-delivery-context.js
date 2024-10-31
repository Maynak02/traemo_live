import { SHIFT_STATUS, TOAST_TYPES } from "@/constants/keywords";
import useMetaData from "@/hooks/useMetaData";
import useToaster from "@/hooks/useToaster";
import {
    setShiftObjData,
    shiftDataState,
} from "@/redux/ShiftData/ShiftReducer";
import { PATH_DASHBOARD } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { axiosGet, axiosPut } from "@/services/axiosHelper";
import { useRouter } from "next/navigation";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export const RiderDeliveryContext = createContext();

export const useRiderDelivery = () => useContext(RiderDeliveryContext);

const RiderDeliveryProvider = ({ children }) => {
    // ** States
    const [orders, setOrders] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentView, setCurrentView] = useState("map"); // 'map' | 'productView'

    // ** Hooks
    const { shiftObjData } = useSelector(shiftDataState);
    const dispatch = useDispatch();
    const { toaster } = useToaster();
    const { push } = useRouter();
    const { t } = useTranslation("common");

    const [routeDetails, isRouteDetailsLoading] = useMetaData(
        API_ROUTER.GET_ROUTES_BY_ID(shiftObjData?.route_id),
    );
    const [isOrderExist, setIsOrderExist] = useState(null);

    // ** Effects
    useEffect(() => {
        if (!orders.length && routeDetails?.directions?.length > 0) {
            fetchOrderAddresses(routeDetails?.directions);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orders, routeDetails]);

    // ** Helpers
    const fetchOrderAddresses = async (stops) => {
        try {
            let updatedOrders = await Promise.all(
                stops.map(async (stop) => {
                    const orderDetails = await axiosGet(
                        API_ROUTER.GET_ORDER_DETAILS(stop.order_id),
                    );
                    if (orderDetails.status) {
                        return { ...stop, orderDetails: orderDetails.data };
                    }
                    return stop;
                }),
            );
            updatedOrders = updatedOrders
                ?.filter(({ orderDetails: { ts_delivered, items } }) => {
                    const isQuantitiesProduct = items?.some(
                        (product) =>
                            product.quantity - product.quantity_refunded > 0,
                    );
                    return ts_delivered === null && isQuantitiesProduct;
                })
                ?.map((item) => ({
                    ...item,
                    orderDetails: {
                        ...item.orderDetails,
                        items: item?.orderDetails?.items?.filter(
                            (product) =>
                                product.quantity - product.quantity_refunded >
                                0,
                        ),
                        productsData: item?.orderDetails?.items
                            ?.filter(
                                (product) =>
                                    product.quantity -
                                        product.quantity_refunded >
                                    0,
                            )
                            ?.map((product) => {
                                const matchedProduct =
                                    item.orderDetails?.products?.find(
                                        (productEnriched) =>
                                            productEnriched?.id ===
                                            product?.product_id,
                                    );

                                return {
                                    ...product,
                                    productDetails: matchedProduct,
                                };
                            }),
                    },
                }));

            if (updatedOrders?.length > 0) {
                setOrders(updatedOrders);
                setIsOrderExist(true);
                setCurrentView("map");
            } else {
                setIsOrderExist(false);
            }
        } catch (error) {
            setOrders([]);
            setIsOrderExist(false);
            setCurrentIndex(0);
            setCurrentView("map");
        }
    };

    // ** Handles
    const onChangeView = useCallback((view = "map") => {
        setCurrentView(view);
    }, []);

    const onSelectNextOrder = useCallback(() => {
        setCurrentIndex((prev) => prev + 1);
        onChangeView();
    }, [onChangeView]);

    const onOrderDelivered = useCallback(
        async (currentOrderIndex, orderId, orderUpdatedPayload) => {
            if (!orderId) return;
            if (currentOrderIndex <= orders.length - 1) {
                const updatedOrders = orders.map((order) =>
                    order.order_id === orderId
                        ? {
                              ...order,
                              orderDetails: {
                                  ...order.orderDetails,
                                  ...orderUpdatedPayload,
                              },
                              isDelivered: true,
                          }
                        : order,
                );
                setOrders(updatedOrders);
                setIsOrderExist(true);

                if (currentOrderIndex < orders.length - 1) onSelectNextOrder();

                if (
                    currentOrderIndex === orders.length - 1 &&
                    updatedOrders.every(({ isDelivered }) => isDelivered)
                ) {
                    const updatedRes = await axiosPut(
                        API_ROUTER.UPDATE_SHIFT_BY_ID(shiftObjData?.id),
                        {
                            status: SHIFT_STATUS.DONE,
                        },
                    );
                    if (updatedRes.status) {
                        toaster(
                            t("ordersDeliveredSuccess"),
                            TOAST_TYPES.SUCCESS,
                        );
                        dispatch(
                            setShiftObjData({
                                ...shiftObjData,
                                ...updatedRes?.data,
                            }),
                        );
                        push(PATH_DASHBOARD.root);
                    }
                    if (!updatedRes.status) {
                        return toaster(
                            t("SomethingWentWrong"),
                            TOAST_TYPES.ERROR,
                        );
                    }
                }
            }
        },
        [orders, onSelectNextOrder, shiftObjData, dispatch, toaster, push, t],
    );

    const markShiftAsCompleted = useCallback(async () => {
        if (isOrderExist === false) {
            const updatedRes = await axiosPut(
                API_ROUTER.UPDATE_SHIFT_BY_ID(shiftObjData?.id),
                {
                    status: SHIFT_STATUS.DONE,
                },
            );
            if (updatedRes.status) {
                toaster(t("ordersDeliveredSuccess"), TOAST_TYPES.SUCCESS);
                dispatch(
                    setShiftObjData({
                        ...shiftObjData,
                        ...updatedRes?.data,
                    }),
                );
                push(PATH_DASHBOARD.root);
            }
            if (!updatedRes.status) {
                return toaster(t("SomethingWentWrong"), TOAST_TYPES.ERROR);
            }
        }
    }, [dispatch, isOrderExist, push, shiftObjData, t, toaster]);

    // ** Constants
    const memoizedValues = useMemo(
        () => ({
            isOrdersLoading: isRouteDetailsLoading,
            orders,
            currentOrder:
                orders && orders.length > 0 ? orders[currentIndex] : null,
            currentView,
            isOrderExist,
            currentIndex,
            onSelectNextOrder,
            onChangeView,
            onOrderDelivered,
            markShiftAsCompleted,
        }),
        [
            isRouteDetailsLoading,
            orders,
            isOrderExist,
            currentIndex,
            currentView,
            onSelectNextOrder,
            onChangeView,
            onOrderDelivered,
            markShiftAsCompleted,
        ],
    );
    return (
        <RiderDeliveryContext.Provider value={memoizedValues}>
            {children}
        </RiderDeliveryContext.Provider>
    );
};

export default RiderDeliveryProvider;
