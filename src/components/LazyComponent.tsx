import { Suspense, ReactNode } from "react"
import ErrorBoundary from "./ErrorBoundary"
import LoadingPage from "./LoadingPage"

interface LazyComponentProps {
  children: ReactNode;
}

const LazyComponent: React.FC<LazyComponentProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingPage />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  )
}

export default LazyComponent;