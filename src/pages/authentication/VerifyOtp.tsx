import { Button, ConfigProvider, Form, FormProps, Input } from 'antd';
import { FieldNamesType } from 'antd/es/cascader';
import { useNavigate } from 'react-router-dom';
import { getFromLocalStorage } from '../../utils/local-storage';
import { useForgetPasswordMutation, useOtpVerifyMutation } from '../../redux/apiSlices/authSlice';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
export type errorType = {
    data: {
        errorMessages: { message: string }[];
        message: string;
    };
};
const VerifyOtp = () => {
    const navigate = useNavigate();
    const email = getFromLocalStorage('forgetEmail');
    const [forgetPassword,{isLoading}]=useForgetPasswordMutation()
    const [otpVerfiy,{isSuccess,isError,data,error}] = useOtpVerifyMutation();

    useEffect(() => {
        if(isSuccess){
            Swal.fire({
                title: "Success",
                text: data?.message,
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            })
            localStorage.removeItem('forgetEmail')
            localStorage.setItem('resetToken',data?.data)
            navigate('/new-password')
        }

        if(isError){
            const errorMessage =
                            (error as errorType)?.data?.errorMessages
                                ? (error as errorType)?.data?.errorMessages.map((msg: { message: string }) => msg?.message).join("\n")
                                : (error as errorType)?.data?.message || "Something went wrong. Please try again.";
            Swal.fire({
                title: "Failed to Login",
                text: errorMessage,
                icon: "error",
                timer: 1500,
                showConfirmButton: false
            })
        }
    },[isSuccess,isError,data]);
    const onFinish: FormProps<FieldNamesType>['onFinish'] = (values:any) => {
        
        otpVerfiy({email:email,oneTimeCode:Number(values.otp)});
        
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Input: {
                        // lineHeight: 3,
                        controlHeight: 50,

                        borderRadius: 10,
                    },
                },
                token: {
                    colorPrimary: '#083A65',
                },
            }}
        >
            <div className="flex  items-center justify-center h-screen" style={{
            backgroundImage: `url('/authBg.svg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            backgroundRepeat: 'no-repeat',
            objectFit: 'cover',
        }}>
                <div className="bg-white w-[630px] rounded-lg shadow-lg p-10 ">
                    <div className="text-primaryText space-y-3 text-center">
                        <h1 className="text-3xl  font-medium text-center mt-2">Check your email</h1>
                        <p>
                            We sent a reset link to {email} enter 5 digit code that mentioned in the email
                        </p>
                    </div>

                    <Form
                        name="normal_VerifyOtp"
                        className="my-5"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            className="flex items-center justify-center mx-auto"
                            name="otp"
                            rules={[{ required: true, message: 'Please input otp code here!' }]}
                        >
                            <Input.OTP
                                style={{
                                    width: 300,
                                }}
                                className=""
                                variant="filled"
                                length={5}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                shape="round"
                                type="primary"
                                htmlType="submit"
                                style={{
                                    height: 45,
                                    width: '100%',
                                    fontWeight: 500,
                                }}
                                // onClick={() => navigate('/')}
                            >
                                Verify OTP Code
                            </Button>
                        </Form.Item>
                        <div className="text-center text-lg flex items-center justify-center gap-2">
                            <p className="text-primaryText">Didn't receive the code?</p>
                            <p className="text-primary cursor-pointer active:text-red-400" onClick={async()=> await forgetPassword({email})}>{isLoading?'Sending...':'Resend'}</p>
                        </div>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default VerifyOtp;
