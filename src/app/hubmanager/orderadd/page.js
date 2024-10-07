"use client";
import { useCallback, useRef, useEffect } from "react";
import React, { useMemo, useState } from "react";
import CommonPageBLockHub from "@/components/styles/hubmanager.style";
import Header from "@/components/styles/header.style";
import Link from "next/link";
import "../../globals.css";
import Select from "react-select";
import { useRouter, usePathname, useServerInsertedHTML } from "next/navigation";

const OrderListScreen = () => {
  const router = useRouter();
  return (
    <CommonPageBLockHub>
      <div className="">
        <Header>
          <div className="header-left">
            <div className="logo-header padding-diff-block">
              <a
                className="back-arrow"
                onClick={() => router.back()}
                style={{ cursor: "pointer" }}
              >
                <img alt="arrow" src="/back-arrrow-header.svg" />
              </a>
            </div>
            <div className="calender-block">
              <span className="montag-block">Montag, 15.07.2024</span>
              <span className="hub-block">für Hub, ABCd</span>
            </div>
          </div>
        </Header>
      </div>

      <div className="common-block-hub">
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
                    <span>Hinzufügen</span>
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
