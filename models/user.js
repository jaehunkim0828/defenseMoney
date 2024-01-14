import { Sequelize } from "sequelize";

export default class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        uuid: {
          type: Sequelize.STRING(128),
          allowNull: false, // null 허용
        },
        date: {
          type: Sequelize.STRING(64),
          allowNull: false,
        },
        playTime: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
}
