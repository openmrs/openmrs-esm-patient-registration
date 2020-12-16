import React from 'react';
import { SidebarItem } from './sidebar-item/sidebar-item.component';
import styles from './sidebar.scss';
import { Button } from 'carbon-components-react';

interface SidebarProps {
  items: Array<any>;
  className?: string;
  existingPatient: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ items, className, existingPatient }) => {
  return (
    <div className={className ?? ''}>
      <h4 className={styles.CreateNewPatient}>{'Create New'} Patient</h4>
      <p className={styles.JumpTo}>Jump to</p>
      {items.map(item => (
        <SidebarItem title={item.title} sectionId={item.sectionId} />
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
