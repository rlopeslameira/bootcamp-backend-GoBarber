import { Router } from 'express';

import User from './app/models/Users';

const routes = new Router();

routes.get('/', async (req, res) => {
  const users = await User.create({
    name: 'Rodrigo Lopes Lameira',
    email: 'rlopeslameira@gmail.com',
    password_hash: '3as21d6a5s4d32as1d65a4s',
  });

  return res.json(users);
});

export default routes;
