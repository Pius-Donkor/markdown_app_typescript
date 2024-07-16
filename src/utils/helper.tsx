import BlockParagraph from "../ui/BlockParagraph";
import Paragraph from "../ui/Paragraph";

// Function to parse markdown text
export const parseMarkdown = (
  text: string,
  isDark?: boolean
): JSX.Element[] => {
  const lines = text.split("\n");
  const elements: JSX.Element[] = [];
  let currentParagraph = "";
  let inSeaBlueDiv = false;

  const pushParagraph = () => {
    if (currentParagraph) {
      if (inSeaBlueDiv) {
        elements.push(
          <BlockParagraph $isDark={isDark} key={elements.length}>
            {currentParagraph}
          </BlockParagraph>
        );
      } else {
        elements.push(
          <Paragraph $isDark={isDark} key={elements.length}>
            {currentParagraph}
          </Paragraph>
        );
      }
      currentParagraph = "";
      inSeaBlueDiv = false;
    }
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    if (trimmedLine === "") {
      pushParagraph();
      elements.push(<br key={index} />);
    } else if (/^######/.test(trimmedLine)) {
      pushParagraph();
      elements.push(<h6 key={index}>{trimmedLine.slice(6)}</h6>);
    } else if (/^#####/.test(trimmedLine)) {
      pushParagraph();
      elements.push(<h5 key={index}>{trimmedLine.slice(5)}</h5>);
    } else if (/^####/.test(trimmedLine)) {
      pushParagraph();
      elements.push(<h4 key={index}>{trimmedLine.slice(4)}</h4>);
    } else if (/^###/.test(trimmedLine)) {
      pushParagraph();
      elements.push(<h3 key={index}>{trimmedLine.slice(3)}</h3>);
    } else if (/^##/.test(trimmedLine)) {
      pushParagraph();
      elements.push(<h2 key={index}>{trimmedLine.slice(2)}</h2>);
    } else if (/^#/.test(trimmedLine)) {
      pushParagraph();
      elements.push(<h1 key={index}>{trimmedLine.slice(1)}</h1>);
    } else if (/^\d+\./.test(trimmedLine)) {
      pushParagraph();
      elements.push(
        <Paragraph $isDark={isDark} type="numberPoint" key={index}>
          <span>{trimmedLine.match(/^\d+\./)?.[0]}</span>
          {trimmedLine.slice(trimmedLine.indexOf(".") + 1)}
        </Paragraph>
      );
    } else if (/^-/.test(trimmedLine) && !/^---/.test(trimmedLine)) {
      pushParagraph();
      elements.push(
        <Paragraph $isDark={isDark} type="point" key={index}>
          {trimmedLine.slice(1)}
        </Paragraph>
      );
    } else if (/^>/.test(trimmedLine)) {
      pushParagraph();
      elements.push(
        <BlockParagraph $isDark={isDark} type="bordered" key={index}>
          {trimmedLine.slice(1)}
        </BlockParagraph>
      );
    } else if (/^---$/.test(trimmedLine)) {
      if (inSeaBlueDiv) {
        pushParagraph();
      } else {
        inSeaBlueDiv = true;
      }
    } else {
      if (currentParagraph) {
        currentParagraph += ` ${trimmedLine}`;
      } else {
        currentParagraph = trimmedLine;
      }
    }
  });

  pushParagraph();
  return elements;
};

// Function to format the date
export function formatDate(): string {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return ` ${day} ${month} ${year}`;
}

export function generateUniqueId(): string {
  const timestamp = Date.now(); // Current timestamp in milliseconds
  const randomNum = Math.random().toString(36).substring(2, 12); // Random alphanumeric string
  // Example output: "1688159163035-1d7kh9fsd7"
  return `${timestamp}-${randomNum}`;
}
