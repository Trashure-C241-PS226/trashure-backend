import { exec } from "child_process";

function runPythonScript(inputData) {
	return new Promise((resolve, reject) => {
		const inputDataString = JSON.stringify(inputData);
		exec(`python3 src/utils/standarisasi.py '${inputDataString}'`, (error, stdout, stderr) => {
			if (error) {
				reject(`Error: ${error.message}`);
				return;
			}
			if (stderr) {
				reject(`stderr: ${stderr}`);
				return;
			}
			try {
				const output = JSON.parse(stdout);
				resolve(output);
			} catch (e) {
				reject(`Failed to parse JSON: ${e.message}`);
			}
		});
	});
}

export {runPythonScript}