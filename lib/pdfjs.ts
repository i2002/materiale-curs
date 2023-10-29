import * as pdfjsModule from 'pdfjs-dist';
import * as pdfjsViewerModule from 'pdfjs-dist/web/pdf_viewer';

export type PdfjsLib = typeof pdfjsModule;
export const pdfjs = ('default' in pdfjsModule ? pdfjsModule['default'] : pdfjsModule) as PdfjsLib;

export type PdfJsViewer = typeof pdfjsViewerModule;
export const pdfjsViewer = ('default' in pdfjsViewerModule ? pdfjsViewerModule['default'] : pdfjsViewerModule) as PdfJsViewer;
