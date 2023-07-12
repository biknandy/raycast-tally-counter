import { Action, ActionPanel, Form, Icon, List, useNavigation } from "@raycast/api";
import { useState } from "react";

interface Todo {
  title: string;
  isCompleted: boolean;
  counter: number;
}

export default function Command() {
  const [todos, setTodos] = useState<Todo[]>([
    { title: "Write a todo list extension", isCompleted: false, counter: 0 },
    { title: "Explain it to others", isCompleted: false, counter: 0 },
  ]);

  function handleCreate(todo: Todo) {
    const newTodos = [...todos, todo];
    setTodos(newTodos);
  }

  function handleToggle(index: number) {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  }

  function handleDelete(index: number) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <List
      actions={
        <ActionPanel>
          <CreateTodoAction onCreate={handleCreate} />
        </ActionPanel>
      }
    >
      {todos.map((todo, index) => (
        <List.Item
          key={index}
          icon={todo.isCompleted ? Icon.Checkmark : Icon.Circle}
          title={todo.title}
          actions={
            <ActionPanel>
              <ActionPanel.Section>
                <ToggleTodoAction todo={todo} onToggle={() => handleToggle(index)} />
              </ActionPanel.Section>
              <ActionPanel.Section>
                <CreateTodoAction onCreate={handleCreate} />
                <DeleteTodoAction onDelete={() => handleDelete(index)} />
              </ActionPanel.Section>
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}

const CreateTodoForm = (props: { onCreate: (todo: Todo) => void }) => {
  const { pop } = useNavigation();

  const handleSubmit = (values: { title: string }) => {
    props.onCreate({ title: values.title, isCompleted: false, counter: 0 });
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
    </Form>
  );
};

const CreateTodoAction = (props: { onCreate: (todo: Todo) => void }) => {
  return (
    <Action.Push
      icon={Icon.Pencil}
      title="Create Todo"
      shortcut={{ modifiers: ["cmd"], key: "n" }}
      target={<CreateTodoForm onCreate={props.onCreate} />}
    />
  );
};

const ToggleTodoAction = (props: { todo: Todo; onToggle: () => void }) => {
  return (
    <Action
      icon={props.todo.isCompleted ? Icon.Circle : Icon.Checkmark}
      title={props.todo.isCompleted ? "Uncomplete Todo" : "Complete Todo"}
      onAction={props.onToggle}
    />
  );
};

const DeleteTodoAction = (props: { onDelete: () => void }) => {
  return (
    <Action
      icon={Icon.Trash}
      title="Delete Todo"
      shortcut={{ modifiers: ["ctrl"], key: "x" }}
      onAction={props.onDelete}
    />
  );
};
