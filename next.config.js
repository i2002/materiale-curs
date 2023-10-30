const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const pdfjsPath = path.dirname(require.resolve("pdfjs-dist/package.json"));
const pdfjsOutPath = path.join("static", "pdfjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.join(pdfjsPath, "web", "pdf_viewer.css"),
            to: pdfjsOutPath,
          },
          {
            from: path.join(pdfjsPath, "web", "images"),
            to: path.join(pdfjsOutPath, "images"),
          },
          {
            from: path.join(pdfjsPath, "cmaps"),
            to: path.join(pdfjsOutPath, "cmaps")
          },
          
        ],
      })
    );
    return config;
  },
}

module.exports = nextConfig
