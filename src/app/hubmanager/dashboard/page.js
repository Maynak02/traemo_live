"use client";
import { useCallback, useRef, useEffect } from "react";
import React, { useMemo, useState } from "react";
import CommonPageBLockHub from "@/components/styles/hubmanager.style";
import Header from "@/components/styles/header.style";
import Link from "next/link";
import Layers from "../layers/page";
const HubManagerDashboard = () => {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const openProfileDropdown = useCallback(() => {
    setProfileDropdownOpen(true);
  }, []);
  const dropdownRef = useRef(null);

  const [selectButton, setSelectButton] = useState("Dashboard");
  const [isCartDropdownOpen, setCartDropdownOpen] = useState(false);

  const renderSelection = () => {
    return (
      <div className="common-block-hub-menu">
        <ul>
          <li>
            <button
              className={`${selectButton == "Dashboard" ? "active" : ""}`}
              onClick={() => {
                setSelectButton("Dashboard");
              }}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              className={`${selectButton == "Layers" ? "active" : ""}`}
              onClick={() => {
                setSelectButton("Layers");
              }}
            >
              Layers
            </button>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <CommonPageBLockHub>
      <div className="">
        <Header>
          <div className="header-left">
            <div className="logo-header">
              <Link href="/hubmanager/dashboard">
                <img alt="logo" src="/image-1@2x.png" />
              </Link>
            </div>
          </div>
          <div className="header-right">
            <div
              className="header-right-dropdwon"
              onClick={openProfileDropdown}
            >
              <p>Anwar Raza</p>
              <img className="arrow-icon" alt="" src="/chevrondown-2.svg" />
            </div>
          </div>
          {isCartDropdownOpen && (
            <div className="cart-dropdown" ref={cartDropdownRef}>
              <div className="cart-dropdown-inner">
                <div className="cart-dropdown-inner-top">
                  <img alt="" src="/frame.svg"></img>
                  <h5>Wagen</h5>
                </div>
                <div className="cart-dropdown-block">
                  <div className="cart-dropdown-block-inner">
                    <div className="cart-dropdown-block-inner-block">
                      <div className="img-block">
                        <img alt="" src="/cheeseball.png" />
                      </div>
                      <div className="cart-block">
                        <div className="cart-block-left">
                          <h5>Cheese Sandwiches</h5>
                          <p>12 Piece ( 500g )</p>
                        </div>
                        <div className="cart-price">
                          <h3>€3,00</h3>
                          <input type="text" placeholder="1"></input>
                        </div>
                      </div>
                    </div>
                    <div className="cart-dropdown-block-inner-block">
                      <div className="img-block">
                        <img alt="" src="/cheeseball.png" />
                      </div>
                      <div className="cart-block">
                        <div className="cart-block-left">
                          <h5>Cheese Sandwiches</h5>
                          <p>12 Piece ( 500g )</p>
                        </div>
                        <div className="cart-price">
                          <h3>€3,00</h3>
                          <input type="text" placeholder="1"></input>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cart-footer">
                  <button className="btn btn-footer">
                    <img alt="" src="/cart-img.svg" />
                    <p>Proceed to Checkout</p>
                    <h4>€8,00</h4>
                  </button>
                </div>
              </div>
            </div>
          )}
        </Header>
      </div>

      {isProfileDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-40 right-8 top-[85px] w-[240px] bg-white border-[1px] br-[8px] rounded-lg px-4 shadow-[0px_1px_3px_rgba(16,_24,_40,_0.1),_0px_1px_2px_rgba(16,_24,_40,_0.06)]"
        >
          <ul className="py-4">
            <Link href="/customer/wallet">
              <li className="flex items-center space-x-2 px-2 py-2 hover:bg-gray-100 mb-2 hover:border hover:border-borderbackground rounded-md border border-transparent">
                <img className="h-6 w-6" src="/images/ic_wallet.svg" />
                <span className="font-inter text-black text-[16px]">
                  Jetzt aufladen
                </span>
                <span className="text-green-500 font-semibold">€0</span>
              </li>
            </Link>
            <Link href="/customer/profile">
              <li className="flex items-center space-x-2 px-2 py-2 hover:bg-gray-100 mb-2 hover:border hover:border-borderbackground rounded-md border border-transparent">
                <img className="h-6 w-6" src="/images/ic_profile.svg" />
                <span className="font-inter text-black text-[16px]">
                  Profil
                </span>
              </li>
            </Link>
            <Link href="/customer/standingorders">
              <li className="flex items-center space-x-2 px-2 py-2 hover:bg-gray-100 mb-2 hover:border hover:border-borderbackground rounded-md border border-transparent">
                <img className="h-6 w-6" src="/images/ic_premium.svg" />
                <span className="font-inter text-black text-[16px]">
                  Dauerbestellungen
                </span>
              </li>
            </Link>
            <Link href="/customer/address">
              <li className="flex items-center space-x-2 px-2 py-2 hover:bg-gray-100 mb-2 hover:border hover:border-borderbackground rounded-md border border-transparent">
                <img className="h-6 w-6" src="/images/ic_address.svg" />
                <span className="font-inter text-black text-[16px]">
                  Adressen
                </span>
              </li>
            </Link>

            <Link href="/customer/history">
              <li className="flex items-center space-x-2 px-2 py-2 hover:bg-gray-100 mb-2 hover:border hover:border-borderbackground rounded-md border border-transparent">
                <img className="h-6 w-6" src="/images/ic_history.svg" />
                <span className="font-inter text-black text-[16px]">
                  Bestellhistorie
                </span>
              </li>
            </Link>
          </ul>
        </div>
      )}
      <div className="common-block-hub">
        {renderSelection()}
        {selectButton == "Dashboard" ? (
          <div className="dashboard-block-main">
            <div className="dashboard-block-main-inner">
              <div className="dashboard-block-main-inner-block">
                <div className="block-border"></div>
              </div>
              <div className="dashboard-block-main-inner-block">
                <div className="block-border"></div>
              </div>
            </div>
          </div>
        ) : (
          <Layers />
        )}
      </div>
    </CommonPageBLockHub>
  );
};

export default HubManagerDashboard;
