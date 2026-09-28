import NavBar from './NavBar';

export default {
  title: 'Layout/NavBar',
  component: NavBar,
  parameters: {
    // NavBar reads `categories` from useContent() and uses <NavLink> from
    // react-router-dom, both of which are supplied globally by the
    // AppDecorator in .storybook/preview.jsx — no per-story setup needed.
    layout: 'fullscreen',
  },
};

export const Default = {};
