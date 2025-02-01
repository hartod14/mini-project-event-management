import Image from "next/image";

export default function Test() {
    return (
        <>
            <div className="p-20">
                <div className="flex gap-12 border-b-2 border-gray-200 py-10">
                    <div className="w-[520px] h-[260px] rounded-3xl">
                        <Image
                            src={'/ticket1.jpg'}
                            width={1000}
                            height={800}
                            alt="ticket"
                            className="object-cover w-full h-full rounded-3xl"
                        />
                    </div>
                    <div>
                        <div className="bg-yellow-300 px-3 py-2 rounded-lg w-fit mb-2 text-lg">
                            Menunggu Persetujuan
                        </div>
                        <h2 className="font-bold text-2xl mb-2">A Musical Drama: Symphony of Dreams </h2>
                        <div className="flex items-center gap-2 mb-1">
                            <i>
                                <svg className="w-6 h-6 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clip-rule="evenodd" />
                                </svg>

                            </i>
                            <div className="text-gray-600 text-lg">25 Januari 2024 20:00</div>
                        </div>
                        <div className="flex items-center gap-2 mb-10">
                            <svg className="w-6 h-6 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4 5a2 2 0 0 0-2 2v2.5a1 1 0 0 0 1 1 1.5 1.5 0 1 1 0 3 1 1 0 0 0-1 1V17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2.5a1 1 0 0 0-1-1 1.5 1.5 0 1 1 0-3 1 1 0 0 0 1-1V7a2 2 0 0 0-2-2H4Z" />
                            </svg>

                            <div className="text-gray-600  text-lg"><span>1 Tiket reguler </span> - <span>2 tiket VIP</span></div>
                        </div>

                        <p className="font-bold text-2xl">Rp 930.000</p>
                    </div>
                </div>
            </div>
        </>
    )
}