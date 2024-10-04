"use client";
import { useCallback, useRef, useEffect } from "react";
import React, { useMemo, useState } from "react";
import CommonPageBLockHub from "@/components/styles/supplier.style";
import Header from "@/components/styles/header.style";
import Link from "next/link";
const ProductAddEdit = () => {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const openProfileDropdown = useCallback(() => {
    setProfileDropdownOpen(true);
  }, []);
  const dropdownRef = useRef(null);
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
        {isProfileDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute z-40 right-8 top-[85px] w-[240px] bg-white border-[1px] br-[8px] rounded-lg px-4 shadow-[0px_1px_3px_rgba(16,_24,_40,_0.1),_0px_1px_2px_rgba(16,_24,_40,_0.06)]"
          >
            <ul className="py-4">
              <a style={{ cursor: "pointer" }}>
                <li className="flex items-center space-x-2 px-2 py-2 hover:bg-gray-100 mb-2 hover:border hover:border-borderbackground rounded-md border border-transparent">
                  <img className="h-6 w-6" src="/images/ic_profile.svg" />
                  <span className="font-inter text-black text-[16px]">
                    Profile
                  </span>
                </li>
              </a>

              <Link href="/">
                <li className="flex items-center space-x-2 px-2 py-2 hover:bg-gray-100 mb-2 hover:border hover:border-borderbackground rounded-md border border-transparent">
                  <img className="h-6 w-6" src="/logout-icon.svg" />
                  <span className="font-inter text-black text-[16px]">
                    Log out
                  </span>
                </li>
              </Link>
            </ul>
          </div>
        )}
      </div>
      <div className="common-block-hub">
        <div className="product-edit-block">
          <div className="product-edit-block-inner">
            <div className="product-edit-block-inner-border">
              <div className="top-block-edit">
                <div className="top-block-edit-inner">
                  <h3>
                    <img src="/notifiaction-block.svg" />
                    <h3>Produktname</h3>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommonPageBLockHub>
  );
};

export default ProductAddEdit;
