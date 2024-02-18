import { Button, FileInput, IconButton, Spacer, TextInput } from "../ui";
import { useFieldArray, useForm } from "react-hook-form";
import { FileCheck, Plus, Trash2, ChevronLeft } from "lucide-react";
import * as S from "./EditNewsletter.styles";
import { getBackground } from "../Dashboard/components/Newsletter/utils";
import { getFile, uploadFile } from "@/utils/s3";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

function EditNewsletter({ newsletter }: any) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(`${API_URL}/newsletters/${newsletter.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["newsletter", newsletter.id],
      });
      router.push("/");
    },
  });

  const { register, handleSubmit, control, formState } =
    useForm<NewsletterForm>({
      defaultValues: {
        name: newsletter.name,
        recipients: [
          ...newsletter?.recipients?.map((r) => ({ value: r.email })),
        ],
      },
      mode: "onSubmit",
    });

  const { data: file } = useQuery({
    queryKey: ["file", newsletter.file],
    queryFn: async () => {
      const url = await getFile(newsletter.file);
      return url;
    },
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
    let data: any = {
      name,
      recipients: recipients.map((r) => r.value),
    };

    if (file.length > 0) {
      const fileKey = (await uploadFile(file[0])) || "";
      data.file = fileKey;
    }

    mutate(data);
  };

  return (
    <>
      <S.BackButton href="/">
        <ChevronLeft />
      </S.BackButton>
      <S.Container>
        <S.FormContainer>
          <S.BackgroundContainer background={getBackground(newsletter.id)} />

          <h1>Update {newsletter.name}</h1>
          <Spacer horizontal />

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
              {...register("file")}
              error={formState.errors.file?.message}
            />
            <Spacer size={0.5} />
            <S.FileContainer>
              <FileCheck />

              <Spacer horizontal size={0.5} />
              <a href={file} target="_blank">
                Download Saved File
              </a>
            </S.FileContainer>
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
                        error={
                          formState.errors.recipients?.[index]?.value?.message
                        }
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
            <S.Container>
              <Button type="submit" disabled={isPending}>
                Update
              </Button>
            </S.Container>
          </form>
        </S.FormContainer>
      </S.Container>
    </>
  );
}

export default EditNewsletter;
