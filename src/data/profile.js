export const profile = {
  name: '朱钱宇',
  nameEn: 'Zhu Qianyu',
  role: 'Full-stack robotics engineer',
  email: 'zhuqianyu2@gmail.com',
  github: 'https://github.com/Zhu-Qianyu',
  photo: 'images/profile.png',
  photoAlt: 'Zhu Qianyu',
  identity: [
    {
      period: '2022.9–2026.6',
      text: 'Wuhan University of Technology · B.S. Intelligent Manufacturing Engineering',
    },
    {
      period: '2025.9–2026.3',
      text: 'Wuhan University · Research assistant, School of Remote Sensing and Information Engineering',
    },
    {
      period: '2026.9–2027.6',
      text: 'Nanyang Technological University · M.Sc. Intelligent Manufacturing Engineering',
    },
    { period: '', text: 'aitebot lab · Founder, WUT' },
  ],
  intro: {
    lead: 'Robotics is where I spend most of my time — from structure and control to models that see.',
    skills: [
      'Hardware structure design',
      'Robot control algorithms',
      'Vision-centric multimodal AI',
    ],
    aside: 'Web stack when a project needs it · travel & swimming off the clock.',
    aitebot:
      'I founded aitebot lab — a robotics-only geek studio at Wuhan University of Technology.',
  },
}

export const nav = [
  { id: 'work', label: 'Work' },
  { id: 'research', label: 'Research' },
  { id: 'venture', label: 'Venture' },
  { id: 'contact', label: 'Contact' },
]

export const themes = [
  { id: 'blue', label: 'Blue theme' },
  { id: 'purple', label: 'Purple theme' },
  { id: 'hotpink', label: 'Hotpink theme' },
  { id: 'black', label: 'Black theme' },
]

export const workItems = [
  {
    period: '2025 – 2026',
    title: 'Graduation thesis · First-person multi-view video data acquisition system',
    advisor: 'Advisor: MAX YIN, founder of Saiyuan Technology',
    descHtml:
      'Designed a terminal–cloud collaborative, large-scale egocentric multi-view data acquisition system. The collection platform <a href="https://upaieasy.cn" target="_blank" rel="noopener noreferrer">upaieasy.cn</a> is used by multiple data-collection teams and contractors.',
  },
  {
    period: '2023 – 2024',
    title: 'Concrete 3D printing robot',
    desc:
      'Built from scratch under Prof. Yin Haibin. Led design, patents, and drawings through factory assembly; RoboCup 2024 national first prize (2nd place) and CMCC digital innovation national first prize (2nd place). Main costs self-funded.',
  },
  {
    period: 'Internship',
    title: 'Suzhou Dexingyun · Visual inspection',
    desc: 'Summer internship in industrial vision inspection algorithms.',
  },
  {
    period: '2025.9–2026.3',
    title: 'Wuhan University · Research assistant',
    desc: 'Full-time research assistant during senior year, 7 months.',
  },
  {
    period: 'Defense R&D',
    title: 'Wuhan University · Prof. Wang Taoyang',
    desc: 'Closed two defense pre-research projects; wrote guidelines; patent applications.',
  },
]

export const researchItems = [
  {
    period: '2025',
    title: 'PIV-FlowDiffuser · SCI Q2',
    desc:
      'Conditional diffusion model for particle image velocimetry. Sole first author, Sensors (MDPI). Advisor: Li Yong.',
    links: [
      { text: 'DOI', href: 'https://doi.org/10.3390/s25196077' },
      { text: 'Code', href: 'https://github.com/Zhu-Qianyu/PIV-FlowDiffuser' },
      { text: 'arXiv', href: 'https://arxiv.org/abs/2504.14952' },
    ],
  },
  {
    period: 'Patent',
    title: 'Event camera · fluid–structure coupled vibration full-field measurement',
    desc: 'Granted invention patent; third-listed inventor.',
  },
  {
    period: 'Patent',
    title: 'Fluid vision · bath-flow analysis',
    desc: 'Self-drafted and submitted; under re-examination.',
  },
]

export const ventureItems = [
  {
    period: '2024 –',
    title: 'aitebot lab',
    desc:
      'Founder. A robotics-only geek studio at Wuhan University of Technology — built by students who would rather wire a board than write a deck.',
  },
  {
    period: 'R&D',
    title: 'Agricultural VLA robot',
    desc:
      'Ant Lingbo VLA base; ego + UMI hybrid data collection; prototype complete, ~300 h of data.',
  },
  {
    period: 'Awards',
    title: 'Funding & competitions',
    desc:
      '2025 Wuhan municipal support · 2026 Hubei provincial startup grant · ICAN national third · Business Elite Challenge national second.',
  },
]
