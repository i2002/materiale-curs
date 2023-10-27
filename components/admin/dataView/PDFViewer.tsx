"use client"

import React, { useCallback, useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import PDFViewerToolbar from "./PDFViewerToolbar";
import ResourceViewerHeader from "./ResourceViewerHeader";
import PDFViewerContent from "./PDFViewerContent";


interface Props {
  name: string;
  resUrl: string;
}

export default function PDFViewer({ name, resUrl }: Props) {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scrollToPage, setScrollToPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  return (
    <ResourceViewerHeader
      name={name}
      toolbar={
        <PDFViewerToolbar
          currentPage={currentPage}
          numPages={numPages}
          scale={scale}
          setScale={setScale}
          scrollToPage={page => setScrollToPage(page)}
        />
      }
      ref={containerRef}
    >
      <PDFViewerContent
        fileUrl={resUrl}
        numPages={numPages}
        scale={scale}
        onDocumentLoadSuccess={onDocumentLoadSuccess}
        setCurrentPage={setCurrentPage}
        scrollToPage={scrollToPage}
        containerRef={containerRef}
      />
    </ResourceViewerHeader>
  );
}
