import express from "express";
import * as controller from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.route("/").post(async (req, res, next) => {
  // uuid있는지 체크 create
  const { id } = req.body;
  const today = new Date();
  today.setTime(today.getTime() + 9 * 60 * 60 * 1000);
  const formattedToday = today.toISOString().split("T")[0];
  const isPlayonToday = await controller.findUserByDate(id, formattedToday);
  if (isPlayonToday) {
    res.status(200).json({
      ok: "true",
      msg: "이미 접속 확인함",
    });
    return;
  } else {
    await controller.createUser(id, formattedToday);
    res.status(201).json({
      ok: true,
      msg: "유저 생성완료",
    });
  }

  // uuid에 날짜체크 update
});

userRouter.route("/playTime").post(async (req, res, next) => {
  const { id, playTime } = req.body;
  const today = new Date();
  today.setTime(today.getTime() + 9 * 60 * 60 * 1000);
  const formattedToday = today.toISOString().split("T")[0];
  const isPlayonToday = await controller.findUserByDate(id, formattedToday);
  if (isPlayonToday) {
    console.log(playTime);
    await controller.updateUserPlayTime(id, playTime);
    res.status(202).json({
      ok: true,
      msg: "플레이 타임 업데이트 완료",
    });
  } else {
    res.status(404).json({
      ok: false,
      msg: "update 실패",
    });
  }
});

userRouter.route("/today/play_time/:date").get(async (req, res, next) => {
  const { date } = req.params;
  const users = await controller.findAllUserPlayTimeByDate(date);
  const allTime = users.reduce((prev, cur) => prev + cur.playTime, 0);
  console.log(allTime);
  res.send(`${date}에 한명당 평균 플레이 시간: ${allTime / users.length}초`);
});

userRouter.route("/today/count/:date").get(async (req, res, next) => {
  const { date } = req.params;
  console.log(date);
  const users = await controller.findAllUserByDate(date);
  res.send(`${date} 플레이 명수: ${users.length}`);
});
export default userRouter;
