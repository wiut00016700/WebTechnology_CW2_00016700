import fs from "fs";

const writeToFile = async (filePath, data) => {
  try {
    await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    throw err; // Propagate the error
  }
};

export default writeToFile;
