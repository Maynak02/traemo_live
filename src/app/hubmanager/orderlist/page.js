"use client";
import { useCallback, useRef, useEffect } from "react";
import React, { useMemo, useState } from "react";
import CommonPageBLockHub from "@/components/styles/hubmanager.style";
import Header from "@/components/styles/header.style";
import Link from "next/link";
import "../../globals.css";
import Select from "react-select";

const OrderListScreen = () => {
  return (
    <CommonPageBLockHub>
      <div className="">
        <Header>
          <div className="header-left">
            <div className="logo-header padding-diff-block">
              <Link href="/hubmanager/dashboard" className="back-arrow">
                <img alt="arrow" src="/back-arrrow-header.svg" />
              </Link>
            </div>
            <div className="calender-block">
              <span className="montag-block">Montag, 15.07.2024</span>
              <span className="hub-block">for Hub, ABCd</span>
            </div>
          </div>
        </Header>
      </div>

      <div className="common-block-hub">
        <div className="rider-block">
          <div className="rider-block-three">
            <div className="rider-block-three-block">
              <div className="rider-block-three-block-inner">
                <div className="rider-block-top">
                  <h2>Rider</h2>
                  <div className="label-group">
                    <span className="recommened">Recommended: 3</span>
                    <span className="max-block">Max: 10</span>
                  </div>
                </div>
                <div className="shift-block">
                  <p>
                    Start of shift <span>4 o'clock</span>
                  </p>
                </div>
                <div className="rider-block-data">
                  <div className="rider-block-data-inner">
                    <div className="rider-block-data-inner-block">
                      <img alt="img" src="/profile-img.png" />
                      <h4>Rider 1</h4>
                    </div>
                    <div className="rider-block-data-inner-block">
                      <img alt="img" src="/profile-img.png" />
                      <h4>Rider 1</h4>
                    </div>
                    <div className="rider-block-data-inner-block">
                      <img alt="img" src="/profile-img.png" />
                      <h4>Rider 1</h4>
                    </div>
                  </div>
                </div>
                <div className="add-btn">
                  <button className="btn-add">
                    <img alt="img" src="/plus-icon.svg" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="rider-block-three-block">
              <div className="rider-block-three-block-inner">
                <div className="rider-block-top no-title">
                  <div className="label-group">
                    <span className="recommened">Recommended: 3</span>
                  </div>
                </div>
                <div className="shift-block">
                  <p>
                    Start of shift <span>4 o'clock</span>
                  </p>
                </div>
                <div className="rider-block-data">
                  <div className="rider-block-data-inner">
                    <div className="rider-block-data-inner-block">
                      <img alt="img" src="/profile-img.png" />
                      <h4>Rider 1</h4>
                    </div>
                  </div>
                </div>
                <div className="add-btn">
                  <button className="btn-add">
                    <img alt="img" src="/plus-icon.svg" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* order list checkbox list */}
        <div className="rider-block">
          <div className="rider-block-three order-checklist-block">
            <div className="rider-block-three-block">
              <div className="rider-block-three-block-inner">
                <div className="rider-block-top">
                  <h2>Rider</h2>
                </div>
                <div className="rider-block-data">
                  <div className="rider-block-data-inner">
                    <div className="rider-block-data-inner-block">
                      <div className="rider-block-checkbox">
                        <img alt="img" src="/profile-img.png" />
                        <h4>Rider 1</h4>
                      </div>
                      <div className="checkbox-custom">
                        <div className="form-group">
                          <input type="checkbox" id="rider"></input>
                          <label for="rider"></label>
                        </div>
                      </div>
                    </div>
                    <div className="rider-block-data-inner-block">
                      <div className="rider-block-checkbox">
                        <img alt="img" src="/profile-img.png" />
                        <h4>Rider 1</h4>
                      </div>
                      <div className="checkbox-custom">
                        <div className="form-group">
                          <input type="checkbox" id="rider"></input>
                          <label for="rider"></label>
                        </div>
                      </div>
                    </div>
                    <div className="rider-block-data-inner-block">
                      <div className="rider-block-checkbox">
                        <img alt="img" src="/profile-img.png" />
                        <h4>Rider 1</h4>
                      </div>
                      <div className="checkbox-custom">
                        <div className="form-group">
                          <input type="checkbox" id="rider"></input>
                          <label for="rider"></label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="add-btn">
                  <button className="btn-add check-order">
                    <img alt="img" src="/plus-icon-green.svg" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommonPageBLockHub>
  );
};

export default OrderListScreen;
