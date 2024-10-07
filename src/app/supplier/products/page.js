"use client";
import { useCallback, useRef, useEffect } from "react";
import React, { useMemo, useState } from "react";
import CommonPageBLockHub from "@/components/styles/supplier.style";
import Header from "@/components/styles/header.style";
import Link from "next/link";
import "../../globals.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useRouter, usePathname, useServerInsertedHTML } from "next/navigation";
const ProductList = () => {
  const router = useRouter();
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const openProfileDropdown = useCallback(() => {
    setProfileDropdownOpen(true);
  }, []);
  const dropdownRef = useRef(null);

  const searchingArr = [...Array(7).keys()].map((i) => i + 1);

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
        <div className="dasborad-main">
          <div className="tabs-block">
            <Tabs>
              <TabList>
                <Tab>
                  <div className="tabs-block-link">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.0596 13.4468C17.3476 12.1589 17.9916 11.5149 18.2312 10.6794C18.4708 9.84385 18.266 8.95643 17.8564 7.18164L17.6203 6.15816C17.2757 4.66503 17.1034 3.91845 16.5922 3.40722C16.0809 2.89599 15.3344 2.7237 13.8412 2.37913L12.8177 2.14294C11.043 1.73338 10.1555 1.52859 9.32004 1.76822C8.48454 2.00783 7.84054 2.65181 6.55262 3.93975L5.02796 5.46445C2.78712 7.70528 1.66671 8.82568 1.66671 10.2179C1.66671 11.6102 2.78712 12.7306 5.02796 14.9714C7.26879 17.2123 8.38921 18.3327 9.78146 18.3327C11.1737 18.3327 12.2941 17.2123 14.5349 14.9714L16.0596 13.4468Z"
                        stroke="#98A2B3"
                      />
                      <path
                        d="M12.3417 7.65816C11.5657 6.88212 10.4124 6.77733 9.76562 7.42394C9.11901 8.07068 9.2238 9.224 9.99983 10C10.7759 10.7759 10.8808 11.9293 10.234 12.576C9.58731 13.2227 8.43399 13.1178 7.65809 12.3418M12.3417 7.65816L12.81 7.18973M12.3417 7.65816C12.8729 8.18938 13.0897 8.89732 12.9661 9.49862M7.65809 12.3418L7.18966 12.8102M7.65809 12.3418C7.2192 11.903 6.99506 11.3436 6.99996 10.8234"
                        stroke="#98A2B3"
                        stroke-linecap="round"
                      />
                    </svg>
                    <p>Pastries</p>
                  </div>
                </Tab>
                <Tab>
                  <div className="tabs-block-link">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_850_2037)">
                        <path
                          d="M19.7669 9.15586C19.6171 8.75281 19.3985 8.37281 19.1278 8.03047C18.3076 6.99137 17.0328 6.22297 15.4813 5.69063C15.3692 5.65324 15.2539 5.61559 15.1389 5.58129C14.5403 5.3941 13.9042 5.2443 13.2392 5.13215C12.2549 4.9652 11.2074 4.87891 10.1166 4.87891H9.92662C9.28185 4.88453 8.6517 4.92219 8.04154 4.98543C6.9651 5.10039 5.94904 5.30191 5.02236 5.58973C4.48693 5.75105 3.98049 5.94387 3.51135 6.15973C3.36181 6.22887 3.21482 6.30082 3.07092 6.37559C2.16732 6.85027 1.41041 7.43465 0.866542 8.13391C0.322401 8.83344 -0.0027944 9.66516 1.80954e-05 10.5603V10.589C0.00310403 11.0266 0.0834946 11.4468 0.236112 11.8265C0.50369 12.5002 0.990213 13.0469 1.5976 13.4699C2.51275 14.1059 3.70697 14.5034 5.08865 14.7594C6.47291 15.0154 8.05021 15.122 9.72506 15.122C9.82881 15.122 9.93529 15.122 10.0387 15.1191C12.6579 15.0961 15.0411 14.837 16.8514 14.1663C17.7578 13.8268 18.5291 13.3807 19.0991 12.7678C19.381 12.4597 19.6115 12.1087 19.7669 11.72C19.9224 11.3315 20.0028 10.9086 19.9999 10.4625V10.4336C19.9972 9.99035 19.9165 9.55863 19.7669 9.15586ZM18.7048 10.4625C18.7048 10.7559 18.6559 11.0092 18.5637 11.2394C18.4026 11.6424 18.1033 12.0022 17.6342 12.3274C16.9377 12.8167 15.8669 13.2023 14.5546 13.4468C13.2423 13.6945 11.6908 13.8125 10.0303 13.824C9.92658 13.8268 9.82596 13.8268 9.72506 13.8268C7.25564 13.8296 5.04818 13.5795 3.53717 13.0123C2.78025 12.7332 2.20748 12.3791 1.8449 11.982C1.66365 11.7835 1.53123 11.5733 1.43904 11.3459C1.34713 11.1185 1.29822 10.8681 1.29514 10.5803V10.5603C1.29514 9.97602 1.49103 9.44367 1.88818 8.92848C2.3601 8.31547 3.13724 7.74828 4.14178 7.29352C4.50998 8.01023 4.80928 8.69238 5.04541 9.25648C5.47994 10.2841 6.38947 9.92707 6.15928 8.96305C6.02971 8.40457 5.8858 7.68223 5.54627 6.78145C6.46732 6.51074 7.50049 6.32355 8.60846 6.23449C8.99998 7.19289 9.28779 8.10805 9.50646 8.845C9.84908 9.99035 10.8879 9.72277 10.7614 8.66934C10.6863 8.03918 10.6203 7.22469 10.344 6.17688C11.5239 6.1884 12.6437 6.31516 13.6538 6.53102C13.8669 7.3627 14.0164 8.13984 14.1316 8.78742C14.3444 9.97606 15.395 9.81781 15.3835 8.74133C15.3807 8.27223 15.3922 7.70813 15.3346 7.01445C15.6944 7.14965 16.0311 7.29664 16.3391 7.45488C17.1131 7.85203 17.7118 8.32391 18.1062 8.8307C18.5033 9.33715 18.6992 9.86078 18.7048 10.4423L18.7048 10.4625Z"
                          fill="#98a2b3"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_850_2037">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <p>Outbreak</p>
                  </div>
                </Tab>
                <Tab>
                  <div className="tabs-block-link">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 8.33333V5.83333M10 5.83333C10.9205 5.83333 11.6667 5.08714 11.6667 4.16667C11.6667 3.24619 10.4167 1.25 10 1.25C9.58337 1.25 8.33337 3.24619 8.33337 4.16667C8.33337 5.08714 9.07954 5.83333 10 5.83333ZM16.6667 12.5L16.3065 13.0367C15.6958 13.947 14.3456 13.9125 13.782 12.9722L13.7494 12.9177C13.1836 11.9738 11.8159 11.9736 11.2497 12.9172C10.6837 13.8606 9.31621 13.8603 8.75021 12.9169C8.18402 11.9733 6.81623 11.973 6.25004 12.9167L6.21675 12.9722C5.65151 13.9142 4.29767 13.9464 3.68825 13.0323L3.33337 12.5M16.6667 17.5V11.6667C16.6667 9.82575 15.1743 8.33333 13.3334 8.33333H6.66671C4.82576 8.33333 3.33337 9.82575 3.33337 11.6667V17.5H16.6667Z"
                        stroke="#98A2B3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>Cake</p>
                  </div>
                </Tab>
              </TabList>

              <TabPanel>
                <div className="tab-panel-block">
                  <div className="tab-panel-block-inner">
                    <div className="tab-button">
                      <button>Frisches Brot</button>
                      <button>Fresh Bread Rolls</button>
                    </div>
                    <div className="tab-panel-custom">
                      <div className="tab-panel-data-block">
                        {searchingArr.map((data) => (
                          <div className="tab-panel-data-block-main" key={data}>
                            <div className="tab-panel-data-block-inner">
                              <div className="block-img-tab">
                                <img alt="" src="/cheeseball.png" />
                                <div className="plus-icon">
                                  <a
                                    onClick={() =>
                                      router.push("/supplier/product-details")
                                    }
                                    style={{ cursor: "pointer" }}
                                  >
                                    <img alt="" src="/edit-icon.svg" />
                                  </a>
                                </div>
                              </div>
                              <div className="block-content">
                                <div className="block-content-left">
                                  <h3>30.30</h3>
                                  <h3>CHF</h3>
                                </div>
                              </div>
                              <div className="bottom-content">
                                <h3>Cheese Sandwiches</h3>
                                <p>12 pieces ( 500g )</p>
                              </div>
                            </div>
                          </div>
                        ))}
                        {/* <div className="tab-panel-data-block-main">
                          <div className="tab-panel-data-block-inner">
                            <div className="block-img-tab">
                              <img alt="" src="/cheeseball.png" />
                              <div className="plus-icon">
                                <Link href="">
                                  <img alt="" src="/edit-icon.svg" />
                                </Link>
                              </div>
                            </div>
                            <div className="block-content">
                              <div className="block-content-left">
                                <h3>30.30</h3>
                                <h3>CHF</h3>
                              </div>
                            </div>
                            <div className="bottom-content">
                              <h3>Cheese Sandwiches</h3>
                              <p>12 pieces ( 500g )</p>
                            </div>
                          </div>
                        </div>
                        <div className="tab-panel-data-block-main">
                          <div className="tab-panel-data-block-inner">
                            <div className="block-img-tab">
                              <img alt="" src="/cheeseball.png" />
                              <div className="plus-icon">
                                <Link href="">
                                  <img alt="" src="/edit-icon.svg" />
                                </Link>
                              </div>
                            </div>
                            <div className="block-content">
                              <div className="block-content-left">
                                <h3>30.30</h3>
                                <h3>CHF</h3>
                              </div>
                            </div>
                            <div className="bottom-content">
                              <h3>Cheese Sandwiches</h3>
                              <p>12 pieces ( 500g )</p>
                            </div>
                          </div>
                        </div>
                        <div className="tab-panel-data-block-main">
                          <div className="tab-panel-data-block-inner">
                            <div className="block-img-tab">
                              <img alt="" src="/cheeseball.png" />
                              <div className="plus-icon">
                                <Link href="">
                                  <img alt="" src="/edit-icon.svg" />
                                </Link>
                              </div>
                            </div>
                            <div className="block-content">
                              <div className="block-content-left">
                                <h3>30.30</h3>
                                <h3>CHF</h3>
                              </div>
                            </div>
                            <div className="bottom-content">
                              <h3>Cheese Sandwiches</h3>
                              <p>12 pieces ( 500g )</p>
                            </div>
                          </div>
                        </div>
                        <div className="tab-panel-data-block-main">
                          <div className="tab-panel-data-block-inner">
                            <div className="block-img-tab">
                              <img alt="" src="/cheeseball.png" />
                              <div className="plus-icon">
                                <Link href="">
                                  <img alt="" src="/edit-icon.svg" />
                                </Link>
                              </div>
                            </div>
                            <div className="block-content">
                              <div className="block-content-left">
                                <h3>30.30</h3>
                                <h3>CHF</h3>
                              </div>
                            </div>
                            <div className="bottom-content">
                              <h3>Cheese Sandwiches</h3>
                              <p>12 pieces ( 500g )</p>
                            </div>
                          </div>
                        </div>
                        <div className="tab-panel-data-block-main">
                          <div className="tab-panel-data-block-inner">
                            <div className="block-img-tab">
                              <img alt="" src="/cheeseball.png" />
                              <div className="plus-icon">
                                <Link href="">
                                  <img alt="" src="/edit-icon.svg" />
                                </Link>
                              </div>
                            </div>
                            <div className="block-content">
                              <div className="block-content-left">
                                <h3>30.30</h3>
                                <h3>CHF</h3>
                              </div>
                            </div>
                            <div className="bottom-content">
                              <h3>Cheese Sandwiches</h3>
                              <p>12 pieces ( 500g )</p>
                            </div>
                          </div>
                        </div>
                        <div className="tab-panel-data-block-main">
                          <div className="tab-panel-data-block-inner">
                            <div className="block-img-tab">
                              <img alt="" src="/cheeseball.png" />
                              <div className="plus-icon">
                                <Link href="">
                                  <img alt="" src="/edit-icon.svg" />
                                </Link>
                              </div>
                            </div>
                            <div className="block-content">
                              <div className="block-content-left">
                                <h3>30.30</h3>
                                <h3>CHF</h3>
                              </div>
                            </div>
                            <div className="bottom-content">
                              <h3>Cheese Sandwiches</h3>
                              <p>12 pieces ( 500g )</p>
                            </div>
                          </div>
                        </div>
                        <div className="tab-panel-data-block-main">
                          <div className="tab-panel-data-block-inner">
                            <div className="block-img-tab">
                              <img alt="" src="/cheeseball.png" />
                              <div className="plus-icon">
                                <Link href="">
                                  <img alt="" src="/edit-icon.svg" />
                                </Link>
                              </div>
                            </div>
                            <div className="block-content">
                              <div className="block-content-left">
                                <h3>30.30</h3>
                                <h3>CHF</h3>
                              </div>
                            </div>
                            <div className="bottom-content">
                              <h3>Cheese Sandwiches</h3>
                              <p>12 pieces ( 500g )</p>
                            </div>
                          </div>
                        </div>
                        <div className="tab-panel-data-block-main">
                          <div className="tab-panel-data-block-inner">
                            <div className="block-img-tab">
                              <img alt="" src="/cheeseball.png" />
                              <div className="plus-icon">
                                <Link href="">
                                  <img alt="" src="/edit-icon.svg" />
                                </Link>
                              </div>
                            </div>
                            <div className="block-content">
                              <div className="block-content-left">
                                <h3>30.30</h3>
                                <h3>CHF</h3>
                              </div>
                            </div>
                            <div className="bottom-content">
                              <h3>Cheese Sandwiches</h3>
                              <p>12 pieces ( 500g )</p>
                            </div>
                          </div>
                        </div>
                        <div className="tab-panel-data-block-main">
                          <div className="tab-panel-data-block-inner">
                            <div className="block-img-tab">
                              <img alt="" src="/cheeseball.png" />
                              <div className="plus-icon">
                                <Link href="">
                                  <img alt="" src="/edit-icon.svg" />
                                </Link>
                              </div>
                            </div>
                            <div className="block-content">
                              <div className="block-content-left">
                                <h3>30.30</h3>
                                <h3>CHF</h3>
                              </div>
                            </div>
                            <div className="bottom-content">
                              <h3>Cheese Sandwiches</h3>
                              <p>12 pieces ( 500g )</p>
                            </div>
                          </div>
                        </div>
                        <div className="tab-panel-data-block-main">
                          <div className="tab-panel-data-block-inner">
                            <div className="block-img-tab">
                              <img alt="" src="/cheeseball.png" />
                              <div className="plus-icon">
                                <Link href="">
                                  <img alt="" src="/edit-icon.svg" />
                                </Link>
                              </div>
                            </div>
                            <div className="block-content">
                              <div className="block-content-left">
                                <h3>30.30</h3>
                                <h3>CHF</h3>
                              </div>
                            </div>
                            <div className="bottom-content">
                              <h3>Cheese Sandwiches</h3>
                              <p>12 pieces ( 500g )</p>
                            </div>
                          </div>
                        </div>
                        <div className="tab-panel-data-block-main">
                          <div className="tab-panel-data-block-inner">
                            <div className="block-img-tab">
                              <img alt="" src="/cheeseball.png" />
                              <div className="plus-icon">
                                <Link href="">
                                  <img alt="" src="/edit-icon.svg" />
                                </Link>
                              </div>
                            </div>
                            <div className="block-content">
                              <div className="block-content-left">
                                <h3>30.30</h3>
                                <h3>CHF</h3>
                              </div>
                            </div>
                            <div className="bottom-content">
                              <h3>Cheese Sandwiches</h3>
                              <p>12 pieces ( 500g )</p>
                            </div>
                          </div>
                        </div>
                        <div className="tab-panel-data-block-main">
                          <div className="tab-panel-data-block-inner">
                            <div className="block-img-tab">
                              <img alt="" src="/cheeseball.png" />
                              <div className="plus-icon">
                                <Link href="">
                                  <img alt="" src="/edit-icon.svg" />
                                </Link>
                              </div>
                            </div>
                            <div className="block-content">
                              <div className="block-content-left">
                                <h3>30.30</h3>
                                <h3>CHF</h3>
                              </div>
                            </div>
                            <div className="bottom-content">
                              <h3>Cheese Sandwiches</h3>
                              <p>12 pieces ( 500g )</p>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <h2>2</h2>
              </TabPanel>
              <TabPanel>
                <h2>3</h2>
              </TabPanel>
              <TabPanel>
                <h2>4</h2>
              </TabPanel>
              <TabPanel>
                <h2>5</h2>
              </TabPanel>
              <TabPanel>
                <h2>6</h2>
              </TabPanel>
              <TabPanel>
                <h2>7</h2>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </CommonPageBLockHub>
  );
};

export default ProductList;
