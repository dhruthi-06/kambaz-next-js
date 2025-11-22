const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Sample data
let assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};

let todos = [
  { id: "1", title: "Task 1", completed: false },
  { id: "2", title: "Task 2", completed: true },
  { id: "3", title: "Task 3", completed: false },
  { id: "4", title: "Task 4", completed: true },
];

// -------------------------------
// Lab5 Welcome Endpoint
// -------------------------------
app.get('/lab5/welcome', (req, res) => {
  res.send('Welcome to Full Stack Development!');
});

// -------------------------------
// Lab5 Assignment Endpoints
// -------------------------------
app.get('/lab5/assignment', (req, res) => {
  res.json(assignment);
});

app.get('/lab5/assignment/title/:title', (req, res) => {
  assignment.title = req.params.title;
  res.json(assignment);
});

app.get('/lab5/assignment/title', (req, res) => {
  res.send(assignment.title);
});

// -------------------------------
// Lab5 Module Endpoints
// -------------------------------
app.get('/lab5/module', (req, res) => {
  res.json({
    id: "m101",
    name: "Intro to Node",
    description: "Basics of Node.js and Express",
    course: "CS5610",
  });
});

app.get('/lab5/module/name', (req, res) => {
  res.send("Intro to Node");
});

// -------------------------------
// Lab5 Path Parameters Endpoints
// -------------------------------
app.get('/lab5/add/:a/:b', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  res.send(String(a + b));
});

app.get('/lab5/subtract/:a/:b', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  res.send(String(a - b));
});

app.get('/lab5/multiply/:a/:b', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  res.send(String(a * b));
});

app.get('/lab5/divide/:a/:b', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  if (b === 0) {
    res.status(400).send('Cannot divide by zero');
  } else {
    res.send(String(a / b));
  }
});

// -------------------------------
// Lab5 Query Parameters Endpoints
// -------------------------------
app.get('/lab5/calculator', (req, res) => {
  const { operation, a, b } = req.query;
  const numA = parseFloat(a);
  const numB = parseFloat(b);

  if (isNaN(numA) || isNaN(numB)) {
    res.status(400).send('Invalid numbers');
    return;
  }

  let result;
  switch (operation) {
    case 'add':
      result = numA + numB;
      break;
    case 'subtract':
      result = numA - numB;
      break;
    case 'multiply':
      result = numA * numB;
      break;
    case 'divide':
      if (numB === 0) {
        res.status(400).send('Cannot divide by zero');
        return;
      }
      result = numA / numB;
      break;
    default:
      res.status(400).send('Invalid operation');
      return;
  }

  res.send(String(result));
});

// -------------------------------
// Lab5 Todos Endpoints
// -------------------------------
app.get('/lab5/todos', (req, res) => {
  const { completed } = req.query;
  if (completed !== undefined) {
    const filtered = todos.filter(todo => todo.completed === (completed === 'true'));
    res.json(filtered);
  } else {
    res.json(todos);
  }
});

app.get('/lab5/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === req.params.id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).send('Todo not found');
  }
});

// 5.2.5.7 - Old GET delete (keep for backward compatibility)
app.get('/lab5/todos/:id/delete', (req, res) => {
  const index = todos.findIndex(t => t.id === req.params.id);
  if (index !== -1) {
    todos.splice(index, 1);
    res.json(todos);
  } else {
    res.status(404).send('Todo not found');
  }
});

// 5.2.6.2 - New DELETE method
app.delete('/lab5/todos/:id', (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex((t) => t.id === id);
  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    res.sendStatus(200);
  } else {
    res.status(404).send('Todo not found');
  }
});

// 5.2.5.8 - Old GET create (keep for backward compatibility)
app.get('/lab5/todos/create', (req, res) => {
  const newTodo = {
    id: String(todos.length + 1),
    title: `New Task ${todos.length + 1}`,
    completed: false,
  };
  todos.push(newTodo);
  res.json(todos);
});

// 5.2.6.1 - New POST method
app.post('/lab5/todos', (req, res) => {
  const newTodo = { ...req.body, id: new Date().getTime().toString() };
  todos.push(newTodo);
  res.json(newTodo);
});

app.get('/lab5/todos/:id/title/:title', (req, res) => {
  const todo = todos.find(t => t.id === req.params.id);
  if (todo) {
    todo.title = req.params.title;
    res.json(todos);
  } else {
    res.status(404).send('Todo not found');
  }
});

app.get('/lab5/todos/:id/description/:description', (req, res) => {
  const todo = todos.find(t => t.id === req.params.id);
  if (todo) {
    todo.description = req.params.description;
    res.json(todos);
  } else {
    res.status(404).send('Todo not found');
  }
});

app.get('/lab5/todos/:id/completed/:completed', (req, res) => {
  const todo = todos.find(t => t.id === req.params.id);
  if (todo) {
    todo.completed = req.params.completed === 'true';
    res.json(todos);
  } else {
    res.status(404).send('Todo not found');
  }
});

// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

