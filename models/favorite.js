module.exports = function (sequelize, DataTypes) {
  var Favorite = sequelize.define("Favorite", {
    moveName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // eslint-disable-next-line camelcase
    successMod: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0,
    },

    numDmgDice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0,
    },

    sidesDmgDice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0,
    },

    // eslint-disable-next-line camelcase
    dmgMod: {
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
