import TopBar from './TopBar';

export default {
  title: 'Layout/TopBar',
  component: TopBar,
  parameters: {
    layout: 'fullscreen',
  },
};

// Default closed state. Click the menu icon (top-left) to open the
// slide-out nav — TopBar manages that as local state, so it's fully
// interactive right inside Storybook's canvas.
export const Default = {};
