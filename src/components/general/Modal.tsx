import * as React from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  onClick: () => void;
  children: React.ReactNode;
};

type OnClickProps = {
  onClick: () => void;
};
function BackDrop({ onClick }: OnClickProps) {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-slate-900/80 overflow-hidden z-2"
      onClick={onClick}
    />
  );
}

type OverlayProps = {
  children: React.ReactNode;
};

function Overlay({ children }: OverlayProps) {
  return (
    <div className="fixed top-1/4 left-1/3 w-2/5 rounded-xl text-slate-800 p-4 flex flex-col justify-center items-center z-10">
      {children}
    </div>
  );
}

export default function Modal({ onClick, children }: ModalProps) {
  return (
    <>
      {createPortal(
        <BackDrop onClick={onClick} />,
        document.getElementById("overlay")!
      )}

      {createPortal(
        <Overlay>{children}</Overlay>,
        document.getElementById("overlay")!
      )}
    </>
  );
}
