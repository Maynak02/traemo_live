import ConfirmationDialog from "@/components/common/ConfirmationDialog";
import Loader from "@/components/Loader";
import CommonBlock from "@/components/styles/ryder.style";
import Header from "@/components/styles/ryderHeader.style";
import { TOAST_TYPES } from "@/constants/keywords";
import { useRiderDelivery } from "@/context/rider-delivery-context";
import useToaster from "@/hooks/useToaster";
import useToggle from "@/hooks/useToggle";
import { PATH_DASHBOARD } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { axiosPut } from "@/services/axiosHelper";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const ProductView = () => {
    // ** States
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ** Hooks
    const {
        isOrdersLoading,
        isOrderExist,
        currentOrder,
        onOrderDelivered,
        currentIndex,
    } = useRiderDelivery();
    const { t } = useTranslation("common");
    const { push } = useRouter();
    const confirmationHandler = useToggle();
    const { toaster } = useToaster();

    // ** Handlers
    const onConfirmOrderDeliver = useCallback(async () => {
        if (!currentOrder?.order_id) return;
        confirmationHandler.onFalse();
        try {
            const payload = { ts_delivered: new Date().toISOString() };
            setIsSubmitting(true);
            const res = await axiosPut(
                API_ROUTER.UPDATE_ORDER_DETAILS(currentOrder?.order_id),
                payload,
            );
            setIsSubmitting(false);
            if (res.status) {
                toaster(t("orderMarkedAsDelivered"), TOAST_TYPES.SUCCESS);
                confirmationHandler.onFalse();
                onOrderDelivered(currentIndex, currentOrder?.order_id, {
                    ts_delivered: res.data.ts_delivered,
                });
            }
            if (!res.status) {
                return toaster(
                    res?.message || t("generalErrorText"),
                    TOAST_TYPES.ERROR,
                );
            }
        } catch (error) {
            setIsSubmitting(false);
            return toaster(t("generalErrorText"), TOAST_TYPES.ERROR);
        }
    }, [
        currentOrder,
        toaster,
        t,
        onOrderDelivered,
        currentIndex,
        confirmationHandler,
    ]);

    const onClickCompleteOrder = () => {
        if (!currentOrder?.order_id) return;
        confirmationHandler.onTrue();
    };

    // ** Renders
    const renderConfirmation = useMemo(
        () => (
            <ConfirmationDialog
                isOpen={confirmationHandler.value}
                onClose={() => confirmationHandler.onFalse()}
                confirmationText={t("confirmDeliveryConfirm")}
                onConfirm={onConfirmOrderDeliver}
                isLoading={isSubmitting}
                confirmText={t("Yes")}
                loadingText={t("Completing")}
            />
        ),
        [confirmationHandler, t, onConfirmOrderDeliver, isSubmitting],
    );

    if (isSubmitting || isOrdersLoading || isOrderExist === null)
        return <Loader />;

    return (
        <CommonBlock>
            <Header>
                <div className="header-block">
                    <div className="header-block-left">
                        <div className="order-btn ml-2">
                            {currentOrder?.address?.name && (
                                <p>{currentOrder?.address?.name}</p>
                            )}
                        </div>
                    </div>
                </div>
            </Header>
            <div className="common-block-ryder">
                <div className="delevery-target">
                    <div className="delevery-target-top">
                        <h2>{t("products")}</h2>
                        <div className="delevery-target-product">
                            {currentOrder?.orderDetails?.productsData?.length >
                            0
                                ? currentOrder?.orderDetails?.productsData?.map(
                                      (item) => (
                                          <div
                                              className="delevery-target-product-box"
                                              key={item?.product_id}
                                          >
                                              <div className="delevery-target-img">
                                                  <div className="delevery-target-img-inner">
                                                      {item?.productDetails
                                                          ?.images?.length >
                                                      0 ? (
                                                          <img
                                                              src={item?.productDetails?.images?.at(
                                                                  0,
                                                              )}
                                                          />
                                                      ) : null}
                                                  </div>
                                              </div>
                                              <div className="product-img-text">
                                                  <div className="product-img-text-left">
                                                      <h3>
                                                          {
                                                              item
                                                                  ?.productDetails
                                                                  ?.title
                                                          }
                                                      </h3>
                                                      <p>
                                                          {`${
                                                              item
                                                                  ?.productDetails
                                                                  ?.quantity
                                                          } ${
                                                              item
                                                                  ?.productDetails
                                                                  ?.unit
                                                          }`}
                                                      </p>
                                                  </div>
                                                  <div className="product-img-text-right">
                                                      <p>
                                                          {item?.quantity -
                                                              item?.quantity_refunded}
                                                      </p>
                                                  </div>
                                              </div>
                                          </div>
                                      ),
                                  )
                                : null}
                        </div>
                    </div>
                    <div className="delevery-two-block">
                        <div className="delevery-two-block-flex">
                            <div className="delevery-two-block-border">
                                <h2>{t("instructions")}</h2>
                                <p>
                                    {currentOrder?.orderDetails?.address
                                        ?.delivery_instructions
                                        ? currentOrder?.orderDetails?.address
                                              ?.delivery_instructions
                                        : "-"}
                                </p>
                            </div>
                        </div>
                        <div className="delevery-two-block-flex">
                            <div className="delevery-two-block-upload">
                                <div className="file-input ">
                                    <label className="file-input__label">
                                        {currentOrder?.orderDetails?.address
                                            ?.delivery_picture ? (
                                            <img
                                                src={
                                                    currentOrder?.orderDetails
                                                        ?.address
                                                        ?.delivery_picture
                                                }
                                                alt="deliver instructions"
                                            />
                                        ) : (
                                            t("noImageAvailable")
                                        )}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-bar-target">
                        <div
                            className="error-block"
                            onClick={() => push(PATH_DASHBOARD.rider.errors)}
                        >
                            <img src="/error-img.png" alt="error-msg-icon" />
                            <span>{t("errors")}</span>
                        </div>
                        <div className="btn-target">
                            <button
                                onClick={onClickCompleteOrder}
                                disabled={isSubmitting}
                            >
                                {t("complete")}
                            </button>
                        </div>
                        {renderConfirmation}
                    </div>
                </div>
            </div>
        </CommonBlock>
    );
};

export default ProductView;
