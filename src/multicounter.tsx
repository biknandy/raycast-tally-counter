import { ActionPanel, Color, Icon, List } from "@raycast/api";
import { useState } from "react";
import { CounterItem } from "./types";
import AddSubCounter from "./components/AddSubCounter";
import DeleteCounterAction from "./components/DeleteCounter";
import CreateCounterAction from "./components/CreateCounter";

export default function Command() {
  const [todos, setCounterItems] = useState<CounterItem[]>([
    { title: "Counter 1", count: 0 },
    { title: "Counter 2", count: 0 },
  ]);

  const handleCreate = (todo: CounterItem) => {
    const newCounterItems = [...todos, todo];
    setCounterItems(newCounterItems);
  };

  const handleDelete = (index: number) => {
    const newCounterItems = [...todos];
    newCounterItems.splice(index, 1);
    setCounterItems(newCounterItems);
  };

  const addCount = (index: number) => {
    const newCounterItems = [...todos];
    newCounterItems[index].count += 1;
    setCounterItems(newCounterItems);
  };

  const subCount = (index: number) => {
    const newCounterItems = [...todos];
    newCounterItems[index].count -= 1;
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
      {todos.map((todo, index) => (
        <List.Item
          key={index}
          icon={Icon.Dot}
          title={todo.title}
          accessories={[
            {
              tag: { value: todo.count.toString(), color: Color.Blue },
              icon: Icon.ArrowUpCircleFilled,
            },
          ]}
          actions={
            <ActionPanel>
              <ActionPanel.Section>
                <AddSubCounter step={1} add={true} onAction={() => addCount(index)} />
                <AddSubCounter step={1} add={false} onAction={() => subCount(index)} />
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
