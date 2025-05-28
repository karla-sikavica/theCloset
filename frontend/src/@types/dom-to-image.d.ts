declare module 'dom-to-image-more' {
    interface Options {
      width?: number;
      height?: number;
      style?: Partial<CSSStyleDeclaration>;
      quality?: number;
      bgcolor?: string;
      filter?: (node: HTMLElement) => boolean;
      imagePlaceholder?: string;
      cacheBust?: boolean;
    }
  
    const domtoimage: {
      toSvg(node: HTMLElement, options?: Options): Promise<string>;
      toPng(node: HTMLElement, options?: Options): Promise<string>;
      toJpeg(node: HTMLElement, options?: Options): Promise<string>;
      toBlob(node: HTMLElement, options?: Options): Promise<Blob>;
      toPixelData(node: HTMLElement, options?: Options): Promise<Uint8ClampedArray>;
    };
  
    export default domtoimage;
  }
  