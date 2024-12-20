const { Model, DataTypes } = require("sequelize");

class Tratamentos extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                },

                userId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },

                sessaoId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                
                status: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    defaultValue: "marcado",
                },
                created_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                },
                updated_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                },
            },

            {
                sequelize,
                modelName: 'Tratamentos',
                tableName: 'tratamentos',
                timestamps: true,
            },

        );
        
    }

    static associate(models) {
        this.belongsTo(models.Usuario, { foreignKey: 'userId', as: 'usuario' });
        this.belongsTo(models.Sessao, { foreignKey: 'sessaoId', as: 'sessao' });
    }
    

    

}



module.exports = Tratamentos;