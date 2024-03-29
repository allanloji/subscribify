import {
  Button,
  DatetimeInput,
  FileInput,
  IconButton,
  Spacer,
  TextInput,
} from "../ui";
import { useFieldArray, useForm } from "react-hook-form";
import { FileCheck, Plus, Trash2, ChevronLeft } from "lucide-react";
import * as S from "./EditNewsletter.styles";
import { getBackground } from "../Dashboard/components/Newsletter/utils";
import { getFile, uploadFile } from "@/utils/s3";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { add, format } from "date-fns";
import { queries } from "@/api/queries";
import { NewsletterEntity, UpdateNewsletterDto } from "@/api/Api";
import { api } from "@/api/utils";
import { toast } from "sonner";

interface EditNewsletterProps {
  newsletter: NewsletterEntity;
}

type Recipient = {
  value: string;
};

type NewsletterForm = {
  name: string;
  file: FileList;
  recipients: Recipient[];
  scheduledAt: string;
};

function EditNewsletter({ newsletter }: EditNewsletterProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: updateNewsletter, isPending: isPendingUpdateNewsletter } =
    useMutation({
      mutationFn: async (data: UpdateNewsletterDto) => {
        const response = await api.newsletters.update(newsletter.id, data);
        return response.data;
      },
      onSuccess: () => {
        toast.success("Newsletter was updated! 🚀");
        queryClient.invalidateQueries({
          queryKey: queries.newsletters._def,
        });
        router.push("/");
      },
      onError: () => {
        toast.error("Failed to update newsletter");
      },
    });

  const { register, handleSubmit, control, formState } =
    useForm<NewsletterForm>({
      defaultValues: {
        name: newsletter.name,
        recipients: [
          ...newsletter?.recipients.map((recipient) => ({
            value: recipient.email,
          })),
        ],
        ...(newsletter.scheduledAt && {
          scheduledAt: format(
            new Date(newsletter.scheduledAt),
            "yyyy-MM-dd'T'HH:mm"
          ),
        }),
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

  const onSubmit = async ({
    file,
    name,
    recipients,
    scheduledAt,
  }: NewsletterForm) => {
    let data: UpdateNewsletterDto = {
      name,
      recipients: recipients.map((r) => r.value),
      // Only add the scheduledAt if it was changed
      ...(scheduledAt &&
        scheduledAt !== "" && {
          scheduledAt: new Date(scheduledAt).toISOString(),
        }),
    };

    // Only add the file if it was changed
    if (file.length > 0) {
      const fileKey = (await uploadFile(file[0])) || "";
      data.file = fileKey;
    }

    updateNewsletter(data);
  };

  return (
    <>
      <S.BackButton href="/" aria-label="Go back">
        <ChevronLeft />
      </S.BackButton>
      <Spacer size={2} />
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
              <IconButton
                onClick={() => append({ value: "" })}
                aria-label="Add recipient"
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
              min={format(
                add(new Date(), { minutes: 5 }),
                "yyyy-MM-dd'T'HH:mm"
              )}
            />
            <Spacer size={2} />
            <S.Container>
              <Button type="submit" disabled={isPendingUpdateNewsletter}>
                {isPendingUpdateNewsletter ? "Updating" : "Update"}
              </Button>
            </S.Container>
          </form>
        </S.FormContainer>
      </S.Container>
    </>
  );
}

export default EditNewsletter;
