import * as yup from 'yup';
import { setLocale } from 'yup';

setLocale({
  mixed: {
    required: 'Fältet är obligatoriskt',
  },
  string: {
    min: 'Måste vara minst ${min} tecken',
  },
  number: {
    min: 'Måste vara minst ${min}',
  },
});

const productValidationSchema = yup.object({
    name: yup.string().required("Fältet är obligatoriskt"),
    blendDescription: yup.string().required("Fältet är obligatoriskt"),
    type: yup.array().of(yup.string()).required("Fältet är obligatoriskt"),
    roastLevel: yup.array().of(yup.string()).required("Fältet är obligatoriskt"),
    // roastLevel: yup.array().of(yup.string()).default([]).required("Fältet är obligatoriskt"),
    description: yup.string().required("Fältet är obligatoriskt"),
    quantityInStock: yup.number().required("Fältet är obligatoriskt").min(0)
      .test({
        name: 'validQuantity',
        message: 'Ange ett giltigt lagerantal',
        test: (value) => !isNaN(value) && value !== null && value !== undefined,
      }),
    price: yup.number()
      .transform((originalValue) => (originalValue === "" ? null : Number(originalValue)))
      .nullable()
      .required("Fältet är obligatoriskt")
      .min(29, "Minst 30 kr")
      .test({
        name: 'validPrice',
        message: 'Ange ett giltigt pris',
        test: (value) => !isNaN(value) && value !== null && value !== undefined && value !== 0,
      }),    
    imageUrl: yup.string(),
    imageFile: yup.mixed().test({
      name: 'imageRequired',
      message: 'Saknar en bild',
      test: function () {
        const imageUrl = this.parent.imageUrl

        const imageFile = this.parent.imageFile

        if (imageUrl || (imageFile && imageFile.preview)) {
          return true
        }
        return false
      },
    }),
  })

export default productValidationSchema
