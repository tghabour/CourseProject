export const TextBox = (props) => {
  return (
    <div className="container mx-auto mt-3 p-3 max-h-80 overflow-x-auto rounded-md border-2 border-gray-300 text-sm text-gray-500 ">
      <p className="m-2">
        {props.text}
      </p>
    </div>
  );
};
