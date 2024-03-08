import { VectorStoreIndex } from "llamaindex";
import { PDFReader } from "llamaindex/readers/PDFReader";
import * as readline from "node:readline/promises";

async function main() {
  // Load PDF
  const reader = new PDFReader();
  const documents = await reader.loadData("./data/training-bot-ahachat.pdf");

  // Split text and create embeddings. Store them in a VectorStoreIndex
  const index = await VectorStoreIndex.fromDocuments(documents);

  // Query the index
  const queryEngine = index.asQueryEngine();
  // const response = await queryEngine.query({
  //   query: "introduce about google",
  // });

  // // Output response
  // console.log();

  const chat = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  while (true) {
    const question = await chat.question("You: ");

    const response = await queryEngine.query({
      query: question,
    });

    // stream the answer to the terminal:
    process.stdout.write(`\nAI : ${response.toString()}`);
    process.stdout.write("\n\n");
  }
}

main().catch(console.error);
