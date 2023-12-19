import React from 'react';
import { SvgXml } from 'react-native-svg';

interface BreadIconProps {
  size?: number;
}

const BreadIcon: React.FC<BreadIconProps> = ({ size = 20 }) => {
  return <SvgXml xml={xml(size)} />;
};

const xml = (
  size: number
) => `<svg width=${size} height=${size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M26.2199 6.24L6.23993 26.22C4.16542 28.2978 3.00024 31.1139 3.00024 34.05C3.00024 36.9861 4.16542 39.8022 6.23993 41.88C8.31771 43.9545 11.1338 45.1197 14.0699 45.1197C17.006 45.1197 19.8222 43.9545 21.8999 41.88L41.8799 21.9C43.9544 19.8222 45.1196 17.0061 45.1196 14.07C45.1196 11.1339 43.9544 8.31778 41.8799 6.24C37.5599 1.92 30.5549 1.92 26.2199 6.24Z" fill="#FBB982"/>
  <path d="M26.2199 6.24L6.23993 26.22C4.16542 28.2978 3.00024 31.1139 3.00024 34.05C3.00024 36.9861 4.16542 39.8022 6.23993 41.88C8.31771 43.9545 11.1338 45.1197 14.0699 45.1197C17.006 45.1197 19.8222 43.9545 21.8999 41.88L41.8799 21.9C43.9544 19.8222 45.1196 17.0061 45.1196 14.07C45.1196 11.1339 43.9544 8.31778 41.8799 6.24C37.5599 1.92 30.5549 1.92 26.2199 6.24Z" fill="url(#paint0_radial_163_2093)"/>
  <path d="M26.2199 6.24L6.23993 26.22C4.16542 28.2978 3.00024 31.1139 3.00024 34.05C3.00024 36.9861 4.16542 39.8022 6.23993 41.88C8.31771 43.9545 11.1338 45.1197 14.0699 45.1197C17.006 45.1197 19.8222 43.9545 21.8999 41.88L41.8799 21.9C43.9544 19.8222 45.1196 17.0061 45.1196 14.07C45.1196 11.1339 43.9544 8.31778 41.8799 6.24C37.5599 1.92 30.5549 1.92 26.2199 6.24Z" fill="url(#paint1_radial_163_2093)"/>
  <path d="M26.2199 6.24L6.23993 26.22C4.16542 28.2978 3.00024 31.1139 3.00024 34.05C3.00024 36.9861 4.16542 39.8022 6.23993 41.88C8.31771 43.9545 11.1338 45.1197 14.0699 45.1197C17.006 45.1197 19.8222 43.9545 21.8999 41.88L41.8799 21.9C43.9544 19.8222 45.1196 17.0061 45.1196 14.07C45.1196 11.1339 43.9544 8.31778 41.8799 6.24C37.5599 1.92 30.5549 1.92 26.2199 6.24Z" fill="url(#paint2_radial_163_2093)"/>
  <path d="M24.4214 24.891C23.3864 25.926 21.5414 26.16 20.5064 25.125L15.5624 20.343C15.5624 20.343 13.8974 19.032 16.1024 16.875C18.3044 14.7195 19.6409 16.1715 19.6409 16.1715L24.6089 20.9535C25.6289 21.9885 25.4414 23.856 24.4214 24.891Z" fill="#E6B995"/>
  <path d="M24.4214 24.891C23.3864 25.926 21.5414 26.16 20.5064 25.125L15.5624 20.343C15.5624 20.343 13.8974 19.032 16.1024 16.875C18.3044 14.7195 19.6409 16.1715 19.6409 16.1715L24.6089 20.9535C25.6289 21.9885 25.4414 23.856 24.4214 24.891Z" fill="url(#paint3_radial_163_2093)"/>
  <path d="M16.7579 32.484C15.7229 33.519 13.8779 33.753 12.8429 32.718L7.89888 27.9375C7.89888 27.9375 6.23388 26.625 8.43738 24.468C10.6409 22.3125 11.9774 23.766 11.9774 23.766L16.9454 28.5465C17.9654 29.5815 17.7779 31.449 16.7579 32.484Z" fill="#E8BB95"/>
  <path d="M16.7579 32.484C15.7229 33.519 13.8779 33.753 12.8429 32.718L7.89888 27.9375C7.89888 27.9375 6.23388 26.625 8.43738 24.468C10.6409 22.3125 11.9774 23.766 11.9774 23.766L16.9454 28.5465C17.9654 29.5815 17.7779 31.449 16.7579 32.484Z" fill="#E6B995"/>
  <path d="M16.7579 32.484C15.7229 33.519 13.8779 33.753 12.8429 32.718L7.89888 27.9375C7.89888 27.9375 6.23388 26.625 8.43738 24.468C10.6409 22.3125 11.9774 23.766 11.9774 23.766L16.9454 28.5465C17.9654 29.5815 17.7779 31.449 16.7579 32.484Z" fill="url(#paint4_radial_163_2093)"/>
  <path d="M32.1345 17.2964C31.0995 18.3314 29.2545 18.5654 28.2195 17.5304L23.277 12.7499C23.277 12.7499 21.612 11.4374 23.817 9.28194C26.019 7.12494 27.3555 8.57694 27.3555 8.57694L32.3235 13.3589C33.3435 14.3939 33.156 16.2614 32.136 17.2964H32.1345Z" fill="#E6B995"/>
  <path d="M32.1345 17.2964C31.0995 18.3314 29.2545 18.5654 28.2195 17.5304L23.277 12.7499C23.277 12.7499 21.612 11.4374 23.817 9.28194C26.019 7.12494 27.3555 8.57694 27.3555 8.57694L32.3235 13.3589C33.3435 14.3939 33.156 16.2614 32.136 17.2964H32.1345Z" fill="url(#paint5_radial_163_2093)"/>
  <defs>
    <radialGradient id="paint0_radial_163_2093" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(18.1886 16.4062) rotate(137.278) scale(50.0232 31.529)">
      <stop offset="0.029" stop-color="#FECD90"/>
      <stop offset="0.446" stop-color="#F3A974"/>
      <stop offset="0.565" stop-color="#E38E5B"/>
      <stop offset="0.759" stop-color="#AD5B5A"/>
    </radialGradient>
    <radialGradient id="paint1_radial_163_2093" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(33.3747 7.87492) rotate(95.343) scale(13.0881 13.0881)">
      <stop stop-color="#FECD89"/>
      <stop offset="1" stop-color="#FFCD8A" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="paint2_radial_163_2093" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(24.0603 26.6242) rotate(133.421) scale(65.8284 18.5154)">
      <stop offset="0.586" stop-color="#BBA37D" stop-opacity="0"/>
      <stop offset="0.769" stop-color="#BCA47C"/>
    </radialGradient>
    <radialGradient id="paint3_radial_163_2093" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(20.6001 25.031) rotate(46.905) scale(11.4263 6.89187)">
      <stop stop-color="#FFFEC3"/>
      <stop offset="0.7" stop-color="#F6CBA7"/>
      <stop offset="0.91" stop-color="#D6AA85"/>
    </radialGradient>
    <radialGradient id="paint4_radial_163_2093" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12.9359 32.625) rotate(41.0035) scale(11.4314 6.89491)">
      <stop stop-color="#FFFEC3"/>
      <stop offset="0.7" stop-color="#F6CBA7"/>
      <stop offset="0.91" stop-color="#D6AA85"/>
    </radialGradient>
    <radialGradient id="paint5_radial_163_2093" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(28.3125 17.4374) rotate(41.5222) scale(12.0209 7.25046)">
      <stop stop-color="#FFFEC3"/>
      <stop offset="0.7" stop-color="#F6CBA7"/>
      <stop offset="0.91" stop-color="#D6AA85"/>
    </radialGradient>
  </defs>
</svg>
  `;

export default BreadIcon;
