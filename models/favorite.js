module.exports = function (sequelize, DataTypes) {
  var Favorite = sequelize.define("Favorite", {
    move: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // eslint-disable-next-line camelcase
    success_mod: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0,
    },
    dmg: {
      type: DataTypes.STRING,
      allowNull: false,
      default: 0,
    },
    // eslint-disable-next-line camelcase
    dmg_mod: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0,
    },
  });

  // Relationships
  Favorite.associate = function (models) {
    Favorite.belongsTo(models.Character, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Favorite;
};
