import * as yup from 'yup';

export const validationOrderSchema = [
    yup.object({
      fullName: yup.string().required('För- och efternamn är obligatorsika'),
      address1: yup.string().required('Address 1 obligatoriskt'),
      address2: yup.string(),
      city: yup.string().required('Stad är obligatoriskt'),
      zip: yup.string().required('Postkod är obligatoriskt'),
    }),
    yup.object(),
    yup.object({
      nameOnCard: yup.string().required('Kortinnehavare är obligatoriskt'),
      cardNumber: yup.string().required('Kortnummer är obligatoriskt'),
      expireDate: yup.string().required('Utgångsdatum är obligatoriskt'),
      cvc: yup.string().required('CVC är obligatoriskt'),
    })
]
