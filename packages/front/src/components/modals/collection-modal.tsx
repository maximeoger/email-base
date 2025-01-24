import { Button, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import { BaseModalProps } from "src/models/modal";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { collectionFormSchema } from "../../models/form-validators/collection-form";
import { CollectionFormValues } from "src/models/collection";
import TextInput from "../inputs/text-input";
import TextArea from "../inputs/textarea";
import { useCreateCollection } from "src/api/collection/usecases/useCreateCollection";
import { useTranslations } from "next-intl";

interface IProps extends BaseModalProps {
  defaultValues?: CollectionFormValues;
  onCancel: () => void;
  onConfirm: (value: CollectionFormValues) => void;
}

export default function CollectionModal({ defaultValues, ...props }: IProps) {
  const t = useTranslations("forms.collection");
  const { isCreatingCollection } = useCreateCollection();

  const schemaValidator = collectionFormSchema({
    name_required: t("errors.name_required"),
    name_max_length: t("errors.name_max_length", { count: 25 }),
    description_max_length: t("description_max_length", { count: 255 })
  })

  const { Field, handleSubmit } = useForm({
    onSubmit: async ({ value }) => props.onConfirm(value),
    validatorAdapter: zodValidator(),
    validators: {
      onChange: schemaValidator,
      onSubmit: schemaValidator,
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
                label={t("fields.name.label")}
                placeholder={t("fields.name.placeholder")}
                {...field}
              />
            )}
          </Field>
          <Field name="description">
            {(field) => (
              <TextArea
                label={t("fields.description.label")}
                placeholder={t("fields.description.placeholder")}
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
