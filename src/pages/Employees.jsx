import { useQuery } from "@tanstack/react-query"
import { getEmployees } from "../util/http.js"
import useTitle from "../hooks/useTitle.js";
import EnhancedTable from "../components/Table.jsx";
import { useState } from "react";

export default function Employees() {
    useTitle('Employee Management')
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState();
    const [sort, setSort] = useState('');

    const { data, isPending, isError, error} = useQuery({
        queryKey: ['employees', page, perPage, sort],
        queryFn: ({signal, queryKey}) => getEmployees({signal, page, perPage, sort}) 
    })

    if (isPending) return <div>Loading employees data...</div>;
    
    if (isError) return <div>{error.message}</div>;

    const end = data.total % 5 === 0 ? data.total : data.total + 5
    
    let rowsPerPageOptions = []
    for (let i=5; i<=end; i+=5) {
        rowsPerPageOptions.push(i)
    }
    
    return (
        <EnhancedTable 
            rows={data.data} 
            total={data.total}
            currentPage={data.current_page}
            rowsPerPage={data.per_page}
            rowsPerPageOptions={rowsPerPageOptions}
            onPageChange={setPage}
            onRowsPerPageChange={(value) => {
                setPerPage(value);
                setPage(1);
            }}
            sort={sort}
            onSortChange={setSort}
        />
    )
} 