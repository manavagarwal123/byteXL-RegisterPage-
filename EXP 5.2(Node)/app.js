// employee-cli.js
const readline = require('readline');

// Create interface for CLI input/output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Array to store employees
let employees = [];

// Display menu
function showMenu() {
  console.log('\n=== Employee Management System ===');
  console.log('1. Add Employee');
  console.log('2. List Employees');
  console.log('3. Remove Employee');
  console.log('4. Exit');
  rl.question('Select an option: ', handleMenu);
}

// Handle menu selection
function handleMenu(choice) {
  switch (choice.trim()) {
    case '1':
      addEmployee();
      break;
    case '2':
      listEmployees();
      break;
    case '3':
      removeEmployee();
      break;
    case '4':
      console.log('Exiting...');
      rl.close();
      break;
    default:
      console.log('Invalid option! Please try again.');
      showMenu();
  }
}

// Add new employee
function addEmployee() {
  rl.question('Enter employee name: ', (name) => {
    name = name.trim();
    if (!name) {
      console.log('Name cannot be empty.');
      return showMenu();
    }

    rl.question('Enter employee ID: ', (id) => {
      id = id.trim();
      if (!id) {
        console.log('ID cannot be empty.');
        return showMenu();
      }

      // Check for duplicate ID (case-insensitive)
      if (employees.find(emp => emp.id.toLowerCase() === id.toLowerCase())) {
        console.log(`Employee with ID "${id}" already exists.`);
      } else {
        employees.push({ name, id });
        console.log(`Employee "${name}" added successfully!`);
      }
      showMenu();
    });
  });
}

// List all employees
function listEmployees() {
  console.log('\n=== Employee List ===');
  if (employees.length === 0) {
    console.log('No employees found.');
  } else {
    employees.forEach(emp => {
      console.log(`ID: ${emp.id}, Name: ${emp.name}`);
    });
  }
  showMenu();
}

// Remove employee by ID
function removeEmployee() {
  rl.question('Enter employee ID to remove: ', (id) => {
    id = id.trim();
    const index = employees.findIndex(emp => emp.id.toLowerCase() === id.toLowerCase());

    if (index === -1) {
      console.log(`Employee with ID "${id}" not found.`);
    } else {
      const removed = employees.splice(index, 1);
      console.log(`Employee "${removed[0].name}" removed successfully!`);
    }
    showMenu();
  });
}

// Start the CLI application
showMenu();