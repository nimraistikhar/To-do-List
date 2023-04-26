import React from "react";
import { Button, Checkbox, Container, Flex, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { DeleteIcon, EditIcon, HamburgerIcon, PlusSquareIcon } from '@chakra-ui/icons'


const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  React.useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
      important: false
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  function importantTodo(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.important = !todo.important;
      }
      return todo
    });

    updatedTodos = updatedTodos.sort((a, b) => b.important - a.important);

    setTodos(updatedTodos)
  }

  return (
    <Container mt="120px" id="todo-list">
      <Heading align="center" p="20px">Todo List</Heading>
      <form onSubmitCapture={handleSubmit}>
        <Flex display="flex">
          <Input
            fontSize="20px"
            h="50px"
            variant='filled'
            placeholder=''
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <Button
            ml="10px"
            bg="blue"
            color="white"
            _hover="none"
            h="50px"
            p="0 30px"
            type="submit"
            onSubmit={handleSubmit}
          >
            Add Todo
          </Button>
        </Flex>
      </form>
      {todos.map((todo) => (
        <VStack
          key={todo.id}
          display="flex"
          flexDirection="column"
          padding="5px 10px"
          marginBottom="10px"
          bg="gray.100"
          mt="20px"
          style={todo.important ? { background: "#87C1FF" } : {}}
        >
          <VStack
            display="flex"
            flexDir="row"
            justifyContent="space-between"
            w="100%"
          >
            <VStack
              fontSize="24px"
              lineHeight="24px"
              display="flex"
              flexDirection="row"
              alignItems="center"
            >
              <Checkbox
                padding="4px"
                mt="5px"
                type="checkbox"
                id="completed"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />

              {todo.id === todoEditing ? (
                <Input
                  m="0 !important"
                  type="text"
                  onChange={(e) => setEditingText(e.target.value)}
                />
              ) : (
                <Text m="0 !important" fontSize="20px">{todo.text}</Text>
              )}

            </VStack>
            <VStack
              m="0 1px !important"
              display="flex"
              flexDir="row"
            >
              <Button
                m="0 1px !important"
                p="0"
                onClick={() => importantTodo(todo.id)}
              >
                <HamburgerIcon fontSize="20px" color="blue.700" />
              </Button>

              {todo.id === todoEditing ? (
                <Button
                  m="0 1px !important"
                  p="0"
                  onClick={() => submitEdits(todo.id)}
                >
                  <PlusSquareIcon fontSize="20px" color="blue.700" />
                </Button>
              ) : (
                <Button
                  m="0 1px !important"
                  onClick={() => setTodoEditing(todo.id)}
                >
                  <EditIcon fontSize="20px" color="blue.700" />
                </Button>
              )}
              <Button
                m="0 1px !important"
                p="0"
                onClick={() => deleteTodo(todo.id)}
              >
                <DeleteIcon fontSize="20px" color="blue.700" />
              </Button>
            </VStack>
          </VStack>
        </VStack>
      ))}
    </Container>
  );
};

export default App;