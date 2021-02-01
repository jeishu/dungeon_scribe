module.exports = function (sequelize, DataTypes) {
  var Session = sequelize.define("Session", {
    sessionName: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  // Relationships
  Session.associate = function (models) {
    Session.hasMany(models.User, {
      onDelete: "cascade",
    });

    Session.hasMany(models.Chat, {
      onDelete: "cascade",
    });

  };

  return Session;
};