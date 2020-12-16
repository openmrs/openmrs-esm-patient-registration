import React from 'react';
import { Link } from 'carbon-components-react';
import { XAxis16 } from '@carbon/icons-react';
import styles from './sidebar-item.scss';

interface SidebarItemProps {
  title: string;
  sectionId: string;
}

const scrollInto = sectionId => {
  document.getElementById(sectionId).scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'center',
  });
};

export const SidebarItem: React.FC<SidebarItemProps> = ({ title, sectionId }) => {
  return (
    <div className={styles.TouchTarget}>
      <Link className={styles.LinkName} onClick={() => scrollInto(sectionId)}>
        <XAxis16 /> {title}
      </Link>
    </div>
  );
};
