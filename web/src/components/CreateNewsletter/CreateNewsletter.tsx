import { useFieldArray, useForm } from "react-hook-form";
import { Button, FileInput, IconButton, Spacer, DatetimeInput } from "../ui";
import { Plus, Trash2, ChevronLeft } from "lucide-react";
import TextInput from "../ui/TextInput";
import * as S from "./CreateNewsletter.styles";
import { uploadFile } from "@/utils/s3";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { add, format } from "date-fns";
import { api } from "@/api/utils";
import { CreateNewsletterDto } from "@/api/Api";

type Recipient = {
  value: string;
};

type NewsletterForm = {
  name: string;
  file: FileList;
  recipients: Recipient[];
  scheduledAt: string;
};

function CreateNewsletter() {
  const router = useRouter();
  const { mutate: createNewsletter, isPending: isPendingCreateNewsletter } =
    useMutation({
      mutationFn: async (data: CreateNewsletterDto) => {
        const response = await api.newsletters.create(data);
        return response.data;
      },
      onSuccess: () => {
        router.push("/");
      },
    });

  const { register, handleSubmit, control, formState } =
    useForm<NewsletterForm>({
      defaultValues: { recipients: [{ value: "" }] },
      mode: "onSubmit",
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

  const onSubmit = async ({
    file,
    name,
    recipients,
    scheduledAt,
  }: NewsletterForm) => {
    const fileKey = (await uploadFile(file[0])) || "";
    const data: CreateNewsletterDto = {
      name,
      file: fileKey,
      recipients: recipients.map((recipient) => recipient.value),
      ...(scheduledAt &&
        scheduledAt !== "" && {
          scheduledAt: new Date(scheduledAt).toISOString(),
        }),
    };

    createNewsletter(data);
  };

  return (
    <>
      <S.BackButton href="/" aria-label="Go back">
        <ChevronLeft />
      </S.BackButton>
      <Spacer size={2} />
      <S.Container>
        <S.FormContainer>
          <h1>Create your newsletter</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Spacer />
            <TextInput
              label="Name *"
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
              label="File *"
              {...register("file", { required: "This field is required" })}
              error={formState.errors.file?.message}
            />
            <Spacer />
            <div>
              <label>Recipients *</label>
              <Spacer horizontal size={0.5} />
              <IconButton
                aria-label="Add recipient"
                onClick={() => append({ value: "" })}
              >
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
                    <IconButton
                      onClick={() => remove(index)}
                      aria-label={`Delete recipient ${index + 1}`}
                    >
                      <Trash2 size={16} />
                    </IconButton>
                  </S.RecipientContainer>
                </div>
              ))}
            </div>
            <Spacer size={2} />
            <DatetimeInput
              label="Date and time to send"
              aria-label="Date and time"
              {...register("scheduledAt")}
              // Set the min date to 5 minutes from now
              min={format(
                add(new Date(), { minutes: 5 }),
                "yyyy-MM-dd'T'HH:mm"
              )}
            />
            <Spacer size={2} />
            <S.Container>
              <Button type="submit" disabled={isPendingCreateNewsletter}>
                {isPendingCreateNewsletter ? "Creating..." : "Create"}
              </Button>
            </S.Container>
          </form>
        </S.FormContainer>
      </S.Container>
    </>
  );
}

export default CreateNewsletter;
