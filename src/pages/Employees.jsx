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

    const end = data.total % 5 === 0 ? data.total : data.total + 5
    
    let rowsPerPageOptions = []
    for (let i=5; i<=end; i+=5) {
        rowsPerPageOptions.push(i)
    }
    
    return (
        <EnhancedTable rows={data.data} rowsPerPageOptions={rowsPerPageOptions} />
    )
} 