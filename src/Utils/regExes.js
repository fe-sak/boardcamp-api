const regExes = {
  cpf: /^[0-9]{11}$/,
  imageUri: /^(https|http):\/\/.*\.(jpeg|jpg|png|svg)$/,
  numericalString: /^[0-9]+$/,
  phone: /^[0-9]{10,11}$/,
};

export default regExes;
