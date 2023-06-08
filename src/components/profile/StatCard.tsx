type Stat = {
    title: string;
    text: string;
    count: number | string;
    name: string;
};

interface props {
    stat: Stat;
}

function StatCard({ stat }: props) {
    return (
        <li className="font-mulish text-lg font-medium 2xl:w-[32%]">
            <div className="flex flex-col bg-white border shadow-sm rounded-lg">
                <div className="p-4 md:p-7">
                    <h3 className="text-xl font-bold text-zinc-900">
                        {stat.title}
                    </h3>
                    <p className="mt-2 text-gray-700">{stat.text}</p>
                    <span className="mt-3 inline-flex items-center gap-2 text-2xl font-medium text-blue-600">
                        {`${stat.count} ${stat.name}`}
                    </span>
                </div>
            </div>
        </li>
    );
}

export default StatCard;
