import React, { FC } from "react";

interface ButtonListProps {
  onAdd?: () => void;
  onClose?: () => void;
  onSave?: () => void;
  onScan?: () => void;
  position?: "justify-start" | "justify-end";
}

const ButtonList: FC<ButtonListProps> = (props) => {
  const { onAdd, onClose, onSave, position = "justify-end", onScan } = props;

  return (
    <div className={`flex gap-4 ${position}`}>
      {onScan && (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          onClick={onScan}
        >
          Scan
        </button>
      )}
      {onAdd && (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          onClick={onAdd}
        >
          Tambah
        </button>
      )}
      {onClose && (
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          onClick={onClose}
        >
          Back
        </button>
      )}
      {onSave && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          type="submit"
        >
          Simpan
        </button>
      )}
    </div>
  );
};

export default ButtonList;
