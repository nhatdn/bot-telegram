import React, { useEffect } from "react";

export const Authentication = ({
    noneAuth,
    auth
}) => {
    return localStorage.getItem("t") ? auth : noneAuth;
}