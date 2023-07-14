import { Action, Icon } from "@raycast/api";
import { CounterItem } from "../types";
import CreateCounterForm from "./CreateCounterForm";
import { FC } from "react";

const CreateCounterAction: FC<{ onCreate: (todo: CounterItem) => void }> = ({ onCreate }) => {
  return (
    <Action.Push
      icon={Icon.Pencil}
      title="Create Counter"
      shortcut={{ modifiers: ["cmd"], key: "n" }}
      target={<CreateCounterForm onCreate={onCreate} />}
    />
  );
};

export default CreateCounterAction;
