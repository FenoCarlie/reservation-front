import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia";
import { MdOutlinePermIdentity } from "react-icons/md";
import { useNotificationContext } from "../../contexts/NotificationContext";

function Login() {
  const { translate } = useLanguage();
  //const { token } = useStateContext;
  const { addNotification } = useNotificationContext();
  const field = useRef();
  const [passwordType, setPasswordType] = useState("password");

  const switchPassword = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  const authenticate = async (event) => {
    event.preventDefault();

    const payload = {
      identification: field.current.identification.value,
      password: field.current.password.value,
    };

    if ((payload.identification && payload.password) == "") {
      addNotification(translate(`notification.fieldEmpty`), "information");
    } else if (payload.identification == "") {
      addNotification(
        translate(`notification.identificationEmpty`),
        "information"
      );
    } else if (payload.password == "") {
      addNotification(translate(`notification.passwordEmpty`), "information");
    } else {
      try {
        //const response = await axiosClient.post("", payload);
        addNotification(translate(`notification.logIn.succes`), "information");
      } catch (error) {
        const response = error.response;
        if (response && response.status === 422) {
          alert(response.data.message);
        }
      }
    }

    console.log(payload);
  };

  return (
    <div className="flex flex-col items-center justify-center w-auto h-auto font-barlow bg-gray-800 p-14 rounded-md">
      <h1 className="absolute top-48 text-white text-5xl font-northwell">
        Les Saveurs Enchantées
      </h1>
      <label className="text-white text-2xl border-b-[1px] border-[#4e5b6dbd]">
        {translate(`button.authenticate`)}
      </label>
      <form
        ref={field}
        onSubmit={authenticate}
        className="mt-14 w-[35vh] flex flex-col items-center"
      >
        <span className="relative w-full">
          <input
            placeholder={translate(`information.identification`)}
            type="text"
            id="identification"
            name="identification"
            className="py pl-2 mb-10 border-b-[1px] border-[#4e5b6dbd] w-full bg-transparent text-white text-lg"
          />
          <MdOutlinePermIdentity className="absolute right-2 top-0 w-6 h-6 text-[#4e5b6dbd]" />
        </span>
        <span className="relative w-full">
          <input
            placeholder={translate(`information.password`)}
            type={passwordType == "password" ? "password" : "text"}
            id="password"
            name="password"
            className="py pl-2 mb-10 border-b-[1px] border-[#4e5b6dbd] w-full bg-transparent text-white text-lg"
          />
          {passwordType == "password" ? (
            <LiaEyeSlashSolid
              className="absolute right-2 top-0 w-6 h-6 text-[#4e5b6dbd]"
              onClick={switchPassword}
            />
          ) : (
            <LiaEyeSolid
              className="absolute right-2 top-0 w-6 h-6 text-[#4e5b6dbd]"
              onClick={switchPassword}
            />
          )}
        </span>
        <button
          type="submit"
          className="px-6 p-2 text-white text-md bg-[#9a2323] hover:bg-[#972b2b] rounded"
        >
          {translate(`button.validate`)}
        </button>
      </form>
    </div>
  );
}

export default Login;
