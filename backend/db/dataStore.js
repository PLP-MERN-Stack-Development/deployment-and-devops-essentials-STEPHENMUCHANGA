// backend/data/dataStore.js

// ====== DYNAMIC BUG STORAGE (User-Reported Bugs) ======
let data = [];
let idCounter = 1;

// Reset the data store
exports.reset = () => {
  data = [];
  idCounter = 1;
};

// Insert a new bug
exports.insert = async (item) => {
  const newItem = { id: String(idCounter++), ...item };
  data.push(newItem);
  return newItem;
};

// Retrieve all bugs
exports.findAll = async () => [...data];

// Update an existing bug
exports.update = async (id, changes) => {
  const index = data.findIndex((d) => d.id === id);
  if (index === -1) return null;
  data[index] = { ...data[index], ...changes };
  return data[index];
};

// Remove a bug
exports.remove = async (id) => {
  const index = data.findIndex((d) => d.id === id);
  if (index === -1) return false;
  data.splice(index, 1);
  return true;
};

// ====== STATIC KNOWLEDGE BASE (Common MERN Bugs + Solutions) ======
const commonBugs = [
  {
    id: 1,
    title: "CORS policy error",
    description:
      "Occurs when the frontend (React) attempts to call the backend (Express) on a different port or domain without proper CORS setup.",
    solution:
      "Install and configure CORS in your Express server: `npm install cors`, then add `app.use(cors())` before defining routes."
  },
  {
    id: 2,
    title: "MongoNetworkError: failed to connect to server",
    description:
      "Triggered when MongoDB cannot be reached, often due to an incorrect URI, MongoDB not running, or network/firewall restrictions.",
    solution:
      "Ensure MongoDB is running locally or remotely, verify the connection URI in your `.env`, and test with MongoDB Compass or `mongosh`."
  },
  {
    id: 3,
    title: "Cannot read property 'x' of undefined",
    description:
      "Occurs when trying to access a property on an undefined object, such as `req.body.user.name` when `user` is not defined.",
    solution:
      "Validate inputs before accessing properties and use optional chaining, e.g., `req.body?.user?.name`. Also, add validation middleware."
  },
  {
    id: 4,
    title: "Too many re-renders",
    description:
      "A React error caused by repeatedly updating state during rendering, often when `setState` is called inside the component body.",
    solution:
      "Move state updates into `useEffect` or event handlers, not directly in the component render logic."
  },
  {
    id: 5,
    title: "EADDRINUSE: address already in use",
    description:
      "Occurs when your backend server tries to listen on a port already used by another process.",
    solution:
      "Stop the other process (e.g., `npx kill-port 5000`) or change the port in your `.env` file or server setup."
  },
  {
    id: 6,
    title: "CastError: Cast to ObjectId failed",
    description:
      "Occurs when a MongoDB query like `findById` receives an invalid ObjectId.",
    solution:
      "Validate IDs before querying: `mongoose.Types.ObjectId.isValid(id)`."
  },
  {
    id: 7,
    title: "Unhandled promise rejection",
    description:
      "Happens when a Promise rejects but no `.catch()` or try/catch handles the error.",
    solution:
      "Wrap async functions in try/catch blocks or chain Promises with `.catch()`."
  },
  {
    id: 8,
    title: "Objects are not valid as a React child",
    description:
      "React can only render strings, numbers, or valid elements — not objects or arrays directly.",
    solution:
      "Render arrays using `.map()` and stringify objects with `JSON.stringify(object)`."
  },
  {
    id: 9,
    title: "Cannot set headers after they are sent to the client",
    description:
      "Occurs in Express when multiple responses are sent for a single request.",
    solution:
      "Ensure you send only one response. Use `return` after `res.send()` or `res.json()` to prevent further code execution."
  },
  {
    id: 10,
    title: "Duplicate key error (E11000)",
    description:
      "Occurs when saving a document with a unique field that already exists in MongoDB.",
    solution:
      "Use `Model.findOne()` before saving to check for duplicates, and send a friendly error message if found."
  }
];

// ====== FUNCTIONS TO ACCESS COMMON BUGS ======

// Get all known bugs
exports.getAllCommonBugs = async () => [...commonBugs];

// Find a specific bug by its title
