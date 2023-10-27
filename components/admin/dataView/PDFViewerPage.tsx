import { useIntersectionObserver } from "@wojtekmaj/react-hooks";
import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Page, PageProps } from "react-pdf";


/**
 * Compute IntersectionObserver threshold to detect page in half of the viewport.
 *
 * @param container the viewport root
 * @param height the height of the page
 * @returns 
 */
const computeIntersectionThreshold = (container: HTMLDivElement | null, height: number | null) => {
  return container && height ? Math.min((container.clientHeight / 2) / height, 1) : 0;
}


interface PDFViewerPageProps extends PageProps {
  setCurrentPage: (pageNumber: number) => void;
  scrolledTo: boolean;
  containerRef: RefObject<HTMLDivElement>;
}

export default function PDFViewerPage({ pageNumber, setCurrentPage, scrolledTo, containerRef, ...otherProps }: PDFViewerPageProps) {
  // Component state
  const pageRef = useRef<HTMLCanvasElement>(null);
  const [pageHeight, setPageHeight] = useState<number | null>(null);


  // Scroll to page
  useEffect(() => {
    if (pageRef.current && scrolledTo) {
      pageRef.current.scrollIntoView();
    }
  }, [scrolledTo]);  

  // Detect current page
  const onIntersectionChange: IntersectionObserverCallback = useCallback(([entry]) => {
    if (entry.isIntersecting && pageNumber) {
      setCurrentPage(pageNumber);
    }
  }, [pageNumber, setCurrentPage]);

  const observerOptions = useMemo(() => ({
    threshold: computeIntersectionThreshold(containerRef.current, pageHeight)
  }), [containerRef.current, pageHeight]);

  useIntersectionObserver(pageRef.current, observerOptions, onIntersectionChange);


  return (
    <Page
      canvasRef={pageRef}
      pageNumber={pageNumber}
      onLoadSuccess={page => setPageHeight(Math.floor(page.height))}
      {...otherProps}
    />
  );
}
