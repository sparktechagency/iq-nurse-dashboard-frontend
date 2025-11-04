import { Button } from 'antd';
import { ReactNode } from 'react';
type TButton = {
    children: React.ReactNode;
    icon?: ReactNode;
    onClick?: () => void;
    width?: any;
};
const PrimaryButton = ({ onClick, icon, children, width }: TButton) => {
    return (
        <Button
            onClick={onClick}
            style={{
                backgroundColor: '#003877',
                color: '#fff',
                width: width ? width : 'auto',

                height: '40px',
                borderRadius: 8,
            }}
            htmlType={'submit'}
            icon={icon ? icon : ''}
        >
            {children}
        </Button>
    );
};

export default PrimaryButton;
