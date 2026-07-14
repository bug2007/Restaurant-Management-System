import { useQuery } from "@tanstack/react-query"
import { getEmployees } from "../util/http.js"
import useTitle from "../hooks/useTitle.js";
import EnhancedTable from "../components/Table.jsx";

export default function Employees() {
    useTitle('Employee Management')

    const { data, isPending, isError, error} = useQuery({
        queryKey: ['employees'],
        queryFn: ({signal, queryKey}) => getEmployees({signal}) 
    })

    // let content;

    // if (data) {
    //     content=(
    //         <ul>
    //             {data.data.map((employee) => (
    //                 <li>{employee.user.fullName} - {employee.user.phoneNumber}</li>
    //             ))}
    //         </ul>
    //     )
    // }

    if (isPending) {
        return <div>Loading employees data...</div>;
    }
    
    return (
        <EnhancedTable rows={data.data} />
    )
}