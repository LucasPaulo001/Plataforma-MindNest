import { body } from 'express-validator';

export const registerValidations = () => {
  return [
    body('nome').isString().withMessage("O campo 'nome' é obrigatório!"),

    body('email')
      .isString()
      .withMessage("O campo 'E-mail' é obrigatório!")
      .isEmail()
      .withMessage('Informe um E-mail válido!'),

    body('password')
      .isString()
      .withMessage('A senha é obrigatória!')
      .isLength({ min: 6 })
      .withMessage('A senha tem que ter no mínimo 6 caracteres!'),

    body('confirmPass')
      .isString()
      .withMessage('A confirmação de senha é obrigatória!')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('As senhas não são iguais');
        }
        return true;
      }),
  ];
};

export const loginValidations = () => {
  return [
    body('email')
      .isString()
      .withMessage('O E-mail é obrigatório!')
      .isEmail()
      .withMessage('Informe um E-mail válido!'),

    body('password').isString('A senha é obrigatória!'),
  ];
};
