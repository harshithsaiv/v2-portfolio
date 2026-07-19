import { SiPython, SiRust, SiNvidia, SiClaudecode } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

// Mirrors the "core technologies" tags on the About page, plus Claude Code
// (the tool this site was built with) as a small nod.
export const bootLogos = [
  { Icon: SiPython, label: 'Python' },
  { Icon: SiRust, label: 'Rust' },
  { Icon: SiNvidia, label: 'CUDA' },
  { Icon: FaAws, label: 'AWS' },
  { Icon: SiClaudecode, label: 'Claude Code' },
];
