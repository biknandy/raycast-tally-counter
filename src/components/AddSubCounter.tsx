import { Action, Icon } from "@raycast/api";
import { FC } from "react";

const AddSubCounter: FC<{ step: number; add: boolean; onAction?: () => void }> = ({ step, add, onAction }) => {
  return (
    <Action
      icon={add ? Icon.ArrowUpCircleFilled : Icon.ArrowDownCircleFilled}
      title={add ? "Add" : "Subtract"}
      onAction={onAction}
      shortcut={add ? { modifiers: [], key: "return" } : { modifiers: ["ctrl"], key: "return" }}
    />
  );
};

export default AddSubCounter;
