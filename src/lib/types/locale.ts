export type Dictionary = {
  companyName: string;
  components: {
    header: {
      title: string;
      github: string;
      discord: string;
    };
    footer: {
      flatIcons: string;
      libreTranslate: string;
    };
    message: {
      tryAgain: string;
    };
  };
  screen: {
    translator: {
      loading: string;
      error: string;
      empty: string;
    };
  };
};
