export type ComponentProps = {
  id: string;
  title?: string;
  description?: string;
  image?: File | HTMLImageElement;
};

export type SectionProps = {
  id: string;
  title?: string;
  description?: string;
  image?: File | HTMLImageElement;
  components: Array<ComponentProps>;
};

export type BrowserProps = {
  name: string;
  version: string;
};
export type ScreenProps = {
  minWidth?: number;
  optWidth?: number;
  maxWidth?: number;

  minHeight?: number;
  optHeight?: number;
  maxHeight?: number;
};
export type EssentialProps = {
  screen?: ScreenProps;
  browsers?: Array<BrowserProps>;
  etc?: string;
};

export type ManualProps = {
  // info
  project: string;
  title: string;
  version?: string;

  // 1st page
  intro?: string;

  // essential
  essential? :  EssentialProps;

  // contents
  sections: Array<SectionProps>;
};

export default { ManualProps, EssentialProps, BrowserProps, ScreenProps, SectionProps, ComponentProps, };
