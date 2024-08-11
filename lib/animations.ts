export const FadeOutUp = {
  from: {
    opacity: '1',
  },
  to: [
    {
      opacity: '0',
      transform: 'translateY(-100px)',
    },
  ],
  durations: ['250ms'],
};

export const FadeInUp = {
  from: {
    opacity: '0',
  },
  to: [
    {
      opacity: '1',
      transform: 'translateY(0px)',
    },
  ],
  durations: ['250ms'],
};
