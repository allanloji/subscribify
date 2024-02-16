import { useFieldArray, useForm } from "react-hook-form";
import { FileInput, TextInput } from "../ui";

type NewsletterForm = {
  name: string;
  file: File;
  recipients: string[];
};

function Newsletters() {
  const { register, handleSubmit, control } = useForm<NewsletterForm>({
    defaultValues: { recipients: ["example@example.com"] },
  });

  const {
    fields: recipients,
    append,
    prepend,
    remove,
  } = useFieldArray({
    name: "recipients",
    control,
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <h1>Create your newsletter</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextInput
            label="Name"
            placeholder="Cool newsletter"
            {...register("name")}
          />
        </div>
        <div>
          <FileInput label="File" {...register("file")} />
        </div>
        <div>
          <label>Recipients</label>
          {recipients.map((recipient, index) => (
            <TextInput
              key={recipient.id}
              {...register(`recipients.${index}`)}
            />
          ))}
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default Newsletters;
