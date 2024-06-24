/* eslint-disable max-len */

const INTRINSIC_WIDTH = 28;
const INTRINSIC_HEIGHT = 24;

export default function IconSquare({
  width = INTRINSIC_WIDTH,
  includeTitle = true,
}: {
  width?: number
  includeTitle?: boolean
}) {
  return (
    <svg
      width={width}
      height={(INTRINSIC_HEIGHT * width) / INTRINSIC_WIDTH}
      viewBox="0 0 28 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      {includeTitle && <title>Square</title>}
      <rect x="9" y="6.625" width="11" height="11" rx="1" ry="1" strokeWidth="1.25"/>
    </svg>
  );
};
