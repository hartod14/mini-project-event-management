import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/outline";
import React from "react";
import Swal from "sweetalert2";

interface ButtonActionProps {
  onShow?: () => void;
  onDelete?: () => void;
  onUpdate?: () => void;
}

export default function PanelButtonAction(props: ButtonActionProps) {
  const { onDelete, onShow, onUpdate } = props;
  return (
    <div className="flex gap-2 items-center">
      {onShow && <EyeIcon width={32} height={32} className=" cursor-pointer" onClick={onShow} />}
      {onUpdate && (
        <PencilSquareIcon
          onClick={() => onUpdate()}
          width={32} height={32}
          className="text-yellow-800 cursor-pointer"
        />
      )}
      {onDelete && (
        <TrashIcon
          width={32} height={32}
          className="text-red-800 cursor-pointer"
          onClick={() => {
            Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes",
            }).then(async (result) => {
              if (result.isConfirmed) {
                try {
                  await onDelete();
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                  });
                } catch {
                } finally {
                }
              }
            });
          }}
        />
      )}
    </div>
  );
};
