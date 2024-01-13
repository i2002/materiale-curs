import { useCallback, useContext, useEffect, useRef } from "react";
import { PDFViewerContext } from "./PDFViewerContext";
import usePdfJs, { InitCallback, PageChangeCallback } from "./usePdfJsHook";


interface Props {
  resUrl: string;
}

export default function PDFViewerContent2({ resUrl }: Props) {
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const { state: { currentPage, scale }, dispatch } = useContext(PDFViewerContext);

  // callback functions
  const initDocCallback: InitCallback = useCallback(({ source }) => {
    const { currentPageNumber, pagesCount } = source;
    dispatch({ type: "numPages", payload: pagesCount })
    dispatch({ type: "currentPage", payload: currentPageNumber });
  }, [dispatch]);

  const changePageCallback: PageChangeCallback = useCallback(data => dispatch({
    type: "currentPage",
    payload: data.pageNumber
  }), [dispatch]);


  // setup pdjs state
  const { loadDocument, setCurrentPage, setScale } = usePdfJs(pdfContainerRef, initDocCallback, changePageCallback);


  // setup actions
  useEffect(() => loadDocument(resUrl), [loadDocument, resUrl]);
  useEffect(() => setCurrentPage(currentPage), [currentPage, setCurrentPage]);
  useEffect(() => setScale(scale), [scale, setScale]);

  return (
    <div ref={pdfContainerRef} className="absolute h-full w-full overflow-auto">
      <div id="viewer" className="pdfViewer"></div>
    </div>
  );
}
