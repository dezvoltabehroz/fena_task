import axios from "axios";
import { baseURL } from "../config/config";

export const postCampaign = async (values) => {
  const res = await axios.post(`${baseURL}/campaigns`, values);
  return res.data;
};

export const viewCampaigns = async () => {
  const res = await axios.get(`${baseURL}/campaigns`);
  return res.data;
};
