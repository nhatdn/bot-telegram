import instance from  "./config";

export const apiLogin = (data) => instance.post("/auth/login", data);
export const apiLogout = (data) => instance.post("/auth/logout", data);

// LOGS

export const getListLogsToday = () => instance.get("/log");
export const apiUpdateLogs = (data) => instance.put("/log", data);