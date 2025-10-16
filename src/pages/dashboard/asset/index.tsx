import {  Palette } from 'lucide-react';
import { AiOutlineGlobal } from 'react-icons/ai';
import { MdWebAsset } from 'react-icons/md';
import { VscSearchFuzzy } from 'react-icons/vsc';

export default function Asset() {
    return (
        <div className="max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="mb-4 border-b-[1.5px] border-primary pb-1">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Your <span className="text-orange-500 font-bold">Assets</span>
                </h1>
                <p className="text-gray-600">Manage all your provided digital assets here</p>
            </div>

            {/* Assets Grid */}
            <div className="flex flex-col lg:flex-row gap-8 w-full">
                {/* Left: Custom Website */}
                <div className="w-full lg:w-1/3 bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                        <AiOutlineGlobal  className="w-10 h-10 text-primary bg-primary/10 rounded-full p-2 shadow-sm" />

                        <div className="flex items-center mb-4 mt-2">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">
                                    Custom <span className="text-primary font-semibold">Website</span>
                                </h3>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-6">
                            Get your personalized partner website with company details
                        </p>
                        <div className="mb-4">
                            <span className="text-sm text-gray-600 mr-2">Status :</span>
                            <span className="bg-yellow-100 text-primary px-8 py-2 rounded-md text-sm font-medium">
                                Pending
                            </span>
                        </div>
                    </div>
                    <button className="w-full my-6 bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-lg font-medium mt-2 transition-colors">
                        Setup Website
                    </button>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm  text-gray-600 mb-2">
                                Create Custom Domain
                            </label>
                            <input
                                type="text"
                                placeholder="Type your custom domain name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-sm"
                            />
                        </div>
                        <button className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                            Download Kit
                        </button>
                        <button className="w-full bg-white border border-primary/30 hover:bg-primary/50 text-primary py-3 px-4 rounded-lg font-medium transition-colors">
                            Manage Domain
                        </button>
                    </div>

                </div>

                {/* Right: Other Assets */}
                <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {/* Custom Domain */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between">
                        <div>
                            <MdWebAsset  className="w-10 h-10 text-primary bg-primary/10 rounded-full p-2 shadow-sm" />

                            <div className="flex items-center mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Custom <span className="text-primary">Domain</span>
                                    </h3>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-6">
                                Your domain is set up with Betopia partner program
                            </p>
                            <div className="mb-4">
                                <span className="text-sm text-gray-600 mr-2">Status :</span>
                                <span className="bg-yellow-100 text-primary px-8 py-2 rounded-md text-sm font-medium">
                                    Pending
                                </span>
                            </div>
                        </div>
                        <div>
                                    <button className="w-full bg-primary hover:bg-primary/90 mt-8 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                                Setup Website
                            </button>

                        </div>
                    </div>



                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between">
                        <div>
                            <VscSearchFuzzy className="w-10 h-10 text-primary bg-primary/10 rounded-full p-2 shadow-sm" />

                            <div className="flex items-center mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Search Engine <span className="text-primary">Optimization</span>
                                    </h3>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-6">
                                Boost search visibility with our SEO optimization package

                            </p>
                            <div className="mb-4">
                                <span className="text-sm text-gray-600 mr-2">Status :</span>
                                <span className="bg-blue-500/10 text-blue-500 px-8 py-2 rounded-md text-sm font-medium">
                                    In Progress
                                </span>
                            </div>
                        </div>
                        <div>
                            <button className="w-full bg-primary hover:bg-primary/90 mt-8 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                                View Progress
                            </button>

                        </div>
                    </div>

                    {/* Branding (spans both columns on large screens) */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 md:col-span-2 mt-2">
                        <Palette className="w-10 h-10 text-primary bg-primary/10 rounded-full p-2 shadow-sm" />

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">

                            <div className="flex items-center">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">Branding</h3>
                                    <p className="text-gray-600 text-sm mt-1">
                                        Access your logo, brand guide & marketing assets
                                    </p>
                                </div>
                            </div>
                            <div className="text-right mt-4 md:mt-0">
                                <div className="mb-4 md:mb-0">
                                    <span className="text-sm text-gray-600 mr-2">Status :</span>
                                    <span className="bg-green-500/10 text-green-500 px-8 py-2 rounded-md text-sm font-medium">
                                        Active
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <button className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                                Download Kit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}