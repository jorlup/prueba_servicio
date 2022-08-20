'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			nombre: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			apellido: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			edad: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			sexo: {
        validate: {
				  isIn: [['masculino', 'femenino']],
        },
				type: DataTypes.STRING,
				allowNull: false,
			},
			embarazo_lactancia: {
				validate: {
					isfemenino(value) {
						if (value && this.sexo !== 'femenino') {
							throw new Error('No puede estar embarazada o en lactancia si no es femenino');
						}
					},
				},
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			fecha_nacimiento: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			teléfono: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'User',
		}
	);
	return User;
};
