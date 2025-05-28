declare module 'dom-to-image' {
    const domtoimage: {
      toBlob(node: HTMLElement): Promise<Blob>;
      toPng(node: HTMLElement): Promise<string>;
      toJpeg(node: HTMLElement, quality?: number): Promise<string>;
      toSvg(node: HTMLElement): Promise<string>;
    };
    export default domtoimage;
  }
  