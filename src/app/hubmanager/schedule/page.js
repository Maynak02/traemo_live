"use client";
import { useCallback, useRef, useEffect } from "react";
import React, { useMemo, useState } from "react";
import CommonPageBLockHub from "@/components/styles/hubmanager.style";
import Header from "@/components/styles/header.style";
import Link from "next/link";
import "../../globals.css";
import Select from "react-select";
import { useRouter, usePathname, useServerInsertedHTML } from "next/navigation";

const ScheduleScreen = () => {
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
              <span className="hub-block">Schacht für, ABCD</span>
            </div>
          </div>
        </Header>
      </div>

      <div className="common-block-hub">
        <div className="schedule-block">
          <div className="schedule-block-four">
            <div className="schedule-block-four-inner">
              <div className="schedule-block-four-inner-block">
                <div className="schedule-block-common">
                  <div className="top-block">
                    <h2>Übersicht</h2>
                    <span className="active-block">Aktiv</span>
                  </div>
                  <div className="shift-block-inner">
                    <p>Schichtbeginn: 4:02 Uhr</p>
                    <p className="block-tag">-</p>
                    <p className="end-shift">Schichtende: 8:37 Uhr</p>
                  </div>
                </div>
                <div className="schedule-block-common">
                  <div className="top-block">
                    <h2>Schicht manuell beenden</h2>
                  </div>
                  <div className="schedule-block-common-checkbox">
                    <div className="checkbox-block-inner">
                      <p>No Show</p>
                      <div className="checkbox-custom">
                        <div className="form-group">
                          <input type="checkbox" id="rider"></input>
                          <label for="rider"></label>
                        </div>
                      </div>
                    </div>
                    <div className="checkbox-block-inner">
                      <p>Krankheit </p>
                      <div className="checkbox-custom">
                        <div className="form-group">
                          <input type="checkbox" id="rider"></input>
                          <label for="rider"></label>
                        </div>
                      </div>
                    </div>
                    <div className="checkbox-block-inner">
                      <p>Unfall</p>
                      <div className="checkbox-custom">
                        <div className="form-group">
                          <input type="checkbox" id="rider"></input>
                          <label for="rider"></label>
                        </div>
                      </div>
                    </div>
                    <div className="checkbox-block-inner">
                      <p>Korrektur</p>
                      <div className="checkbox-custom">
                        <div className="form-group">
                          <input type="checkbox" id="rider"></input>
                          <label for="rider"></label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="add-block-inner">
                    <button className="add-btn">End</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="schedule-block-four-inner">
              <div className="schedule-block-four-inner-block">
                <div className="schedule-block-common">
                  <div className="top-block">
                    <h2>Übersicht</h2>
                    <span className="request-block">Angefordert</span>
                  </div>
                  <div className="shift-block-inner">
                    <p>Schichtbeginn: 4:02 Uhr</p>
                    <p className="block-tag">-</p>
                    <p className="end-shift">Schichtende: 8:37 Uhr</p>
                  </div>
                </div>
                <div className="add-btn-block">
                  <button>
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.2372 6.54297V18.9848C6.2372 19.744 6.85269 20.3595 7.61194 20.3595H17.3894C18.1486 20.3595 18.7641 19.744 18.7641 18.9848V6.54297M3.40918 6.54297H21.591"
                        stroke="#1C1C1C"
                        stroke-width="1.7"
                        stroke-linecap="round"
                      />
                      <path
                        d="M8.5 6V4.41421C8.5 3.63317 9.13317 3 9.91421 3H15.0858C15.8668 3 16.5 3.63317 16.5 4.41421V6"
                        stroke="#1C1C1C"
                        stroke-width="1.7"
                        stroke-linecap="round"
                      />
                    </svg>
                    <span>Schicht löschen</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="schedule-block-four-inner">
              <div className="schedule-block-four-inner-block">
                <div className="schedule-block-common">
                  <div className="top-block">
                    <h2>Übersicht</h2>
                    <span className="complate-block">Erledigt</span>
                  </div>
                  <div className="shift-block-inner">
                    <p>Schichtbeginn: 4:02 Uhr</p>
                    <p className="block-tag">-</p>
                    <p>Schichtende: 8:37 Uhr</p>
                  </div>
                </div>
                <div className="schedule-block-common">
                  <div className="top-block">
                    <h2>Arbeitszeiten ändern</h2>
                  </div>
                  <div className="input-block-inner">
                    <input type="text" placeholder="End time"></input>
                    <div className="btn-conform">
                      <button>Confirm</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommonPageBLockHub>
  );
};

export default ScheduleScreen;
