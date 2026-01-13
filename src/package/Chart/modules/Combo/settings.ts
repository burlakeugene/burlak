export default {
  offset: {
    top: 20,
    right: 20,
    bottom: 40,
    left: 60,
  },
  grid: {
    enabled: true,
    offset: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    },
    styles: {
      background: '',
      borderColor: '#2b2a49',
      borderRadius: 0,
      borderWidth: 2,
    },
    horizontal: {
      step: 3,
      enabled: true,
    },
    vertical: {
      step: 4,
      enabled: true,
    },
  },
  labels: {
    enabled: true,
    styles: {
      color: '#fff',
      fontSize: 12,
    },
  },
  values: {
    enabled: true,
    digits: 2,
    count: 10,
    styles: {
      color: '#fff',
      fontSize: 12,
    },
  },
  data: {
    enabled: true,
    offset: 0,
    digits: 2,
    line: {
      offset: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      dots: {
        enabled: true,
        width: 5,
        hover: {
          enabled: true,
          width: 3,
        },
      },
      styles: {
        lineWidth: 2,
      },
    },
    bar: {
      offset: 10,
      hover: {
        enabled: true,
        value: 50,
      },
    },
  },
};
