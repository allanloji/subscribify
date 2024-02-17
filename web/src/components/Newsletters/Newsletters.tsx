import { useFieldArray, useForm } from "react-hook-form";
import { Button, FileInput, IconButton, Spacer } from "../ui";
import { Plus, Trash2 } from "lucide-react";
import TextInput from "../ui/TextInput";
import * as S from "./Newsletters.styles";
import { uploadFile } from "@/utils/uploadFile";
import { useMutation } from "@tanstack/react-query";
import { API_URL } from "@/utils/constants";
import { useRouter } from "next/router";

type Recipient = {
  value: string;
};

type NewsletterForm = {
  name: string;
  file: FileList;
  recipients: Recipient[];
};

type Newsletter = {
  id: string;
  name: string;
  file: string;
  recipients: string[];
};

type CreateNewsletterBody = {
  name: string;
  file: string;
  recipients: string[];
};

function Newsletters() {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(`${API_URL}/newsletters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return response.json();
    },
    onSuccess: (data) => {
      router.push("/");
    },
  });

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
    const fileKey = (await uploadFile(file[0])) || "";
    const data: CreateNewsletterBody = {
      name,
      file: fileKey,
      recipients: recipients.map((r) => r.value),
    };

    mutate(data);
  };

  return (
    <>
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
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create"}
        </Button>
      </form>
    </>
  );
}

export default Newsletters;
