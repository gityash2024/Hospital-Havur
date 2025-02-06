import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

interface TabObject {
  eventKey: string;
  title: string;
  component: React.ComponentType<any>;
}

interface AdminTabsProps {
  tabs: TabObject[];
}

const AdminTabs: React.FC<AdminTabsProps> = ({ tabs }) => {
  return (
    <>
      <Tabs
        defaultActiveKey={tabs[0].eventKey}
        id="justify-tab-example"
        className="my-4 admin_tabs  flex-nowrap text-nowrap"
        justify
      >
        {tabs.map((tab) => (
          <Tab key={tab.eventKey} eventKey={tab.eventKey} title={tab.title}>
            <tab.component />
          </Tab>
        ))}
      </Tabs>
    </>
  );
};

export default AdminTabs;
