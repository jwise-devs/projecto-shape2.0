import { Model, DataTypes } from "sequelize";
import bcryptjs from 'bcryptjs';

export default class Usuario extends Model {
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
                    len: {
                        args: [3, 255],
                        msg: 'campo nome deve ter entre 3 e 255 caracteres',
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
        },
    
    );

        this.addHook('beforeSave', async (usuario) => {
            if(usuario.password){
                usuario.password_hash = await bcryptjs.hash(usuario.password,8);
            }

        });

        return this;
    }

    passwordIsValid(password) {
        return bcryptjs.compare(password, this.password_hash);
    }
}