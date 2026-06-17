export const profile = {
  name: '朱钱宇',
  nameEn: 'Zhu Qianyu',
  email: 'zhuqianyu2@gmail.com',
  github: 'https://github.com/Zhu-Qianyu',
  photo: 'images/profile.png',
  photoAlt: 'Zhu Qianyu',
  affiliation: [
    '2022.9–2026.6 · B.S. Intelligent Manufacturing Engineering, Wuhan University of Technology',
    '2025.9–2026.3 · Research Assistant, School of Remote Sensing and Information Engineering, Wuhan University',
    '2026.8–present · M.Sc. Intelligent Manufacturing Engineering, Nanyang Technological University',
  ],
}

export const nav = [
  { id: 'bio', label: 'Biography' },
  { id: 'news', label: 'News' },
  { id: 'publications', label: 'Publications' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'honors', label: 'Honors' },
  { id: 'misc', label: 'Misc' },
]

export const biography = [
  'Hi there! Welcome to my homepage.',
  'I am Zhu Qianyu, finishing my B.S. in Intelligent Manufacturing Engineering at Wuhan University of Technology. I spent my senior year as a full-time research assistant at Wuhan University (Remote Sensing), and will join Nanyang Technological University for an M.Sc. in Intelligent Manufacturing Engineering in Fall 2026.',
  'I work on robotics end to end — hardware structure design, control algorithms, and vision-centric multimodal AI. I also pick up a web stack when a project needs a dashboard or ops platform.',
  'I founded aitebot lab, a robotics-only geek studio at WUT built by students who would rather wire a board than write a deck.',
  'If you are interested in my work or would like to chat, feel free to send me an email.',
]

export const newsItems = [
  {
    date: '2026 Sep',
    text: 'Start M.Sc. in Intelligent Manufacturing Engineering at Nanyang Technological University.',
  },
  {
    date: '2026',
    text: 'Hubei provincial startup grant; personal site relaunched.',
  },
  {
    date: '2025',
    text: 'PIV-FlowDiffuser accepted in Sensors (MDPI, SCI Q2) as sole first author.',
  },
  {
    date: '2025 – 2026',
    text: 'Graduation thesis system live at upaieasy.cn; used by multiple data-collection teams.',
  },
  {
    date: '2025 Sep',
    text: 'Join Prof. Wang Taoyang’s lab at WHU Remote Sensing as a full-time research assistant (7 months).',
  },
  {
    date: '2025',
    text: 'Wuhan municipal startup support; ICAN national third; Business Elite Challenge national second.',
  },
  {
    date: '2024',
    text: 'Found aitebot lab; RoboCup 2024 & CMCC digital innovation national first (both 2nd place) with Artwall concrete 3D printing robot.',
  },
]

export const publications = [
  {
    title: 'PIV-FlowDiffuser: Transfer-Learning-Based Denoising Diffusion Models for Particle Image Velocimetry',
    authors: 'Zhu Qianyu, Li Yong, et al.',
    venue: 'Sensors (MDPI), SCI Q2',
    desc:
      'Conditional diffusion model for particle image velocimetry via transfer learning. Sole first author.',
    links: [
      { text: 'DOI', href: 'https://doi.org/10.3390/s25196077' },
      { text: 'arXiv', href: 'https://arxiv.org/abs/2504.14952' },
      { text: 'Code', href: 'https://github.com/Zhu-Qianyu/PIV-FlowDiffuser' },
    ],
  },
  {
    title: 'Event-Camera-Based Full-Field Measurement of Fluid–Structure Coupled Vibration',
    authors: 'Invention patent · third-listed inventor',
    venue: 'Granted',
    desc: 'Full-field vibration measurement using event cameras for fluid–structure interaction.',
    links: [],
  },
  {
    title: 'Fluid-Vision-Based Bath-Flow Analysis',
    authors: 'Invention patent · self-drafted',
    venue: 'Under re-examination',
    desc: 'Vision-based analysis of bath-scale fluid flow; independently drafted and submitted.',
    links: [],
  },
]

export const projectItems = [
  {
    title: 'UPAIego-management',
    period: '2025 – 2026',
    desc:
      'Ego-centric multi-view data collection ops platform with an AI coworker for chat navigation and form fill. React + Supabase; six-camera hat firmware and partial hardware models. Powers upaieasy.cn.',
    links: [
      { text: 'GitHub', href: 'https://github.com/Zhu-Qianyu/UPAIego-management' },
      { text: 'Site', href: 'https://upaieasy.cn' },
    ],
  },
  {
    title: 'Artwall v1.0 — Concrete 3D Printing Robot',
    period: '2023 – 2024',
    desc:
      'Mobile concrete 3D printing robot with teammates under Prof. Yin Haibin. SLAM-based segmentation printing without gantries or fixed bases.',
    links: [
      {
        text: 'GitHub',
        href: 'https://github.com/Zhu-Qianyu/Artwall-v1.0-A-Concrete-3D-Printing-Robot',
      },
    ],
  },
  {
    title: 'Mr.handy — Agricultural Robot',
    period: '2024 –',
    desc:
      'Open-source farmer robot: remote control, SLAM navigation, Ant Lingbo VLA. Ego + UMI hybrid data collection; ~300 h logged.',
    links: [
      { text: 'GitHub', href: 'https://github.com/Zhu-Qianyu/Mr.handy-A-farmer-robot' },
    ],
  },
]

export const experienceItems = [
  {
    period: '2025.9 – 2026.3',
    title: 'Research Assistant',
    org: 'Wuhan University · School of Remote Sensing and Information Engineering',
    desc: 'Full-time RA during senior year under Prof. Wang Taoyang. Defense pre-research, guidelines, and patent work.',
  },
  {
    period: '2025 – 2026',
    title: 'Graduation Thesis',
    org: 'Advisor: MAX YIN, founder of Saiyuan Technology',
    desc:
      'Terminal–cloud collaborative egocentric multi-view data acquisition system. Platform deployed at upaieasy.cn.',
  },
  {
    period: 'Summer',
    title: 'Visual Inspection Intern',
    org: 'Suzhou Dexingyun',
    desc: 'Industrial vision algorithms for automated inspection.',
  },
]

export const honors = [
  { title: 'RoboCup China · National First Prize (2nd place)', year: '2024' },
  { title: 'CMCC Digital Innovation · National First Prize (2nd place)', year: '2024' },
  { title: 'Hubei Provincial Startup Grant', year: '2026' },
  { title: 'Wuhan Municipal Startup Support', year: '2025' },
  { title: 'ICAN · National Third Prize', year: '2025' },
  { title: 'Business Elite Challenge · National Second Prize', year: '2025' },
]

export const misc = {
  hobbies: ['Travel', 'Swimming', 'Web dev (when a robot needs a UI)'],
}
