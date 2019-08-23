import * as Yup from 'yup';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required('Email is Required'),
    password: Yup.string()
      .required('Password is Required')
      .min(6),
  });

  schema
    .validate(req.body)
    .then(() => {
      next();
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
};
