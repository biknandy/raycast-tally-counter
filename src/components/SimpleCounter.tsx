import { FC, useEffect, useState } from "react";
import { Action, ActionPanel, Detail, openCommandPreferences } from "@raycast/api";
import { LocalStorage } from "@raycast/api";

const SimpleCounter: FC = () => {
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getInitialCount = async () => {
      const initialCount = await LocalStorage.getItem<number>("simple-counter");
      if (initialCount) setCounter(initialCount);
      setLoading(false);
    };
    setLoading(true);
    getInitialCount();
  }, []);

  const addCount = async () => {
    await LocalStorage.setItem("simple-counter", counter + 1);
    setCounter(counter + 1);
  };

  const subCount = async () => {
    await LocalStorage.setItem("simple-counter", counter - 1);
    setCounter(counter - 1);
  };
  return (
    <Detail
      markdown={`# ${counter}`}
      actions={
        <ActionPanel title="Counter">
          <Action title="+1" onAction={() => addCount()} />
          <Action title="-1" onAction={() => subCount()} />
          <Action title="Open Extension Preferences" onAction={openCommandPreferences} />
        </ActionPanel>
      }
      isLoading={loading}
    ></Detail>
  );
};

export default SimpleCounter;
