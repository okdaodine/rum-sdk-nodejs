export const assert = (condition: any, errorMessage: string) => {
  if (!condition) {
    throw new Error(errorMessage);
  }
}

export const error = {
  required: (name: string) => `${name} is required`,
  notFound: (name: string) => `${name} not found`,
  invalid: (name: string) => `${name} is invalid`,
}