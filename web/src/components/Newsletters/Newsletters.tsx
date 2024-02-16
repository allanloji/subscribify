import { useFieldArray, useForm } from "react-hook-form";
import { Button, FileInput, IconButton, Spacer } from "../ui";
import { Plus, Trash2 } from "lucide-react";
import TextInput from "../ui/TextInput";
import * as S from "./Newsletters.styles";
import { uploadFile } from "@/utils/uploadFile";

type Recipient = {
  value: string;
};

type NewsletterForm = {
  name: string;
  file: FileList;
  recipients: Recipient[];
};

function Newsletters() {
  const { register, handleSubmit, control, formState } =
    useForm<NewsletterForm>({
      defaultValues: { recipients: [{ value: "" }] },
    });

  const {
    fields: recipients,
    append,
    remove,
  } = useFieldArray({
    name: "recipients",
    control,
    rules: {
      minLength: 1,
    },
  });

  const onSubmit = async ({ file, name, recipients }: NewsletterForm) => {
    const fileKey = await uploadFile(file[0]);
  };

  return (
    <div>
      <h1>Create your newsletter</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Spacer />
        <TextInput
          label="Name"
          placeholder="Cool newsletter"
          {...register("name", {
            required: "This field is required",
            minLength: {
              value: 3,
              message: "The name is too short",
            },
            maxLength: {
              value: 20,
              message: "The name is too long",
            },
          })}
          error={formState.errors.name?.message}
        />
        <Spacer />
        <FileInput
          label="File"
          {...register("file", { required: "This field is required" })}
          error={formState.errors.file?.message}
        />
        <Spacer />
        <div>
          <label>Recipients</label>
          <Spacer horizontal size={0.5} />
          <IconButton onClick={() => append({ value: "" })}>
            <Plus size={16} />
          </IconButton>
          {recipients.map((recipient, index) => (
            <div key={recipient.id}>
              <Spacer size={0.5} />
              <S.RecipientContainer>
                <div>
                  <TextInput
                    {...register(`recipients.${index}.value`, {
                      required: "This field cant be empty",
                    })}
                    placeholder="email@example.com"
                    error={formState.errors.recipients?.[index]?.value?.message}
                  />
                </div>
                <Spacer horizontal size={0.5} />
                <IconButton onClick={() => remove(index)}>
                  <Trash2 size={16} />
                </IconButton>
              </S.RecipientContainer>
            </div>
          ))}
        </div>
        <Spacer size={2} />
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}

export default Newsletters;
