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
  'I am Zhu Qianyu. I graduated with a B.S. in Intelligent Manufacturing Engineering from Wuhan University of Technology in June 2026. I spent my senior year as a research assistant in Prof. Wang Taoyang’s lab at WHU Remote Sensing, and will start an M.Sc. in Intelligent Manufacturing Engineering at Nanyang Technological University in August 2026.',
  'I work on robotics end to end — hardware structure design, control algorithms, and vision-centric multimodal AI. I also pick up a web stack when a project needs a dashboard or ops platform.',
  'In June 2023 I founded aitebot lab, a studio of pure tech enthusiasts at WUT. In September 2024 we registered the company entity Aitebot (Hongshan, Wuhan, Hubei) Intelligent Robotics Co., Ltd.',
  'If you are interested in my work or would like to chat, feel free to send me an email.',
]

export const newsItems = [
  {
    date: '2026.6',
    text: 'Graduated with a B.S. in Intelligent Manufacturing Engineering from Wuhan University of Technology.',
  },
  {
    date: '2026.6',
    text: 'Invention patent granted: real-time bath syncope early-warning method and device based on multi-sensor comfort feedback · first inventor.',
  },
  {
    date: '2026.1',
    text: 'Invention patent published: 一种基于视觉点云测算的缺口隔断墙模型生成方法 · second inventor.',
  },
  {
    date: '2026.5',
    text: 'aitebot partnered with 深研 Studio.',
  },
  {
    date: '2026.5',
    text: 'upaieasy.cn launched; adopted by ego data-collection teams in Suzhou, Nanning, and elsewhere.',
  },
  {
    date: '2026.4',
    text: 'aitebot company entity invited to join the NVIDIA Inception Program.',
  },
  {
    date: '2026.3',
    text: 'Completed undergraduate thesis with MAX YIN (Saiyuan Technology).',
  },
  {
    date: '2026.1',
    text: 'Accepted to NTU M.Sc. Intelligent Manufacturing Engineering; starting August 2026.',
  },
  {
    date: '2025.11',
    text: 'Wuhan municipal college startup grant.',
  },
  {
    date: '2025.11',
    text: 'ICAN national third prize · “筑墙智匠” concrete 3D printing robot · team captain.',
  },
  {
    date: '2025.10',
    text: 'Business Elite Challenge national second prize · aitebot lab · team captain.',
  },
  {
    date: '2025.9',
    text: 'PIV-FlowDiffuser accepted in Sensors (MDPI, SCI Q2) · sole first author.',
  },
  {
    date: '2025.9',
    text: 'Joined Prof. Wang Taoyang’s lab, WHU School of Remote Sensing and Information Engineering.',
  },
  {
    date: '2025.4',
    text: 'PIV-FlowDiffuser preprint on arXiv and code released on GitHub.',
  },
  {
    date: '2024.12',
    text: 'Utility model patent granted: print arm for 3D printer · third inventor.',
  },
  {
    date: '2024.12',
    text: 'Invention patent granted: event-camera fluid–structure coupled vibration full-field measurement · third inventor.',
  },
  {
    date: '2024.11',
    text: 'CMCC national first prize: design of a high-rise partition-wall 3D printing robot · team lead.',
  },
  {
    date: '2024.10',
    text: 'RoboCup national first prize: “筑墙智匠” 3D printing robot · team lead.',
  },
  {
    date: '2024.9',
    text: 'Registered company entity Aitebot (Hongshan, Wuhan, Hubei) Intelligent Robotics Co., Ltd.',
  },
  {
    date: '2023.6',
    text: 'Founded aitebot lab — a studio of pure tech enthusiasts.',
  },
]

