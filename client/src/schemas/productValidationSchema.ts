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
    quantityInStock: yup.number().required("Fältet är obligatoriskt").min(0),
    price: yup
      .number()
      .transform((originalValue) => (originalValue === "" ? undefined : Number(originalValue)))
      .required("Fältet är obligatoriskt")
      .min(29, "Minst 30 kr")
      .test({
        name: 'notEmpty',
        exclusive: true,
        message: 'Fältet får inte vara tomt',
        test: (value) => value !== 0 && value !== undefined && value !== null,
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
