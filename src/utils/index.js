import { message } from "antd";
export const copyText = (text) => {
    navigator.clipboard.writeText(text);
    message.success("Copy text thành công!");
}