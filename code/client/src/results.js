import { Result } from "./result";

export const Results = ({ results }) => {
  return (
    <div className="container mx-auto max-h-80 overflow-x-auto mb-3">
      {results.map((result, index) => (
        <Result
          key={index}
          link="#"
          title={result["02_score"]}
          description={result["04_title"]}
          video=""
        />
      ))}
    </div>
  );
};
