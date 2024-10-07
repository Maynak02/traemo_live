// components/Button.js
import styled from "styled-components";
const CommonPageBLockHub = styled.div`
  .common-block-hub {
    position: relative;
    .common-block-hub-menu {
      padding: 16px 32px;
      border-bottom: 1px solid rgba(208, 213, 221, 0.6);
      ul {
        display: flex;
        align-items: center;
        li {
          margin-right: 12px;
          a {
            color: #98a2b3;
            font-size: 14px;
            border: 1px solid transparent;
            border-radius: 8px;
            padding: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 160px;
            &.active-link {
              box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
              border: 1px solid rgba(208, 213, 221, 0.6);
              color: #f9c93c;
            }
          }
        }
      }
    }
    .dashboard-block-main {
      padding: 32px;
      .dashboard-block-main-inner {
        display: flex;
        margin: 0px -15px;
        .dashboard-block-main-inner-block {
          width: 50%;
          padding: 0px 15px;
          .block-border {
            border: 1px solid #d0d5dd;
            border-radius: 24px;
            padding: 32px;
          }
        }
      }
    }
    .dasborad-main {
      position: relative;
      .tabs-block {
        .react-tabs {
          .react-tabs__tab-list {
            margin: 0px 32px;
            padding: 16px 0px;
            border-bottom: 1px solid rgba(208, 213, 221, 0.6);
            .react-tabs__tab {
              border: none;
              padding: 0px;
              .tabs-block-link {
                display: flex;
                align-items: center;
                padding: 8px 16px;
                p {
                  color: #98a2b3;
                  font-size: 14px;
                  padding-left: 8px;
                }
              }
              &.react-tabs__tab--selected {
                .tabs-block-link {
                  border-bottom: 1px solid #ffc93c;
                  svg {
                    path {
                      stroke: #ffc93c;
                    }
                  }
                  p {
                    color: #ffc93c;
                  }
                }
              }
            }
          }
        }

        .tab-panel-block {
          .tab-panel-block-inner {
            .tab-button {
              padding: 12px 32px 16px 32px;
              border-bottom: 1px solid rgba(208, 213, 221, 0.6);
              button {
                padding: 12px 16px;
                font-size: 12px;
                line-height: 14px;
                color: #98a2b3;
                border: none;
                font-weight: 400;
                border-radius: 24px;
                transition: 0.5s;
                &:hover {
                  background-color: rgba(249, 201, 60, 0.15);
                  color: #ffc93c;
                  font-weight: 600;
                }
              }
            }
            .tab-panel-custom {
              padding: 12px 32px;
            }
            .tab-panel-data-block {
              display: flex;
              flex-wrap: wrap;
              margin: 0px -12px;
              .tab-panel-data-block-main {
                width: 20%;
                position: relative;
                padding: 0px 12px 24px;
                .tab-panel-data-block-inner {
                  background-color: #ffffff;
                  box-shadow: 0px 3px 6px rgba(148, 163, 184, 0.3);
                  border-radius: 12px;
                  border: 1px solid #d0d5dd;
                  .block-img-tab {
                    width: 100%;
                    height: 266px;
                    position: relative;
                    > img {
                      width: 100%;
                      height: 100%;
                      object-fit: contain;
                    }
                    .plus-icon {
                      position: absolute;
                      bottom: 12px;
                      right: 12px;
                      a {
                        width: 52px;
                        height: 52px;
                        border-radius: 8px;
                        background-color: #ffffff;
                        box-shadow: 0px 3px 6px rgba(148, 163, 184, 0.3);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border: 1px solid #d0d5dd;
                      }
                    }
                  }
                  .block-content {
                    padding: 24px 12px 0px 12px;
                    display: flex;
                    align-items: center;
                    .block-content-left {
                      border-radius: 8px;
                      padding: 7px 8px;
                      border: 1px solid #d0d5dd;
                      display: flex;
                      background-color: #f6fef9;
                      align-items: center;
                      margin-right: 12px;
                      h3 {
                        font-size: 24px;
                        line-height: 26px;
                        font-weight: 600;
                        color: #027a48;
                        &:last-child {
                          font-weight: 400;
                          font-size: 10px;
                          line-height: 10px;
                          text-transform: uppercase;
                          padding-left: 5px;
                        }
                      }
                    }
                    .block-content-right {
                      display: flex;
                      align-items: center;
                      h5 {
                        color: #667085;
                        font-weight: 600;
                        font-size: 14px;
                      }
                      h6 {
                        color: #667085;
                        padding-left: 2px;
                        font-size: 8px;
                        line-height: 8px;
                        font-weight: 400;
                        text-transform: uppercase;
                      }
                    }
                  }
                  .bottom-content {
                    padding: 12px 12px 24px 12px;
                    h3 {
                      font-size: 16px;
                      line-height: 20px;
                      color: #000;
                      font-weight: 700;
                      margin-bottom: 5px;
                    }
                    p {
                      color: #667085;
                      font-size: 12px;
                      line-height: 14px;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .plus-icon {
        position: absolute;
        bottom: 160px;
        right: 20px;

        .add-icon-button {
          width: 52px;
          height: 52px;
          border-radius: 8px;
          background-color: #fff;
          border: 1px solid rgba(208, 213, 221, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
        }
      }
    }
    .product-edit-block {
      padding: 32px;
      position: relative;
      display: flex;
      margin: 0px -15px;
      .product-edit-block-inner {
        width: 60%;
        padding: 0px 15px;
        .product-edit-block-inner-border {
          padding: 32px 20px;
          border: 1px solid #d0d5dd;
          border-radius: 12px;
        }
      }
    }
  }
`;

export default CommonPageBLockHub;
