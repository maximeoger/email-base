import { Input } from "@nextui-org/react";
import useFieldMetaDestructuring from "src/hooks/useFieldMetaDestructuring";

export default function TextInput(props: any) {
  const { state, label, handleBlur } = props;
  const { errorMessages } = useFieldMetaDestructuring(state);

  return (
    <div className="h-[88px]">
      <Input
        type="text"
        variant="bordered"
        label={label}
        labelPlacement="outside"
        value={state.value}
        onBlur={handleBlur}
        onChange={(e) => props.handleChange(e.target.value)}
        isInvalid={Boolean(errorMessages)}
        errorMessage={errorMessages}
      />
    </div>
  );
}
