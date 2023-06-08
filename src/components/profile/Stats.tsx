import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import axios from "axios";
import { useSession } from "next-auth/react";
type Stat = {
    title: string;
    text: string;
    count: number | string;
    name: string;
};

function Stats() {
    const { data: session } = useSession();
    const [stats, setStats] = useState<Stat[]>([
        {
            title: "Total spent",
            text: "The total amount of money you have spent on our products throughout your purchases.",
            count: 0,
            name: "USD",
        },
        {
            title: "Orders placed",
            text: "The total number of successful orders you have placed on our platform.",
            count: 0,
            name: "Orders",
        },
        {
            title: "Reviews left",
            text: "The total number of reviews you have left on our products, including the ones with no comment.",
            count: 0,
            name: "Reviews",
        },
    ]);

    useEffect(() => {
        const getStats = async () => {
            const res = await axios.get(
                `/api/users/${session?.user?.email}/stats`
            );
            if (res.status === 200) {
                const userStats: user["stats"] = res.data;
                stats[0].count = userStats.totalSpent.toFixed(2);
                stats[1].count = userStats.ordersPlaced;
                stats[2].count = userStats.reviewsLeft;
                setStats([...stats]);
            }
        };
        if (session?.user?.email) {
            getStats();
        }
    }, [session]);

    return (
        <ul className="flex justify-between my-6 max-2xl:flex-col max-2xl:gap-4 max-2xl:w-fit">
            {stats.map((stat) => (
                <StatCard stat={stat} />
            ))}
        </ul>
    );
}

export default Stats;
