import axios from "axios";

const baseURL = "https://randomuser.me/api";

export const apiMethod = {
  getHowManyUsers(number = 3010) {
    return axios.get(baseURL, {
      params: {
        results: String(number),
      },
    });
  },
};
