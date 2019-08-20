import Sequelize, { Model } from 'sequelize';

import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    /*
     Antes de saltar o registro ele verifica se tem o password informado
     se tiver faz a cryptografia do mesmo.
    */
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  /*
     Função para comparar a senha informada pelo usuário com a do banco
     de dados.
  */
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
