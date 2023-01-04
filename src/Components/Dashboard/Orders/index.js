import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Index from '../Title';
import {useEffect, useState} from "react";
import { API, Auth } from 'aws-amplify';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
}


function preventDefault(event) {
    event.preventDefault();
}

export default function Orders() {
    const [rows, setRows] = useState([]);
    const fetchData = async () => {
        const apiName = 'TODOApi';
        const path = 'todos';
        const options = {
            headers: {
                Authorization: `Bearer ${(await Auth.currentSession())
                    .getIdToken()
                    .getJwtToken()}`,
                "Content-Type": "application/json"
            },
            response: true,
        };

        return API.get(apiName, path, options);
    }

    useEffect(() => {
        fetchData().then(r => setRows(r.data));
    }, []);

    return (
        <React.Fragment>
            <Index>Recent Orders</Index>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>name</TableCell>
                        <TableCell>description</TableCell>
                        <TableCell>deadline</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.deadline}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more orders
            </Link>
        </React.Fragment>
    );
}
