import React from 'react';

interface WidgetProps {
    href: string;
    icon: JSX.Element;
    title: string;
    count: string;
    subtitle: string;
}

const Widget: React.FC<WidgetProps> = ({ href, icon, title, count, subtitle, }) => (
    <div>
        <a href={href} className="text-decoration-none super-admin-dashboard cardss">
            <div className="bg-white shadow-md rounded-10 p-xxl-8 py-8 d-flex align-items-center justify-content-between my-sm-3 my-2 cards_body">
                <div className=" widget-icon rounded-10 me-3 d-flex align-items-center justify-content-center">
                    {icon}
                </div>
                <div className="text-end">
                    <h3 className="count fw-bolder" style={{ color: "#62B162" }}>{count}</h3>
                    <p className="mb-0  text-dark" style={{color:"#6C757D"}}>{subtitle}</p>
                </div>
            </div>
        </a>
    </div>
);

export default Widget