interface Theme {
  colours: {
    primary: string;
    success: string;
    error: string;
    warning: string;
    primaryBackground: string;
    warningHighlight: string;
    successHighlight: string;
  };
  text: {
    colours: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    sizes: {
      title: number;
      info: number;
      label: number;
      button: number;
    };
  };
}

export const theme: Theme = {
  colours: {
    primary: '#636BF6',
    success: '#24CAB8',
    error: '#EF2E88',
    warning: '#FCD878',
    primaryBackground: '#F8FBFF',
    warningHighlight: '#FFF9E9',
    successHighlight: '#CFFFFA',
  },
  text: {
    colours: {
      primary: '#4C515C',
      secondary: '#9DA2A9',
      tertiary: '#666C73',
    },
    sizes: {
      title: 36,
      info: 12,
      label: 10,
      button: 14,
    },
  },
};
