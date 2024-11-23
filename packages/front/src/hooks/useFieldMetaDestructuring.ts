export default function useFieldMetaDestructuring (state: any) {
  const { isTouched, errors } = state.meta;

  return {
    errorMessages: isTouched ? errors.join(',') : null
  }
}