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
  const qPart = questionNumber.slice(-1);
  const qNumber = questionNumber.slice(0, -1);

  const { default: qFunc } = await import(
    path.resolve(`./dist/questions/${qNumber}/${qNumber}${qPart}.js`)
  );

  const dataPath = loadSample
    ? `./src/data/${qNumber}.sample.txt`
    : `./src/data/${qNumber}.txt`;

  const data = fs.readFileSync(path.resolve(dataPath), "utf-8").trim();

  qFunc(data);
} catch (error) {
  console.error(`No code found for question ${questionNumber}`);
}
