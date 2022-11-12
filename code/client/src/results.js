const Result = ({ link, title, description }) => {
  return (
    <div className="button flex flex-col hover:bg-orange-50 rounded p-3 object-fit">
      <a
        href={link}
        className="hover:underline text-sky-400 visited:text-indigo-800"
      >
        {title}
      </a>
      <span className="text-gray-500">{description}</span>
    </div>
  );
};

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
