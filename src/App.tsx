import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Basic from "./layouts/Basic";
import ErrorBoundary from "./components/ErrorBoundary";

const Home = React.lazy(() => import("./pages/homepage"));

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<Basic />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
