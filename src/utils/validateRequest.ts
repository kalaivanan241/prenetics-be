export const validateSchema = async (
  schema: any,
  data: { [key: string]: any }
): Promise<{ errors: null | { [key: string]: string } }> => {
  try {
    await schema.validate(data, { abortEarly: false });
    return { errors: null };
  } catch (err: any) {
    const validationErrors: any = {};

    err.inner.forEach((error: any) => {
      if (error.path) {
        validationErrors[error.path] = error.message;
      }
    });

    return { errors: validationErrors };
  }
};
