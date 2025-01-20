import { Textarea } from "@nextui-org/input";
import useFieldMetaDestructuring from "src/hooks/useFieldMetaDestructuring";

export default function TextArea(props: any) {
  const { state, label, handleBlur } = props;
  const { errorMessages } = useFieldMetaDestructuring(state);

  return (
    <Textarea
      variant="bordered"
      labelPlacement="outside"
      label={label}
      value={state.value}
      onBlur={handleBlur}
      onChange={(e) => props.handleChange(e.target.value)}
      isInvalid={Boolean(errorMessages)}
      errorMessage={errorMessages}
    />
  );
}
