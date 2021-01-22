import React from 'react';
import { SidebarItem } from './sidebar-item/sidebar-item.component';
import styles from './sidebar.scss';
import { Button } from 'carbon-components-react';

interface SidebarProps {
  sections: Array<any>;
  className?: string;
  existingPatient: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ sections, className, existingPatient }) => {
  return (
    <div className={className ?? ''}>
      <h4 className={styles.CreateNewPatient}>{'Create New'} Patient</h4>
      <p className={styles.JumpTo}>Jump to</p>
      {sections.map(section => (
        <SidebarItem title={section.name} sectionId={section.id} key={section.name} />
      ))}
      <div className={styles.Rectangle}></div>
      <Button type="submit" className={styles.Button}>
        {existingPatient ? 'Save Patient' : 'Create Patient'}
      </Button>
      <br />
      <Button kind="tertiary" className={styles.Button}>
        Cancel
      </Button>
    </div>
  );
};
