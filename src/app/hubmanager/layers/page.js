"use client";
import { useCallback, useRef, useEffect } from "react";
import React, { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import CommonPageBLockHub from "@/components/styles/hubmanager.style";
import Header from "@/components/styles/header.style";
import Link from "next/link";
import { useRouter, usePathname, useServerInsertedHTML } from "next/navigation";

// import './style.css';
const Layers = () => {
  const router = useRouter();
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const openProfileDropdown = useCallback(() => {
    setProfileDropdownOpen(true);
  }, []);
  const dropdownRef = useRef(null);

  const [isCartDropdownOpen, setCartDropdownOpen] = useState(false);
  const closedDays = [
    // new Date(2024, 10, 25), // July 17
    // new Date(2024, 9, 15), // July 27
  ];

  const weekendDays = [
    // new Date(2024, 10, 25),
    // new Date(2024, 9, 11), // July 17
    // new Date(2024, 9, 16), // July 27
  ];
  const modifiers = {
    closed: closedDays,
    weekend: weekendDays,
  };
  const modifiersStyles = {
    closed: { color: "white", backgroundColor: "#f00" },
    weekend: { color: "#7734EB", backgroundColor: "#F0F0FF" },
  };
  const [selected, setSelected] = useState(new Date());

  return (
    <div className="">
      <CommonPageBLockHub>
        <div className="">
          <Header>
            <div className="header-left">
              <div className="logo-header">
                <a>
                  <img alt="logo" src="/image-1@2x.png" />
                </a>
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
          </Header>
        </div>

        {isProfileDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute z-40 right-8 top-[85px] w-[240px] bg-white border-[1px] br-[8px] rounded-lg px-4 shadow-[0px_1px_3px_rgba(16,_24,_40,_0.1),_0px_1px_2px_rgba(16,_24,_40,_0.06)]"
          >
            <ul className="py-4">
              <a
                onClick={() => router.push("/hubmanager/editprofile")}
                style={{ cursor: "pointer" }}
              >
                <li className="flex items-center space-x-2 px-2 py-2 hover:bg-gray-100 mb-2 hover:border hover:border-borderbackground rounded-md border border-transparent">
                  <img className="h-6 w-6" src="/images/ic_profile.svg" />
                  <span className="font-inter text-black text-[16px]">
                    Profil
                  </span>
                </li>
              </a>

              <a onClick={() => router.push("/")} style={{ cursor: "pointer" }}>
                <li className="flex items-center space-x-2 px-2 py-2 hover:bg-gray-100 mb-2 hover:border hover:border-borderbackground rounded-md border border-transparent">
                  <img className="h-6 w-6" src="/logout-icon.svg" />
                  <span className="font-inter text-black text-[16px]">
                    Abmelden
                  </span>
                </li>
              </a>
            </ul>
          </div>
        )}
        <div className="common-block-hub">
          <div className="common-block-hub-menu">
            <ul>
              <li>
                <a
                  onClick={() => router.push("/hubmanager/dashboard")}
                  style={{ cursor: "pointer" }}
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a className="active-link">Schichten</a>
              </li>
            </ul>
          </div>
          <div className="common-calender-page">
            <div className="calender-block">
              <DayPicker
                mode="single"
                // selected={selected}
                // onSelect={setSelected}
                // month={new Date(2024, 9)}
                numberOfMonths={3}
                // pagedNavigation
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
                onSelect={() => {
                  router.push("/hubmanager/orderlist");
                }}
              />
            </div>
          </div>
          <div className="label-block-close">
            <div className="label-block-close-block">
              <div className="label-block-close-inner">
                <span></span>
                <h3>Geschlossen</h3>
              </div>
              <div className="label-block-close-inner weekend-block">
                <span></span>
                <h3>Wochenende</h3>
              </div>
              <div className="label-block-close-inner open-block">
                <span></span>
                <h3>Offen</h3>
              </div>
            </div>
          </div>
        </div>
      </CommonPageBLockHub>
    </div>
  );
};

export default Layers;
