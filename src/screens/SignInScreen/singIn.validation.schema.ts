import * as Yup from 'yup';

const SinInValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required('El Nombre de usuario es requerido')
    .min(4, 'El nombre de usuario debe contener al menos 4 carácteres')
    .max(20, 'El nombre de usuario debe contener como máximo 20 carácteres'),
  password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      'La contraseña debe contener al menos 8 carácteres, una letra mayúscula, una minúscula y un número',
    )
    .required('La contraseña es requerida'),
});

export {SinInValidationSchema};
