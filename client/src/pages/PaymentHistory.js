import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/UseAuth'
import axios from 'axios'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { useSortBy, useTable, usePagination } from "react-table";

function PaymentHistory() {
    const {user,accessToken, setLoading} = useAuth()
    const [records, setRecords] = useState([])
    let navigate = useNavigate();
    useEffect(() => {
        getRecords()
    }, [])
    const getRecords = async() => {
        setLoading(true)
        try{
            if(accessToken && user){
                const tmp = user.role === 1 ? 'all':'user'
                const res = await axios.get(`${process.env.REACT_APP_API}/payment/${tmp}`,
                { 
                    // withCredentials: true,
                    headers: {
                    Authorization: accessToken
                    }
                })
                // console.log("PaymentRecords: ",res.data.result)
                setRecords(res.data.result)
            }
        }catch(err){
            console.log("Err: ",err)
            let errMsg = err?.response?.data?.msg
          if(errMsg){
            alert(errMsg)
          }
        }
        setLoading(false)
    }
    const data = React.useMemo(() => [...records], [records]);
    const columns = React.useMemo(
        () => [
          {
            Header: "Transaction Id",
            accessor: "TransactionId"
          },
          {
            Header: "Name/UserId",
            accessor: "name",
            Cell: props => {
                const { value, cell, row } = props;
                return (
                    <div className='flex flex-col'>

                        <h1 className={``}>{value} </h1>
                        <p className='text-xs'>{row.original.userId}</p>
                    </div>
                );
              }
          },
          {
            Header: "Batch",
            accessor: "batch"
          },
          {
            Header: "Date",
            accessor: "date",
            Cell: props => {
                const { value, cell, row } = props;
                return (
                    <h1 className={``}>{ moment(value).format('MMMM Do YYYY, h:mm:ss a')} </h1>
                );
              }
          },
          {
            Header: "Status",
            accessor: "status",
            Cell: props => {
                const { value, cell, row } = props;
                return (
                    <h1 className={`${value ==='success'? 'text-green-600' : 'text-red-600'}`}>{value} </h1>
                );
              }
          },
          
        ],
        []
      );
      const tablehook = hooks => {
        hooks.visibleColumns.push(cols => [
          ...cols,
        ]);
      };
      const tableInstance = useTable({ columns, data }, tablehook, useSortBy, usePagination);
      const { getTableProps, getTableBodyProps, headerGroups, page, nextPage, previousPage, 
          canNextPage, canPreviousPage, pageOptions, state, prepareRow, setPageSize } = tableInstance;
    
      const { pageIndex, pageSize } = state;
    
      const isEven = idx => {
        return !(idx & 1);
      };
  return (
    <div className='p-5 w-full'>
        <h1 className=' text-center text-3xl p-2 text-secondary font-semibold'>
            {user?.role === 1? "All Users Payment History" : "Payment History"}
            <br/>
            <button className='text-sm trans-gpk bg-secondary text-white p-2 font-normal rounded' onClick={()=> navigate("/")}>
                Back
            </button>
        </h1>
        <div className="p-5 w-full">
              <div className="w-full ">
                <div className="p-2 text-start">
                    Show {"  "}
                    <select value={pageSize} className="border p-1"
                      onChange={(e) => setPageSize(Number(e.target.value))} >
                        {[5,10, 25, 50, 100].map((pageSize) => (
                          <option key={pageSize} value={pageSize}>
                            {pageSize}
                          </option>
                        ))}
                      </select>
                  </div>
                {/* table Start */}
                <div className="overflow-x-auto">
                  <table {...getTableProps()} className="shadow  rounded-lg w-full">
                    <thead>
                      {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((column, idx) => (
                            <th {...column.getHeaderProps(column.getHeaderProps(column.getSortByToggleProps()))} className={`bg-primary p-2 text-base text-white ${idx === 0 ? "rounded-tl": ""} ${idx === 4 ? "rounded-tr": ""}`}>
                              {column.render("Header")}
                              {column.isSorted ? (column.isSortedDesc ? "???" : "???") : ""}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                      {page.map((row, ridx) => {
                        prepareRow(row);
                        return (
                          <tr {...row.getRowProps()} className={`mb-2 border-b-2 border-neutral-100 font-md text-base ${ridx === (page.length - 1) ? "border-b-primary rounded-b": ""}`}>
                            {row.cells.map((cell, idx) => {
                              return (
                                <td {...cell.getCellProps()} className={isEven(idx) ? "text-neutral-600 p-3 bg-neutral-50 text-center" : "text-center text-neutral-600 p-3 "}>
                                  {cell.render("Cell")}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center justify-end p-3">
                  <span className="p-1">
                    Page{" "}
                    <strong>
                      {pageIndex + 1} of {pageOptions.length}
                    </strong>{" "}
                  </span>
                  <button onClick={() => previousPage()} disabled={!canPreviousPage} className="bg-neutral-100 p-2 m-1 disabled:opacity-50">
                    Previous
                  </button>
                  <button onClick={() => nextPage()} disabled={!canNextPage} className="bg-neutral-100 p-2 m-1 disabled:opacity-50">
                    Next
                  </button>
                </div>
                {/* table end  */}
                </div>
              </div>
    </div>
  )
}

export default PaymentHistory