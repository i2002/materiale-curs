import { RefObject, useCallback, useEffect, useState } from "react";
import { pdfjs, Document, Outline } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import PDFViewerPage from "./PDFViewerPage";


// Setup PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url,).toString();

// PDF view options
const maxWidth = 1200;
const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};
const resizeOptions = {};


interface Props {
  fileUrl: string;
  numPages: number;
  scale: number;
  scrollToPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  onDocumentLoadSuccess: (doc: PDFDocumentProxy) => void;
  containerRef: RefObject<HTMLDivElement>;
}

export default function PDFViewerContent(props: Props) {
  const { fileUrl, numPages, scale, setCurrentPage, scrollToPage, onDocumentLoadSuccess, containerRef } = props;

  // Component state
  const [containerWidth, setContainerWidth] = useState<number>();
  const [scrollPos, setScrollPos] = useState<number>(0);


  // Adjust container width on window resize
  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    if (entries.length >= 1 && entries[0]) {
      setContainerWidth(prev => {
        const lastWidth = prev ? Math.min(prev, maxWidth) : maxWidth;
        const newWidth = entries[0].contentRect.width;

        if (containerRef.current) {
          const actualWidth = newWidth ? Math.min(newWidth, maxWidth) : maxWidth;
          setScrollPos(Math.floor(containerRef.current.scrollTop * (actualWidth / lastWidth)));
        }

        return newWidth;
      });
    }
  }, []);

  useResizeObserver(containerRef.current, resizeOptions, onResize);


  // Perserve scroll position after resize
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = scrollPos;
    }
  }, [containerWidth]);


  return (
    <div className="w-full max-w-[calc(100% - 2em)]">
      <Document
        file={fileUrl}
        options={options}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<div className="p-4 h-full text-white">Se încarcă documentul...</div>}
        error={<div className="p-4 h-full text-white">Eroare la încărcare document.</div>}
        className="flex flex-col items-center"
      >
        {Array.from(new Array(numPages), (_, index) => (
          <PDFViewerPage
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
            scale={scale}
            scrolledTo={scrollToPage == index}
            containerRef={containerRef}
            setCurrentPage={setCurrentPage}
            className="my-4 shadow-md"
          />
        ))}
      </Document>
    </div>
  );
}
