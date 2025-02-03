export function Spinner() {
  return (
    <svg viewBox="0 0 100 100" width="100">
      <circle className="spinner circle" cx="50" cy="50" r="45" />
      <rect className="spinner rect" x="25" y="25" width="50" height="50" />
      <polygon
        className="spinner hex"
        points="63,57.5 50,65 37,57 37,42.5 50,35 63,42.5"
      />
    </svg>
  );
}