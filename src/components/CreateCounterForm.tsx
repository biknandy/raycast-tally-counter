import { useNavigation, Form, ActionPanel, Action } from "@raycast/api";
import { FC, useState } from "react";
import { CounterItem } from "../types";

const CreateCounterForm: FC<{ onCreate: (todo: CounterItem) => void }> = ({ onCreate }) => {
  const { pop } = useNavigation();

  const [stepError, setStepError] = useState<string | undefined>(undefined);

  const handleSubmit = (values: { title: string; step: string }) => {
    if (!parseInt(values.step)) {
      setStepError("Step must be a number");
      return;
    }
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
      <Form.TextField
        id="step"
        error={stepError}
        title="Step"
        info="Sets the step of the counter. Defaults to 1"
        defaultValue="1"
      />
    </Form>
  );
};

export default CreateCounterForm;
