// ============================================
// WEBSITE DATA — EDIT ONLY THIS FILE
// ============================================

const websitesData = [
  {
    id: 'anantachitra',
    name: 'Anantachitra',
    shortDesc: 'Cinematic wallpaper collection with immersive 3D visuals.',
    url: 'https://snadiok4923a.github.io/ANANTACHITRA/',
    description: `Anantachitra is an interactive wallpaper exploration platform that combines a large visual collection with immersive 3D animations.

The website features a Three.js-powered particle background, responsive masonry gallery, wallpaper search, category filtering, fullscreen image viewing, and direct downloads.

It is designed to make wallpaper discovery feel more like exploring a visual experience than browsing a traditional image gallery.`,
    features: ['3D Experience', 'Interactive', 'Gallery']
  },
  {
    id: 'thoughtflow',
    name: 'ThoughtFlow',
    shortDesc: 'A visual thinking and mind-mapping workspace.',
    url: 'https://snadiok4923a.github.io/Thought_Flow/',
    description: `ThoughtFlow is a visual thinking and mind-mapping workspace for organizing ideas, thoughts, knowledge, studies, plans, and projects in a clear and structured way.\n\nIt allows users to connect related ideas visually instead of keeping information scattered across separate notes.`,
    features: ['Shortcuts', 'User Manual'],
    shortcuts: [
      { key: 'Ctrl + Z', action: 'Undo last Mind Map action' },
      { key: 'Ctrl + Shift + Z', action: 'Redo last Mind Map action' },
      { key: 'Ctrl + Shift + X', action: 'Toggle Preview window' },
      { key: 'Ctrl + Alt + Z', action: 'Reset Node Inspector/sidebar width' },
      { key: 'Ctrl + Alt + X', action: 'Open/close Node Inspector' },
      { key: 'Delete', action: 'Delete selected node/nodes' },
      { key: 'Triple Left Click', action: 'Delete node' },
      { key: 'Alt + +', action: 'Zoom In Mind Map' },
      { key: 'Alt + -', action: 'Zoom Out' },
      { key: 'Alt + 0', action: 'Reset file-content zoom' },
      { key: 'Shift + Drag', action: 'Select nodes' }
    ],
    manual: [
      'Creating a Mind Map', 'Creating New Nodes', 'Building Branches',
      'Selecting Nodes', 'Moving Nodes', 'Writing Detailed Notes',
      'Formatting Notes', 'Adding Images', 'Read Mode',
      'Resizing Inspector', 'Organizing Node Layout', 'Collapsing Branches',
      'Deleting Nodes', 'Undo and Redo', 'Importing and Exporting Mind Maps',
      'Working With Other Files', '3 click on a node is going to delete it'
    ]
  },
  {
    id: 'aatmikx',
    name: 'AatmikX',
    shortDesc: 'Personal portfolio showcasing skills and creative work.',
    url: 'https://snadiok4923a.github.io/AatmikX/',
    description: `AatmikX is a personal portfolio website created to showcase Sandipan Paul's skills, creative work, projects, and professional identity.\n\nIt brings together work related to:\n• UI/UX Design\n• Game Development\n• Web Development\n• Music Production\n• Content Creation\n• Information Technology\n\nVisitors can explore skills, projects, creative work, music and gaming work, and professional opportunities/collaboration.`,
    features: ['Portfolio']
  },
  {
    id: 'aaxmusic',
    name: 'AAX Music',
    shortDesc: 'Modern music platform for experiencing original sounds.',
    url: 'https://snadiok4923a.github.io/AAX-Music/',
    description: `AAX Music is a personal music platform created around original music and a dedicated listening experience.\n\nVisitors can explore music, playlists, different sound/vibes, and enter the Nexus Player for an immersive listening experience.\n\nIt is designed as a modern music platform for experiencing and discovering music.`,
    features: ['Music', 'Nexus Player']
  },
  {
    id: 'soundspace',
    name: 'SoundSpace',
    shortDesc: 'Interactive music exploration and visual universe.',
    url: 'https://snadiok4923a.github.io/SPACE/',
    description: `SoundSpace is an interactive music exploration website that presents music as a visual universe of galaxies, genres, and songs.\n\nInstead of presenting music only as a traditional list, users can explore relationships between genres and tracks through an interactive musical universe.\n\nIt is designed for music discovery and visual exploration.`,
    features: ['Discovery', 'Interactive']
  }
];

export default websitesData;
