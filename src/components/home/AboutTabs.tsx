import { useState } from 'react';

interface TabItem {
  id: string;
  label: string;
  text: string;
}

interface Props {
  items: TabItem[];
}

export default function AboutTabs({ items }: Props) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');
  const activeItem = items.find((item) => item.id === activeId) ?? items[0];

  return (
    <div className="about-tab-4">
      <div className="filter-menu-active">
        {items.map((item) => (
          <button
            key={item.id}
            className={item.id === activeItem.id ? 'active' : undefined}
            type="button"
            onClick={() => setActiveId(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="filter-active-cat1">
        <div className="filter-item">
          <p className="about-tab-text">{activeItem.text}</p>
        </div>
      </div>
    </div>
  );
}
