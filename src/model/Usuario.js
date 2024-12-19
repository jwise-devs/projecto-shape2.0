const { Model, DataTypes } = require("sequelize");
const bcryptjs = require("bcryptjs");

class Usuario extends Model {
    static init(sequelize) {
        super.init(
            {
            nome: {
                type: DataTypes.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 255],
                        msg: 'campo nome deve ter entre 3 e 255 caracteres',
                    },
                },
            },

            email: {
                type: DataTypes.STRING,
                defaultValue: '',
                unique: {
                    msg: "Email ja existe",
                },
                validate: {
                    isEmail: {
                      msg: 'E-Mail invalido',
                    },
                  },
            },

            password_hash: {
                type: DataTypes.STRING,
                defaultValue: '',
            },

            password: {
                type: DataTypes.VIRTUAL,
                defaultValue: '',
                validate: {
                    len: {
                        args: [6,50],
                        msg: 'A senha precisa ter entre 6 e 50 caracteres',
                    },
                },
            },

            


        },

        {
            sequelize,
             modelName: 'Usuario',
             tableName: 'usuario',
        },
    
    );

        this.addHook('beforeSave', async (usuario) => {
            if(usuario.password){
                usuario.password_hash = await bcryptjs.hash(usuario.password,8);
            }

        });

        return this;
    }

    static associate(models) {
        // Um usuário possui uma ficha de dados
        this.hasOne(models.Ficha_De_Dados, {
            foreignKey: 'userId', // Nome da chave estrangeira
            as: 'fichaDeDados', // Alias para acessar o relacionamento
        });

        this.belongsToMany(models.Sessao, {
            through: 'tratamentos',// Nome da tabela intermediária
            foreignKey: 'userId', // Nome da chave estrangeira que aponta para o usuario
            otherKey: 'sessaoId',// FK que aponta para a sessao
            as: 'sessao',
        });
    }

    passwordIsValid(password) {
        return bcryptjs.compare(password, this.password_hash);
    }
}

module.exports = Usuario;