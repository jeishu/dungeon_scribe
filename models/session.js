module.exports = function (sequelize, DataTypes) {
  var Session = sequelize.define("Session", {
    sessionName: {
      type: DataTypes.TEXT,
      allowNull: false,
      // unique: true,
    },
  });

  // Relationships
  Session.associate = function (models) {
    Session.belongsToMany(models.User, {
      through: "User_Sessions" //,
      // foreignKey: {
      //   allowNull: false,
      // },
    });

    Session.hasMany(models.Chat, {
      onDelete: "cascade",
    });
  };

  return Session;
};
