import { useNavigation, Form, ActionPanel, Action } from "@raycast/api";
import { FC } from "react";
import { CounterItem } from "../types";

const CreateCounterForm: FC<{ onCreate: (todo: CounterItem) => void }> = ({ onCreate }) => {
  const { pop } = useNavigation();

  const handleSubmit = (values: { title: string; step: string }) => {
    const step = parseInt(values.step);
    onCreate({ title: values.title, count: 0, step: step });
    pop();
  };

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Create Todo" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="title" title="Title" />
      <Form.TextField id="step" title="Step" />
    </Form>
  );
};

export default CreateCounterForm;
