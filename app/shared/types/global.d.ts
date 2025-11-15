interface Window {
  VKIDSDK?: {
    Config: {
      init: (config: {
        app: number;
        redirectUrl: string;
        responseMode: any;
        source: any;
        scope: string;
      }) => void;
    };
    OneTap: new () => any;
    WidgetEvents: any;
    OneTapInternalEvents: any;
    ConfigResponseMode: any;
    ConfigSource: any;
  };
}
