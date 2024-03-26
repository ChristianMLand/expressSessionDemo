import { useState, cloneElement } from 'react';
import styles from './Tabs.module.css';

export default function TabContainer({ children: tabs }) {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.tabContainer}>
      <ul>
        {tabs.map((tab, i) => (
          <li key={i}>
            <button
              type="button"
              className={i === active ? styles.activeTab : ""}
              onClick={() => setActive(i)}
            >{tab.props.title}</button>
          </li>
        ))}
      </ul>
      {cloneElement(tabs[active], { key: active })}
    </div>
  );
}