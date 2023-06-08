import axios from "axios";
const updateStat = async (
    userEmail: string,
    stat: "totalSpent" | "reviewsLeft" | "ordersPlaced",
    total?: number
) => {
    const URL = `/api/users/${userEmail}/stats`;
    const reqBody =
        stat === "totalSpent"
            ? { statToUpdate: "totalSpent", total }
            : { statToUpdate: stat };
    await axios.patch(URL, reqBody);
};
export default updateStat;
