import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";

const AddFlashCardModal = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            title={<span className='text-xl font-medium'>Add FlashCard</span>}
            open={open}
            onCancel={() => setOpen(false)}
            footer={
                <div className='flex justify-center items-center'>
                    <Button type='primary' htmlType='submit' style={{ height: 40, width: 180 }} form='planForm' className='!bg-primary'>
                        Submit
                    </Button>
                </div>
            }
            width={560}
            centered
            destroyOnClose
        >
            <Form
                id='planForm'
                form={form}
                layout='vertical'
                initialValues={{
                    price: 0,
                    features: [{}]
                }} >
                <Form.Item
                    label='Title'
                    name='title'
                    rules={[{ required: true, message: 'Enter title' }]}
                >
                    <Input placeholder='Enter' style={{ height: 42 }} />
                </Form.Item>

                <Form.Item
                    label='Description'
                    name='description'
                    rules={[{ required: true, message: 'Enter Description' }]}
                >
                    <TextArea placeholder='Enter Description' rows={4} />
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default AddFlashCardModal;