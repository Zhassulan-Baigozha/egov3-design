import type { Preview } from '@storybook/react';
import 'src/styles/globals.scss';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'input',
      values: [
        {
          name: 'input',
          value: '#fff',
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
