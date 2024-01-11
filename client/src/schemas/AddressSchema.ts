import * as yup from 'yup';

const addressSchema = yup.object().shape({
    fullName: yup.string().required('För- och efternamn är obligatorsika'),
    address1: yup.string().required('Address 1 obligatoriskt'),
    address2: yup.string(),
    city: yup.string().required('Stad är obligatoriskt'),
    zip: yup.string().required('Postkod är obligatoriskt'),
  });

  export default addressSchema
  