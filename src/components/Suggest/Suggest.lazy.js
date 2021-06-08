import React, { lazy, Suspense } from "react";

const LazySuggest = lazy(() => import("./Suggest"));

export default function Suggest(props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazySuggest {...props} />
    </Suspense>
  );
}
