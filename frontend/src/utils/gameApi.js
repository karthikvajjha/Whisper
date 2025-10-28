import {axiosInstance as API} from "./axiosInstance";




export const updateGameScore = async (change) => {
  const res = await API.patch("/game/patch/updatescore", { change });
  return res.data;
};


export const resetGameScore = async () => {
  const res = await API.patch("/game/patch/resetscore");
  return res.data;
};


export const getLeaderboard = async () => {
  const res = await API.get("/game/get/leaderboard");
  return res.data.topUsers;
};
