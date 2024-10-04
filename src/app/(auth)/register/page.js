/** @format */

"use client";
import React, { useMemo, useState } from "react";

import Link from "next/link";
import LoginMain from "@/components/styles/auth.style";
import "../../globals.css";
import { toast } from "react-toastify";
import { TOAST_ALERTS } from "@/constants/keywords";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { createUserAction } from "@/redux/Auth/action";
import { FormProvider, RHFTextInput } from "@/components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const { t } = useTranslation("common");

  const defaultValues = useMemo(
    () => ({
      email: "",
      firstname: "",
      lastname: "",
    }),
    []
  );

  const formSchema = useMemo(() => {
    return yup
      .object()
      .shape({
        firstname: yup.string().required(t("enterFname")).trim(t("enterFname")),
        lastname: yup.string().required(t("enterLname")).trim(t("enterLname")),
        email: yup
          .string()
          .required(t("enterEmail"))
          .email(t("validEmail"))
          .trim(t("validEmail"))
          .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, t("validEmail")),
      })
      .required()
      .strict(true);
  }, []);

  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setValue,
  } = methods;

  const onSubmitForm = async (formData) => {
    const { email, firstname, lastname } = formData;

    setIsLoading(true);
    const objParam = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      locale: "de_CH",
    };
    console.log("payload==>", objParam);

    try {
      const { payload: res } = await dispatch(createUserAction(objParam));
      const { data, status, message } = res;
      if (status) {
        setIsLoading(false);
        router.push("/login");
      } else {
        setIsLoading(false);
        toast.error(message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(TOAST_ALERTS.ERROR_MESSAGE);
      console.log("Error", error);
    }
  };

  return (
    <LoginMain>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="login-main">
          <div className="login-main-inner">
            <h1>{t("Register")}</h1>
            <FormProvider
              methods={methods}
              onSubmit={handleSubmit(onSubmitForm)}
              className="mt-[20px] mb-[40px]"
            >
              <div className="form-login">
                <div className="two-from-group">
                  <div className="form-group">
                    <RHFTextInput name="firstname" placeholder={t("fname")} />
                  </div>
                  <div className="form-group">
                    <RHFTextInput name="lastname" placeholder={t("lname")} />
                  </div>
                </div>
                <div className="form-group">
                  <RHFTextInput name="email" placeholder={t("EmailAddress")} />
                </div>
                {/* <div className="two-from-group">
                  <div className="form-group">
                    <RHFTextInput name="gender" placeholder={t("gender")} />
                  </div>
                  <div className="form-group">
                    <RHFTextInput name="country" placeholder={t("country")} />
                  </div>
                </div>
                <div className="two-from-group">
                  <div className="form-group">
                    <RHFTextInput name="state" placeholder={t("state")} />
                  </div>
                  <div className="form-group">
                    <RHFTextInput name="city" placeholder={t("city")} />
                  </div>
                </div>
                <div className="two-from-group">
                  <div className="form-group">
                    <RHFTextInput name="house" placeholder={t("house")} />
                  </div>
                  <div className="form-group">
                    <RHFTextInput
                      name="postal_code"
                      placeholder={t("postalcode")}
                    />
                  </div>
                </div> */}
                <div className="btn-form">
                  <button className="btn button-common">{t("Register")}</button>
                </div>
                <div className="last-link">
                  <p>
                    {t("AlreadyAccount")}{" "}
                    <Link href="/login">{t("SignIn")}</Link>
                  </p>
                </div>
              </div>
            </FormProvider>
          </div>
        </div>
      )}
    </LoginMain>
  );
};

export default RegisterPage;
