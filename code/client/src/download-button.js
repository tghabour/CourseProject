import "bootstrap-icons/font/bootstrap-icons.css";

export function DownloadButton({ label, url }) {
  return (
    <a
      href={url}
      className="pl-5 inline-flex w-20 hover:bg-orange-600 bg-orange-300 text-orange-900 hover:text-white text-xs p-1 rounded mr-4"
    >
      {label}
      <span className="pl-1">
        <i className="bi bi-file-arrow-down leading-none text-base"></i>
      </span>
    </a>
  );
}