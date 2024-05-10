import express, { Request, Response } from "express"; // Importing types for Express
const app = express();
const port = 8000;

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Checking Route
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Route working"
  });
});

// Function to check if a given year is a leap year
const isLeapYear = (year: number): string => {
  if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
    return "Leap Year";
  }
  return "Not a Leap Year";
};

//---------- Task C : Route to check leap year
app.get("/newyear/:year", (req: Request, res: Response) => {
  const year = parseInt(req.params.year); // Convert the year to a number

  if (isNaN(year)) {
    return res
      .status(400)
      .json({ error: "Invalid year. Please provide a valid number." });
  }
  const isLeap = isLeapYear(year); // Check if it's a leap year by calling function
  res.json({
    message: isLeap,
    isLeapYear: year,
    source: typeof year
  });
});

// Secret handshake function based on a number
const secretHandshake = (number: number): string[] => {
  const moves = ["wink", "double blink", "close your eyes", "jump"];
  const handshake: string[] = [];

  // Add the corresponding moves based on the bitwise check
  if (number & 1) handshake.push(moves[0]);
  if (number & 2) handshake.push(moves[1]);
  if (number & 4) handshake.push(moves[2]);
  if (number & 8) handshake.push(moves[3]);

  // If the 16th bit is set, reverse the handshake
  if (number & 16) handshake.reverse();

  return handshake;
};

//-------------- Task D : Route of Secret handshake
app.get("/secret-handshake/:number", (req: Request, res: Response) => {
  const number = parseInt(req.params.number, 10); // Convert the parameter to a number
  if (isNaN(number)) {
    return res
      .status(400)
      .json({ error: "Invalid number. Please provide a valid integer." });
  }
  const handshake = secretHandshake(number);
  res.json({
    message: handshake,
    input: number,
    source: typeof number
  });
});

// --------------- Task A : Route to split and remove unique characters
app.get("/split/:datatype", (req: Request, res: Response) => {
  const variable = req.params.datatype;
  const cleanedVariable = variable.split(/[!@#$%^&*()_-]/).join(" "); // Remove special characters
  res.json({
    message: variable,
    revisedString: cleanedVariable,
    source: typeof variable
  });
});

//------------- Task B : Routes to concatenate two parameters
app.get("/:datatype/:data", (req: Request, res: Response) => {
  const datatype = req.params.datatype;
  // --------- If we want to remove unique chars
  // const newDatatype = datatype.replace(/[!@#$%^&*()_-]/g, "");

  const data = req.params.data;
  // --------- If we want to remove unique chars and add space
  // const newData = data.replace(/[!@#$%^&*()_-]/g, " ");

  const concatenatedString = `${datatype}${data}`;
  res.json({
    message: concatenatedString,
    source: "Concatenated"
  });
});
