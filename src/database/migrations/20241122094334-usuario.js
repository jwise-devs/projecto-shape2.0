'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    
      await queryInterface.createTable('usuario', { 

        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        } ,

        nome: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },

        password_hash: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },

        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      
      });
     
  },

  async down (queryInterface, DataTypes) {
    
    await queryInterface.dropTable('usuario');
  
  }
};
