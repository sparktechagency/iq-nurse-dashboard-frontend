import { Button } from 'antd';
import { ReactNode } from 'react';
type TButton = {
    children: React.ReactNode;
    icon?: ReactNode;
    onClick?: () => void;
    width?: any;
    classname?: string;
};
const PrimaryButton = ({ onClick, icon, children, width, classname }: TButton) => {
    return (
        <Button
            onClick={onClick}
            type="primary"
            className={`!shadow-none ${classname} `}
            style={{
                width: width ? width : 'auto',
                height: '40px',
            }}
            htmlType={'submit'}
            icon={icon ? icon : ''}
        >
            {children}
        </Button>
    );
};

export default PrimaryButton;
