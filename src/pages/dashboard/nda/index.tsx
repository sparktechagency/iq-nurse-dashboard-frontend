import { Typography } from 'antd';

export default function NDA() {
    const { Title } = Typography;

    return (
        <div >
            <div className='mb-4'>
                <Title level={3} className="!m-0 text-gray-800 inline-block font-bold border-b-2 border-gray-500 pb-2">
                <span className=" font-bold">Commission-Based Partnership</span> <span className="text-orange-500 font-bold">Agreement</span>
                </Title>
            </div>

            <p className="text-sm text-gray-700 mt-2 mb-6">
                This Agreement is made and entered into on this <span className="font-semibold">23rd day of August , 2025</span>, by and between:<br />
                <span className="font-bold">Betopiq Limited</span> and <span className="font-bold">[Partner Name/Company Name]</span>
            </p>

            <section className="mb-6">
                <h2 className="font-bold text-base text-gray-900 mb-1">Purpose</h2>
                <p className="text-sm text-gray-700">
                    The purpose of this Agreement is to establish a commission-based sales partnership in Germany, where Betopiq fully finances and manages operations, and the Partner focuses exclusively on sales and client acquisition.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="font-bold text-base text-gray-900 mb-1">Financial Structure</h2>
                <div className="mb-2">
                    <span className="font-bold">Investment:</span>
                    <ul className="list-disc ml-6 text-sm text-gray-700 mt-1">
                        <li>Betopiq shall bear 100% of all costs related to the operations part.</li>
                        <li>The Partner shall have no financial obligation or cost contribution.</li>
                    </ul>
                </div>
                <div className="mb-2">
                    <span className="font-bold">Commission:</span>
                    <ul className="list-disc ml-6 text-sm text-gray-700 mt-1">
                        <li>The Partner shall earn 40% commission gross of the dealing amount.</li>
                        <li>No ownership will be offered from Betopiq Group.</li>
                    </ul>
                </div>
                <div>
                    <span className="font-bold">Payment Terms:</span>
                    <ul className="list-disc ml-6 text-sm text-gray-700 mt-1">
                        <li>You will receive the payment from the client and send us the 60% amount within 5-7 days.</li>
                    </ul>
                </div>
            </section>

            <section className="mb-6">
                <h2 className="font-bold text-base text-gray-900 mb-1">Roles &amp; Responsibilities</h2>
                <div className="mb-2">
                    <span className="font-bold">1. The Partner shall:</span>
                    <ul className="list-disc ml-6 text-sm text-gray-700 mt-1">
                        <li>Identify high-potential prospects in [Country].</li>
                        <li>Connect with prospects, arrange &amp; secure contracts.</li>
                        <li>Act as the main relationship contact for clients in [Country].</li>
                    </ul>
                </div>
                <div className="mb-2">
                    <span className="font-bold">2. Betopiq shall:</span>
                    <ul className="list-disc ml-6 text-sm text-gray-700 mt-1">
                        <li>Provide service delivery, technical implementation, and operational support.</li>
                        <li>Ensure timely and high-quality project delivery.</li>
                        <li>Handle financial and administrative control.</li>
                    </ul>
                </div>
                <div>
                    <span className="font-bold">3. Joint Responsibilities:</span>
                    <ul className="list-disc ml-6 text-sm text-gray-700 mt-1">
                        <li>Collaborate on a shared market planning effort.</li>
                        <li>Hold quarterly business reviews to evaluate performance and strategy.</li>
                    </ul>
                </div>
            </section>

            <section>
                <h2 className="font-bold text-base text-gray-900 mb-1">Advantages</h2>
                <ul className="list-disc ml-6 text-sm text-gray-700 mt-1">
                    <li>The Partner carries no financial risk.</li>
                    <li>The Partner has high earning potential through commissions.</li>
                </ul>
            </section>
        </div>
    )
}