export const publications = [
  {
    title:
      'PIV-FlowDiffuser: Transfer-Learning-Based Denoising Diffusion Models for Particle Image Velocimetry',
    authors: 'Zhu Qianyu, Li Yong, et al.',
    venue: 'Sensors (MDPI), SCI Q2 · accepted Sep 2025',
    desc:
      'Transfer-learning-based denoising diffusion models for PIV. Sole first author. Preprint and code released Apr 2025.',
    image: 'figures/piv-flowdiffuser.jpg',
    links: [
      { text: 'DOI', href: 'https://doi.org/10.3390/s25196077' },
      { text: 'arXiv', href: 'https://arxiv.org/abs/2504.14952' },
      { text: 'Code', href: 'https://github.com/Zhu-Qianyu/PIV-FlowDiffuser' },
    ],
  },
  {
    title:
      '基于多传感器舒适度实时反馈的泡澡晕厥预警方法及装置 (Real-Time Bath Syncope Early-Warning Method and Device Based on Multi-Sensor Comfort Feedback)',
    authors: '发明专利 · 第一发明人',
    venue: 'Granted · Jun 2026',
    desc: 'Multi-sensor comfort feedback for real-time bath syncope early warning.',
    image: 'figures/bath-syncope.jpg',
    links: [],
  },
  {
    title:
      '一种基于视觉点云测算的缺口隔断墙模型生成方法 (Gap Partition Wall Model Generation Method Based on Visual Point Cloud Measurement)',
    authors: '发明专利 · 第二发明人',
    venue: 'Published · Jan 2026',
    desc: 'Generates gap partition wall models from visual point cloud measurement for 3D printing workflows.',
    image: 'figures/gap-partition-wall.jpg',
    links: [],
  },
  {
    title:
      '一种基于事件相机的流固耦合振动全场测量装置及方法 (Event-Camera Apparatus and Method for Full-Field Fluid–Structure Coupled Vibration Measurement)',
    authors: '发明专利 · 第三发明人',
    venue: 'Granted · Dec 2024',
    desc: 'Full-field vibration measurement using event cameras for fluid–structure interaction.',
    image: 'figures/event-camera-fsi.jpg',
    links: [],
  },
]

export const projectItems = [
  {
    title: 'UPAIego-management · upaieasy.cn',
    period: '2025 – 2026',
    desc:
      'Ego-centric multi-view data collection ops platform (thesis project with MAX YIN). React + Supabase; six-camera hat firmware. Live at upaieasy.cn — used by teams in Suzhou, Nanning, and elsewhere.',
    image: 'figures/upaieasy.jpg',
    links: [
      { text: 'GitHub', href: 'https://github.com/Zhu-Qianyu/UPAIego-management' },
      { text: 'Site', href: 'https://upaieasy.cn' },
    ],
  },
  {
    title: '筑墙智匠 · Artwall v1.0 — Concrete 3D Printing Robot',
    period: '2023 – 2024',
    desc:
      '“Wall-Building Craftsman” mobile concrete 3D printing robot under Prof. Yin Haibin. SLAM-based segmented printing without gantries. RoboCup & CMCC national first prizes (2024) · team lead.',
    image: 'figures/artwall-v1.jpg',
    links: [
      {
        text: 'GitHub',
        href: 'https://github.com/Zhu-Qianyu/Artwall-v1.0-A-Concrete-3D-Printing-Robot',
      },
    ],
  },
]

export const experienceItems = [
  {
    period: '2023.6 – present',
    title: 'Founder',
    org: 'aitebot lab · Aitebot Intelligent Robotics Co., Ltd. (Wuhan)',
    desc:
      'Built a tech-enthusiast robotics studio at WUT; registered company entity Sep 2024. NVIDIA Inception (Apr 2026); partnership with 深研 Studio (May 2026).',
  },
  {
    period: '2025.9 – 2026.3',
    title: 'Research Assistant',
    org: 'Wuhan University · Prof. Wang Taoyang, School of Remote Sensing',
    desc: 'Full-time RA during senior year. Defense pre-research, guidelines, and patent work.',
  },
  {
    period: '2025 – 2026.3',
    title: 'Undergraduate Thesis',
    org: 'Advisor: MAX YIN, founder of Saiyuan Technology',
    desc:
      'Terminal–cloud collaborative egocentric multi-view data acquisition system. Deployed at upaieasy.cn (May 2026).',
  },
  {
    period: 'Summer',
    title: 'Visual Inspection Intern',
    org: 'Suzhou Dexingyun',
    desc: 'Industrial vision algorithms for automated inspection.',
  },
]

export const honors = [
  { title: 'RoboCup China · National First Prize · “筑墙智匠” · team lead', year: '2024.10' },
  {
    title: 'CMCC · National First Prize · high-rise partition-wall 3D printing robot · team lead',
    year: '2024.11',
  },
  { title: 'Business Elite Challenge · National Second Prize · aitebot lab · captain', year: '2025.10' },
  { title: 'ICAN · National Third Prize · “筑墙智匠” · captain', year: '2025.11' },
  { title: 'Wuhan Municipal College Startup Grant', year: '2025.11' },
  { title: 'NVIDIA Inception Program · invited company entity', year: '2026.4' },
]

export const misc = {
  hobbies: ['Travel', 'Swimming', 'Web dev (when a robot needs a UI)'],
}
