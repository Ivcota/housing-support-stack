import { Survey, SurveyPaginated } from "@/fooTypes";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { Link } from "@inertiajs/react";

export const SurveyList = ({ surveys }: { surveys: SurveyPaginated }) => {
    const survey = createColumnHelper<Survey>();

    const columns = [
        survey.accessor("id", {
            cell: (info) => info.getValue(),
        }),
        survey.accessor("address", {
            cell: (info) => info.getValue(),
        }),
        survey.accessor("status", {
            cell: (info) => info.getValue(),
        }),
        survey.accessor("id", {
            header: () => "details",
            cell: (info) => (
                <Link
                    href={`/survey/${info.getValue()}`}
                    className="link link-primary"
                >
                    View Details
                </Link>
            ),
        }),
    ];

    const table = useReactTable({
        columns,
        data: surveys.data,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <section className="flex gap-4 pt-10 flex-wrap">
            <table className="table">
                <thead>
                    {table.getHeaderGroups().map((headerGroup, i) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header, j) => (
                                <th key={j}>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell, j) => (
                                <td key={j}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};
// <section className="flex gap-4 pt-10 flex-wrap">
//     {surveys.data.map((survey) => (
//         <div
//             key={survey.id}
//             className="card w-60 bg-base-100 mx-auto shadow-xl"
//         >
//             <div className="card-body">
//                 <h2 className="card-title">{survey.address}</h2>
//                 <p>{survey.status}</p>
//                 <div className="card-actions justify-start">
//                     <Link
//                         href={`/survey/${survey.id}`}
//                         className="link link-primary"
//                     >
//                         View Details
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     ))}
// </section>
