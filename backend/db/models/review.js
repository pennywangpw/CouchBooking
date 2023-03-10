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
        models.ReviewImage,{foreignKey: 'reviewId',onDelete: 'CASCADE', hooks: true}
      )
      //no delete cascade only in hadmany
      Review.belongsTo(
        models.Spot,{foreignKey:'spotId'}
      )

      Review.belongsTo(
        models.User,{foreignKey:'userId'}
      )

    }
  }
  Review.init({
    //在寫spot的時候關掉了(Create a Review for a Spot based on the Spot's id)
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    spotId: {
      type: DataTypes.INTEGER,
      // unique:true,
    },
    userId: {
      type: DataTypes.INTEGER,
      // unique:true,
    },
    review: DataTypes.STRING,
    stars: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
