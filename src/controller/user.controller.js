import User from "../../models/user.js";
import { Op, where } from "sequelize";

//create
export const createUser = async (id, date) => {
  return await User.create({
    uuid: id,
    date,
    playTime: 0,
  });
};

// read
export const findUser = async id => {
  return await User.findOne({
    where: {
      uuid: id,
    },
  });
};
export const findUserByDate = async (id, date) => {
  return await User.findOne({
    where: {
      uuid: id,
      date: date,
    },
  });
};

export const findAllUserByDate = async date => {
  return await User.findAll({
    where: {
      date,
    },
  });
};

export const findAllUserPlayTimeByDate = async date => {
  return await User.findAll({
    where: {
      date,
    },
  });
};

//update
export const updateUserPlayTime = async (id, playTime) => {
  return await User.update(
    { playTime },
    {
      where: {
        uuid: id,
      },
    }
  );
};
