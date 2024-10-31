/** @format */

"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import CommonBlock from "@/components/styles/ryder.style";
import Header from "@/components/styles/ryderHeader.style";
import { DayPicker } from "react-day-picker";
import { es, de } from "react-day-picker/locale";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
const ShiftCommisioning = () => {
    return (
        <CommonBlock>
            <Header>
                <div className="header-block">
                    <div className="header-block-left">
                        <div className="order-btn">
                            <p>
                                Order: <span>ab12-cd34</span>
                            </p>
                        </div>
                    </div>
                    <div className="header-block-right">
                        <button className="save-btn-block">
                            + Tüte hinzufügen
                        </button>
                    </div>
                </div>
            </Header>
            <div className="common-block-ryder ryder-block-pad-diff">
                <div className="commising-main">
                    <div className="commising-block mb-commising-block">
                        {/* <div className="commising-product-block">
                            <div className="commising-product-block-inner">
                                <div className="top-img-block">
                                    <div className="img-block">
                                        <div className="img-block-inner">
                                            <img src="/cheeseball.png" />
                                        </div>
                                    </div>
                                    <div className="top-img-block-text">
                                        <h3>Käsebrötchen</h3>
                                        <div className="top-img-block-text-inner">
                                            <p>12 pieces ( 500g )</p>
                                            <div className="top-img-block-text-pm">
                                                <span>0/</span>
                                                <span>1</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="plus-minus-button">
                                    <div className="plus-minus-button-inner">
                                        <button className="minus-btn">
                                            <img src="/minus-icon-rider.svg" />
                                        </button>
                                    </div>
                                    <div className="plus-minus-button-inner">
                                        <button className="plus-btn">
                                            <img src="/plus-icon-rider.svg" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <Swiper
                            className="mySwiper"
                            slidesPerView="auto"
                            centeredSlides={true}
                            spaceBetween={20}
                            initialSlide={0}
                            slideOffsetBefore={0}
                            slideOffsetAfter={0}
                            loop={false}
                        >
                            <SwiperSlide>
                                <div className="commising-product-block">
                                    <div className="commising-product-block-inner">
                                        <div className="top-img-block">
                                            <div className="img-block">
                                                <div className="img-block-inner">
                                                    <img src="/cheeseball.png" />
                                                </div>
                                            </div>
                                            <div className="top-img-block-text">
                                                <h3>Käsebrötchen</h3>
                                                <div className="top-img-block-text-inner">
                                                    <p>12 pieces ( 500g )</p>
                                                    <div className="top-img-block-text-pm">
                                                        <span>0/</span>
                                                        <span>1</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="plus-minus-button">
                                            <div className="plus-minus-button-inner">
                                                <button className="minus-btn">
                                                    <img src="/minus-icon-rider.svg" />
                                                </button>
                                            </div>
                                            <div className="plus-minus-button-inner">
                                                <button className="plus-btn">
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
                                {/* <div className="flex">
                                    <div
                                        className="bg-orange-300
                                     m-2.5 border border-black py-[70px] px-[30px]"
                                    >
                                        Damaged
                                    </div>
                                    <div
                                        className="bg-orange-300
                                     m-2.5 border border-black py-[70px] px-[30px]"
                                    >
                                        Missing
                                    </div>
                                </div> */}
                                <div className="damage-block-missing">
                                    <div className="damage-block-missing-inner">
                                        <div className="damage-block">
                                            <img src="/damage-icon.svg" />
                                            <h4>Damaged</h4>
                                        </div>
                                    </div>
                                    <div className="damage-block-missing-inner">
                                        <div className="missing-block">
                                            <img src="/mising-icon.svg" />
                                            <h4>Missing</h4>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div className="commising-bottombar">
                        <button>Bestellung fertig</button>
                    </div>
                </div>
            </div>
        </CommonBlock>
    );
};

export default ShiftCommisioning;
