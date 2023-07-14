import { ActionPanel, Color, Icon, List } from "@raycast/api";
import { useState } from "react";
import { CounterItem } from "./types";
import AddSubCounter from "./components/AddSubCounter";
import DeleteCounterAction from "./components/DeleteCounter";
import CreateCounterAction from "./components/CreateCounter";

export default function Command() {
  const [counters, setCounterItems] = useState<CounterItem[]>([
    { title: "Counter 1", count: 0, step: 1 },
    { title: "Counter 2", count: 0, step: 10 },
  ]);

  const handleCreate = (todo: CounterItem) => {
    const newCounterItems = [...counters, todo];
    setCounterItems(newCounterItems);
  };

  const handleDelete = (index: number) => {
    const newCounterItems = [...counters];
    newCounterItems.splice(index, 1);
    setCounterItems(newCounterItems);
  };

  const addCount = (index: number, step: number) => {
    const newCounterItems = [...counters];
    newCounterItems[index].count += step;
    setCounterItems(newCounterItems);
  };

  const subCount = (index: number, step: number) => {
    const newCounterItems = [...counters];
    newCounterItems[index].count -= step;
    setCounterItems(newCounterItems);
  };

  return (
    <List
      actions={
        <ActionPanel>
          <CreateCounterAction onCreate={handleCreate} />
        </ActionPanel>
      }
    >
      {counters.map((item, index) => (
        <List.Item
          key={index}
          icon={Icon.Dot}
          title={item.title}
          accessories={[
            {
              tag: { value: item.count.toString(), color: Color.Blue },
              icon: Icon.ArrowUpCircleFilled,
            },
          ]}
          actions={
            <ActionPanel>
              <ActionPanel.Section>
                <AddSubCounter step={1} add={true} onAction={() => addCount(index, item.step)} />
                <AddSubCounter step={1} add={false} onAction={() => subCount(index, item.step)} />
              </ActionPanel.Section>
              <ActionPanel.Section>
                <CreateCounterAction onCreate={handleCreate} />
                <DeleteCounterAction onDelete={() => handleDelete(index)} />
              </ActionPanel.Section>
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
