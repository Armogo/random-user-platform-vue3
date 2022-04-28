import axios from "axios";

const baseURL = "https://randomuser.me/api";

export const apiMethod = {
  getHowManyUsers(number) {
    return axios.get(baseURL, {
      params: {
        results: String(number),
      },
    });
  },
};
