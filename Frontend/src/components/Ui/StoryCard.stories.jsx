import StoryCard from './StoryCard';

const sampleImage = 'https://picsum.photos/seed/storycard-demo/500/375';

export default {
  title: 'UI/StoryCard',
  component: StoryCard,
  // StoryCard has no intrinsic width of its own — in the real app it always
  // sits inside a grid/flex column that constrains it. This decorator
  // recreates a typical column width so the card doesn't stretch full-bleed.
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['grid', 'list', 'text'],
    },
    size: {
      control: 'select',
      options: ['default', 'large'],
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
    },
  },
  args: {
    title: 'Underdog nation stuns favourites to reach tournament final',
    summary:
      'A dominant second-half display sealed a place in the final for the first time in the country\u2019s history.',
    imageUrl: sampleImage,
    category: 'Sport',
    timestamp: '4 hrs ago',
    href: '#',
  },
};

// Default grid card, as used throughout the homepage in bordered story lists.
export const Grid = {
  args: {
    bordered: true,
  },
};

// Unbordered grid card, as used in hero-adjacent layouts like MoreNews.
export const Unbordered = {
  args: {
    bordered: false,
  },
};

// Compact horizontal layout, used in sidebars like NewsColumns' right rail.
export const List = {
  args: {
    variant: 'list',
    bordered: false,
  },
};

// Headline-only layout with no image, used for text-first rundowns.
export const TextOnly = {
  args: {
    variant: 'text',
    bordered: false,
    imageUrl: undefined,
  },
};

// Large size, used for the single featured story in NewsColumns.
export const Large = {
  args: {
    size: 'large',
    bordered: false,
  },
};

// Dark theme, used in EditorsPicks against a dark background. That dark
// background comes from EditorsPicks' own container, not StoryCard itself,
// so we recreate it here — otherwise white text would render on white.
export const Dark = {
  args: {
    theme: 'dark',
    bordered: false,
    source: 'TechXplore',
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-900 p-6">
        <Story />
      </div>
    ),
  ],
};

// Audio/video duration badge with a centered play button, as in AudioSlider.
export const WithDuration = {
  args: {
    duration: '27 mins',
    bordered: false,
  },
};

// Numbered ranking badge, as used in top-N lists.
export const Ranked = {
  args: {
    rank: 1,
    bordered: false,
  },
};

// Live badge, as used for ongoing coverage like a match or breaking event.
export const Live = {
  args: {
    live: true,
    bordered: false,
  },
};

// Corner ribbon badge, as used in EditorsPicks for "Reaction" / "Full Time Scenes".
export const WithBadge = {
  args: {
    badge: 'Reaction',
    bordered: false,
  },
};

// Audio slider item, as used in AudioSlider (BestAudio, LatestSportsAudio).
// Square artwork, an eyebrow label above the title, and a controlled
// Save toggle that lives outside the card's own link.
export const Audio = {
  args: {
    variant: 'audio',
    title: "Inside this year's biggest sporting comeback",
    eyebrow: 'The Weekly Wrap',
    duration: '27 mins',
    saved: false,
    onToggleSave: () => {},
  },
};

// Same as above, but toggled into the "Saved" state.
export const AudioSaved = {
  args: {
    ...Audio.args,
    saved: true,
  },
};

// Photo-led story, as used in the KattyKay section. No fixed aspect ratio —
// the image keeps its natural proportions — and the hover effect dims the
// image itself rather than the whole card.
export const Photo = {
  args: {
    variant: 'photo',
    title: 'How companies could end up firing their customers',
    summary:
      'Researchers modelled AI job losses and found a seemingly unavoidable trap that every company could see coming.',
    videoIcon: true,
  },
};
