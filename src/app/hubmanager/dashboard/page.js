"use client";
import { useCallback, useRef, useEffect } from "react";
import React, { useMemo, useState } from "react";
import CommonPageBLockHub from "@/components/styles/hubmanager.style";
import Header from "@/components/styles/header.style";
import Link from "next/link";
import { useRouter, usePathname, useServerInsertedHTML } from "next/navigation";

const HubManagerDashboard = () => {
  const router = useRouter();
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const openProfileDropdown = useCallback(() => {
    setProfileDropdownOpen(true);
  }, []);
  const dropdownRef = useRef(null);

  const [isCartDropdownOpen, setCartDropdownOpen] = useState(false);
  return (
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
            {/* <Link href="/customer/profile"> */}
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
            {/* </Link> */}

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
              <a className="active-link">Dashboard</a>
            </li>
            <li>
              <a
                onClick={() => router.push("/hubmanager/layers")}
                style={{ cursor: "pointer" }}
              >
                Schichten
              </a>
            </li>
          </ul>
        </div>
        <div className="dashboard-block-main">
          <div className="dashboard-block-main-inner">
            <div className="dashboard-block-main-inner-block">
              <div
                className="block-border text-center"
                style={{ padding: "150px 0" }}
              >
                Under Development
                {/* <iframe
                  width="100%"
                  height="570"
                  src="https://www.knowi.com/d/3PY7S3L2iiTU3RQsYFismzp4g81THngoov06oNe1njlU0ie"
                  frameborder="0"
                  allowfullscreen
                ></iframe> */}
              </div>
            </div>
            <div className="dashboard-block-main-inner-block">
              <div
                className="block-border text-center"
                style={{ padding: "150px 0" }}
              >
                <h2>Under Development</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommonPageBLockHub>
  );
};

export default HubManagerDashboard;
