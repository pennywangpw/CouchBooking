'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.hasMany(
        models.Spot,{foreignKey: 'reviewId',onDelete: 'CASCADE', hooks: true}
      )

      //doesn't work for me
      // Review.belongsTo(
      //   models.User,{foreignKey: 'userId'}
      // )

      // Review.belongsTo(
      //   models.Spot,{foreignKey: 'spotId'}
      // )
    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
      unique:true,
    },
    userId: {
      type: DataTypes.INTEGER,
      unique:true,
    },
    review: DataTypes.STRING,
    stars: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
