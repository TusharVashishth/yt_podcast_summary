import React from "react";

export default function loading() {
  return (
    <div className="flex justify-center items-center my-5">
      <div className="animate-spin w-10 h-10 border-t-4 border-b-4  border-indigo-500 rounded-full"></div>
    </div>
  );
}
