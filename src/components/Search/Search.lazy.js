import React, { Suspense } from "react";

const LazySearch = React.lazy(() => import("./Search"));

export default function Search() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazySearch />
      </Suspense>
    </div>
  );
}
