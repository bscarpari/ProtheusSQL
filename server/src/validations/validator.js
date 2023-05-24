const { check } = require('express-validator')

const rules = {
  login: [
    check('email', 'Email é obrigatório').not().isEmpty(),
    check('password', 'Senha é obrigatória').not().isEmpty(),
    check('email', 'Email inválido').isEmail(),
  ],

  register: [
    check('username', 'Nome de usuário é obrigatório').not().isEmpty(),
    check('email', 'Email é obrigatório').not().isEmpty(),
    check('password', 'Senha é obrigatória').not().isEmpty(),

    check(
      'username',
      'Nome de usuário deve ter entre 3 e 20 caracteres'
    ).isLength({ min: 3, max: 20 }),
    check('password', 'Senha deve ter entre 8 a 16 caracteres').isLength({
      min: 8,
      max: 16,
    }),

    check('email', 'Email inválido').isEmail(),

    check(
      'password',
      'Senha deve conter pelo menos uma letra maiúscula'
    ).matches(/(?=.*[A-Z])/),

    check(
      'password',
      'Senha deve conter pelo menos uma letra minúscula'
    ).matches(/(?=.*[a-z])/),

    check('password', 'Senha deve conter pelo menos um número').matches(
      /(?=.*[0-9])/
    ),

    check(
      'password',
      'Senha deve conter pelo menos um caractere especial'
    ).matches(/(?=.*[!@#$%^&*])/),
  ],

  forgot: [
    check('email', 'Email é obrigatório').not().isEmpty(),
    check('email', 'Email inválido').isEmail(),
  ],

  reset: [
    check('password', 'Senha é obrigatória').not().isEmpty(),
    check('password', 'Senha deve ter entre 8 a 16 caracteres').isLength({
      min: 8,
      max: 16,
    }),
    check(
      'password',
      'Senha deve conter pelo menos uma letra maiúscula'
    ).matches(/(?=.*[A-Z])/),
    check(
      'password',
      'Senha deve conter pelo menos uma letra minúscula'
    ).matches(/(?=.*[a-z])/),
    check('password', 'Senha deve conter pelo menos um número').matches(
      /(?=.*[0-9])/
    ),
    check(
      'password',
      'Senha deve conter pelo menos um caractere especial'
    ).matches(/(?=.*[!@#$%^&*])/),
  ],
}

module.exports = rules
