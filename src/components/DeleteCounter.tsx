import { Action, Icon } from "@raycast/api";
import { FC } from "react";

const DeleteCounterAction: FC<{ onDelete: () => void }> = ({ onDelete }) => {
  return (
    <Action icon={Icon.Trash} title="Delete Counter" shortcut={{ modifiers: ["ctrl"], key: "x" }} onAction={onDelete} />
  );
};

export default DeleteCounterAction;
