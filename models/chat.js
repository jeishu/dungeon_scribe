module.exports = function (sequelize, DataTypes) {
  var Chat = sequelize.define("Chat", {
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
    }
  });

  // Relationships
  Chat.associate = function (models) {
    Chat.belongsTo(models.User, {
      onDelete: "cascade",
    });

    Chat.belongsTo(models.Session, {
      onDelete: "cascade",
    });

    Chat.belongsTo(models.Character, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Chat;
};