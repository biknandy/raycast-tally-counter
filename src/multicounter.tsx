import { ActionPanel, Color, Icon, List, environment } from "@raycast/api";
import { useEffect, useState } from "react";
import { CounterItem } from "./types";
import AddSubCounter from "./components/AddSubCounter";
import DeleteCounterAction from "./components/DeleteCounter";
import CreateCounterAction from "./components/CreateCounter";
import fs from "fs";
import { STORAGE_FILE } from "./utils";

export default function Command() {
  const [counters, setCounterItems] = useState<CounterItem[]>([]);

  // Load counters from file storage
  useEffect(() => {
    try {
      const storedItemsBuffer = fs.readFileSync(STORAGE_FILE);
      if (!storedItemsBuffer) {
        return;
      }
      const storedItems = JSON.parse(storedItemsBuffer.toString());
      setCounterItems(storedItems);
    } catch {
      fs.mkdirSync(environment.supportPath, { recursive: true });
    }
  }, []);

  const handleSave = (counters: CounterItem[]) => {
    setCounterItems(counters);
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(counters));
  };

  const handleCreate = (todo: CounterItem) => {
    const newCounterItems = [...counters, todo];
    handleSave(newCounterItems);
  };

  const handleDelete = (index: number) => {
    const newCounterItems = [...counters];
    newCounterItems.splice(index, 1);
    handleSave(newCounterItems);
  };

  const addCount = (index: number, step: number) => {
    const newCounterItems = [...counters];
    newCounterItems[index].count += step;
    handleSave(newCounterItems);
  };

  const subCount = (index: number, step: number) => {
    const newCounterItems = [...counters];
    newCounterItems[index].count -= step;
    handleSave(newCounterItems);
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
          icon={Icon.Circle}
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
