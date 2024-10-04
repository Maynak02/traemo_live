"use client";
import React, { useEffect } from "react";
import { getData } from "@/utils/storage";
import { useRouter, usePathname, useServerInsertedHTML } from "next/navigation";
import { useDispatch } from "react-redux";
import { getUserAction } from "@/redux/Auth/action";

const Authlayout = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const tmpFunc = async () => {
      const tokenData = getData("token");
      const { payload: res } = await dispatch(getUserAction());
      console.log("userData", res?.data);
      if (res?.data?.id) {
        router.push("/hubmanager/dashboard");
      }
    };
    tmpFunc();
  }, []);
  return <> {children}</>;
};

export default Authlayout;
