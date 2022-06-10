const DEFINE_TYPE = new RegExp(/^자고로 ([가-힇]+)\(이\)란$/);
const DEFINE_ATTR = new RegExp(
  /^([가-힇]+)\(이\)란 ([가-힇]+)에 불과하고?다?$/
);
const DEFINE_VAR = new RegExp(/^그러니까 라고?$/);

const getType = (typestr: string) => {
  const types: { [key: string]: string } = {
    숫자: "number",
    문자: "string",
    논리: "boolean",
  };

  return types[typestr];
};

const parseLine = (code: string) => {
  let matchVal;

  if (code === "") return "";
  if (code === "에잉 쯧쯧쯧") return "}";

  if ((matchVal = code.match(DEFINE_TYPE))) {
    return `type ${matchVal[1]} {`;
  } else if ((matchVal = code.match(DEFINE_ATTR))) {
    const matchType = getType(matchVal[2]);
    if (matchType === undefined) {
      throw new Error(matchVal[2] + "(은)는 무슨 말이냐 에잉 쯧쯧쯧..");
    }
    return `${matchVal[1]}: ${matchType}`;
  }
};

export default (code: TemplateStringsArray) => {
  code.map((codetext) => {
    let parsedCode: string = "";
    const seperatedCode = codetext.split("\n");

    seperatedCode.forEach((val, i) => {
      console.log("LINE", i + 1, val);
      const parsedLine = parseLine(val.trim());
      if (typeof parsedLine === "string") {
        parsedCode += parsedLine + "\n";
      }
    });

    console.log(parsedCode);
  });
};
