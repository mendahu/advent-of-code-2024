import fs from "fs";
import path from "path";

const questionNumber = process.argv[2];
const loadSample = process.argv[3] === "test" || process.argv[3] === "sample";

if (!questionNumber) {
  console.error(
    "Please provide a question number as your first arguement on the CLI command. You can use a number and a letter for each part, like 1a or 2b."
  );
  process.exit(1);
}

try {
  const { default: qFunc } = await import(
    path.resolve(`./dist/questions/${questionNumber}/index.js`)
  );

  const numberOnly = questionNumber.slice(0, -1);

  const dataPath = loadSample
    ? `./src/data/${numberOnly}.sample.txt`
    : `./src/data/${numberOnly}.txt`;

  const data = fs.readFileSync(path.resolve(dataPath), "utf-8");

  qFunc(data);
} catch (error) {
  console.error(`No code found for question ${questionNumber}`);
}
