"use client";

import Input from "@/components/ui/Input";
import { useState, ChangeEvent, use } from "react";
import { login, logout } from "@/redux/features/auth";
import Button from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

export default function Login() {
  const name: string = "username";
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const currentUsername = useAppSelector(
    (state) => state.persistedReducer.auth.value.username
  );
  const isAuth = useAppSelector(
    (state) => state.persistedReducer.auth.value.isAuth
  );

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername((prev) => e.target.value);
  };

  const handleLogin = () => {
    if (username === "") {
      setError("Username is not entered ");
      return;
    } else {
      setError("");
    }
    dispatch(login(username));
  };

  const handleLogout = () => {
    dispatch(logout());
    setUsername("");
  };

  return (
    <div className="md:w-fit text-xs md:text-lg font-roboto flex flex-col justify-start items-center">
      {!isAuth && (
        <div className="flex flex-row  justify-center items-end gap-2 md:gap-4">
          <Input
            classname={[
              "flex flex-col md:flex-row items-center md:gap-2",
              "w-32 md:text-right",
              "outline-none bg-slate-200 text-slate-700 px-4 py-2 md:w-48 w-full rounded-xl",
            ]}
            name={name}
            labelValue={name}
            value={username}
            changeValue={handleUsername}
          />
          <Button
            disabled={false}
            classname="bg-slate-600 text-white  grid place-content-center px-2 py-1 md:px-4 md:py-2 rounded-xl hover:bg-slate-800"
            onClick={handleLogin}
          >
            login
          </Button>
        </div>
      )}
      {isAuth && (
        <div className="flex gap-2 md:gap-4 items-center">
          <p className="w-36 md:w-44 text-right">
            User Name: {currentUsername}
          </p>
          <Button
            disabled={false}
            classname="bg-slate-600 text-white px-4 py-2 rounded-xl hover:bg-slate-800"
            onClick={handleLogout}
          >
            logout
          </Button>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
