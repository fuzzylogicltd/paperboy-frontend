import { Dialog, Form } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";

import styles from "./AddSubscription.module.css";
import TextField from "./forms/TextField";
import { addSubscription } from "../api/data";
import { useState } from "react";

const AddSubscription = () => {
  const [open, setOpen] = useState(false);

  const handleAddSubscription = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const feed = {
      url: formData.get("feedUrl") as string,
      name: formData.get("feedName") as string,
    };
    mutation.mutate(feed);
  };

  const mutation = useMutation({
    mutationFn: (feed) => {
      return addSubscription(feed);
    },
    onSuccess: (res) => {
      console.log("added feed");
      setOpen(false);
      // TODO: need to update Subscription list component when new feed is added
    },
    onError: (res) => {
      console.log("could not add feed", { res });
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="button buttonMain">+ Add</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.Overlay} />
        <Dialog.Content className={styles.Content}>
          <Form.Root onSubmit={handleAddSubscription}>
            <Dialog.Title className={styles.Title}>
              Add Subscription
            </Dialog.Title>
            <Dialog.Description className={styles.Description}>
              Add a new subscription. Please make sure the URL is a valid
              RSS/RDF/Atom feed. For now Paperboy can't do automatic extraction
              from a root website URL, but I'm working on it.
            </Dialog.Description>
            <TextField
              fieldName="feedUrl"
              labelText="Feed URL"
              isRequired={true}
              fieldType="text"
            />
            <TextField
              fieldName="feedName"
              labelText="Feed Name"
              isRequired={true}
              fieldType="text"
            />
            <div
              style={{
                display: "flex",
                marginTop: 25,
                justifyContent: "flex-end",
              }}
            >
              <Form.Submit asChild>
                <button className="button">Add</button>
              </Form.Submit>
            </div>
            <Dialog.Close asChild>
              <button className={styles.IconButton} aria-label="Close">
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Form.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddSubscription;
