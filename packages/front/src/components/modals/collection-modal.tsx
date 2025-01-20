import { Button, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import { BaseModalProps } from "src/models/modal";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { collectionFormSchema } from "../../models/form-validators/collection-form";
import { CollectionFormValues } from "src/models/collection";
import TextInput from "../inputs/text-input";
import TextArea from "../inputs/textarea";
import { useCreateCollection } from "src/api/collection/usecases/useCreateCollection";
import { useModal } from "src/hooks/useModal";

interface IProps extends BaseModalProps {
  defaultValues?: CollectionFormValues;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function CollectionModal({ defaultValues, ...props }: IProps) {
  const { onCreateCollection, isCreatingCollection } = useCreateCollection();
  const { closeModal } = useModal();

  const { Field, handleSubmit } = useForm({
    onSubmit: async ({ value }) =>
      onCreateCollection(value).then(() => closeModal()),
    validatorAdapter: zodValidator(),
    validators: {
      onChange: collectionFormSchema,
      onSubmit: collectionFormSchema,
    },
    defaultValues,
  });

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">{props.title}</ModalHeader>
      <ModalBody>
        <div className="flex flex-col">
          <Field name="name">
            {(field) => (
              <TextInput
                label="Name"
                placeholder="Enter a name for you collection"
                {...field}
              />
            )}
          </Field>
          <Field name="description">
            {(field) => (
              <TextArea
                label="Description"
                placeholder="What purpose does this collection serve ?"
                {...field}
              />
            )}
          </Field>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={props.onCancel}>
          {props.cancelText}
        </Button>
        <Button
          color="primary"
          onPress={() => handleSubmit()}
          disabled={isCreatingCollection}
        >
          {props.actionText}
        </Button>
      </ModalFooter>
    </>
  );
}
