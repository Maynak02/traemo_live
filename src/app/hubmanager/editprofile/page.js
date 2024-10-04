"use client";
import { useCallback, useRef, useEffect } from "react";
import React, { useMemo, useState } from "react";
import CommonPageBLockHub from "@/components/styles/hubmanager.style";
import Header from "@/components/styles/header.style";
import Link from "next/link";
import "../../globals.css";
import Select from "react-select";

const EditProfile = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

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
          </div>
          <div className="header-right">
            <div className="header-right-btn">
              <button>Save changes</button>
            </div>
          </div>
        </Header>
      </div>

      <div className="common-block-hub">
        <div className="edit-profile-block">
          <div className="edit-profile-block-three">
            <div className="edit-profile-block-three-block">
              <div className="edit-profile-block-three-block-inner">
                <div className="top-edit-profile-block">
                  <img alt="img" src="/edit-profile-icon.svg" />
                  <h3>Person</h3>
                </div>
                <div className="form-block-inner">
                  <div className="form-block-inner-block">
                    <div className="form-block-inner-block-input">
                      <div className="input-box">
                        <label>Vorname</label>
                        <input type="text" placeholder="Anwar"></input>
                      </div>
                    </div>
                    <div className="form-block-inner-block-input">
                      <div className="input-box">
                        <label>Nachname</label>
                        <input type="text" placeholder="Raza"></input>
                      </div>
                    </div>
                  </div>
                  <div className="select-form-block">
                    <Select
                      options={options}
                      classNamePrefix="react-select"
                      className="select-block-fetishes"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="edit-profile-block-three-block">
              <div className="edit-profile-block-three-block-inner">
                <div className="top-edit-profile-block">
                  <img alt="img" src="/edit-profile-icon-2.svg" />
                  <h3>Address</h3>
                </div>
                <div className="form-block-inner">
                  <div className="form-block-inner-block">
                    <div className="form-block-inner-block-flex">
                      <input type="text" placeholder="Street"></input>
                    </div>
                    <div className="form-block-inner-block-flex">
                      <input type="text" placeholder="House Number"></input>
                    </div>
                  </div>
                  <div className="form-block-inner-block">
                    <div className="form-block-inner-block-flex">
                      <input type="text" placeholder="Postal code"></input>
                    </div>
                    <div className="form-block-inner-block-flex">
                      <input type="text" placeholder="Ort"></input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="edit-profile-block-three-block">
              <div className="edit-profile-block-three-block-inner">
                <div className="top-edit-profile-block">
                  <img alt="img" src="/edit-profile-icon-1.svg" />
                  <h3>Payout</h3>
                </div>
                <div className="form-block-inner">
                  <div className="form-block-inner-block width-full-block">
                    <div className="form-block-inner-block-input">
                      <div className="input-box">
                        <label>Name</label>
                        <input type="text" placeholder="Anwar Raza"></input>
                      </div>
                    </div>
                  </div>
                  <div className="form-block-inner-block width-full-block">
                    <div className="form-block-inner-block-input">
                      <div className="input-box">
                        <label>IBAN</label>
                        <input
                          type="text"
                          placeholder="PK28SADA0000003092090926"
                        ></input>
                      </div>
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

export default EditProfile;
