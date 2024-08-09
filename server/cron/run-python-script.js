const { exec } = require('child_process');
const path = require('path');

// Absolute path to your Python script
const scriptPath = path.join(__dirname, '../../jwt_generator.py');

export default function () {
  // Path to python3.11 executable
  const pythonPath = '/usr/bin/python3.11';

  // Command to execute the Python script
  const command = `${pythonPath} ${scriptPath}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return;
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    console.log(`stdout: ${stdout}`);
  });
}