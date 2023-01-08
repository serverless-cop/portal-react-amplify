import React, {useCallback, useEffect, useMemo, useState} from 'react';
import MaterialReactTable from 'material-react-table';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import {Storage, API, Auth} from "aws-amplify";
import {CreateNewReminderModal} from './CreateModal'

const ReminderTable = () => {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});
    const apiName = 'TODOApi';
    const path = 'todos';

    const fetchData = async () => {
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
        fetchData().then(r => setTableData(r.data));
    }, []);

    const handleCreateNewRow = async (values) => {
        try {
            await Storage.put(values.file.name, values.file, {
                contentType: "image/png", // contentType is optional
            });
        } catch (error) {
            console.log("Error uploading file: ", error);
        }
        const options = {
            body: {
                name: values.name,
                description: values.description,
                deadline: values.deadline,
            },
            headers: {
                Authorization: `Bearer ${(await Auth.currentSession())
                    .getIdToken()
                    .getJwtToken()}`,
                "Content-Type": "application/json"
            },
        }
        const response = await API.post(apiName, path, options)
        if(response.id){
            values.id = response.id
            tableData.push(values)
            setTableData([...tableData])
        }

    };

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
            const options = {
                body: {
                    id: values.id,
                    name: values.name,
                    description: values.description,
                    deadline: values.deadline,
                },
                headers: {
                    Authorization: `Bearer ${(await Auth.currentSession())
                        .getIdToken()
                        .getJwtToken()}`,
                    "Content-Type": "application/json"
                },
            }
            const response = await API.put(apiName, path, options)
            if(response.id) {
                tableData[row.index] = values;
                //send/receive api updates here, then refetch or update local table data for re-render
                setTableData([...tableData]);
                exitEditingMode(); //required to exit editing mode and close modal
            }
        }
    };

    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

    const handleDeleteRow = async(row) => {
        if (
            // eslint-disable-next-line no-restricted-globals
            !confirm(`Are you sure you want to delete ${row.getValue('name')}`)
        ) {
            return;
        }
        try{
            const options = {
                headers: {
                    Authorization: `Bearer ${(await Auth.currentSession())
                        .getIdToken()
                        .getJwtToken()}`,
                    "Content-Type": "application/json"
                },
            }
            let pathWithId = [path, row.getValue('id')].join('/')
            const response = await API.del(apiName, pathWithId, options)
            tableData.splice(row.index, 1);
            setTableData([...tableData]);
        } catch(err){
            console.log(JSON.stringify(err))
        }

    }

    const getCommonEditTextFieldProps = useCallback(
        (cell) => {
            return {
                error: !!validationErrors[cell.id],
                helperText: validationErrors[cell.id],
                onBlur: (event) => {
                    const isValid =
                        cell.column.id === 'email'
                            ? validateEmail(event.target.value)
                            : validateRequired(event.target.value);
                    if (!isValid) {
                        //set validation error for cell if invalid
                        setValidationErrors({
                            ...validationErrors,
                            [cell.id]: `${cell.column.columnDef.header} is required`,
                        });
                    } else {
                        //remove validation error for cell if valid
                        delete validationErrors[cell.id];
                        setValidationErrors({
                            ...validationErrors,
                        });
                    }
                },
            };
        },
        [validationErrors],
    );

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
                size: 80,
                columnVisibility: false,
            },
            {
                accessorKey: 'name',
                header: 'Reminder Name',
                size: 140,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
                columnVisibility: true,
            },
            {
                accessorKey: 'description',
                header: 'Description',
                size: 140,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
                columnVisibility: true,
            },
            {
                accessorKey: 'email',
                header: 'Email',
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'email',
                }),
                columnVisibility: true,
            },
            {
                accessorKey: 'deadline',
                header: 'Deadline',
                size: 80,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'date',
                }),
                columnVisibility: true,
            },
        ],
        [getCommonEditTextFieldProps],
    );

    return (
        <>
            <MaterialReactTable
                displayColumnDefOptions={{
                    'mrt-row-actions': {
                        muiTableHeadCellProps: {
                            align: 'center',
                        },
                        size: 120,
                    },
                }}
                columns={columns}
                data={tableData}
                initialState={{columnVisibility: {id: false}}}
                editingMode="modal" //default
                enableColumnOrdering
                enableEditing
                onEditingRowSave={handleSaveRowEdits}
                onEditingRowCancel={handleCancelRowEdits}
                renderRowActions={({ row, table }) => (
                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                        <Tooltip arrow placement="left" title="Edit">
                            <IconButton onClick={() => table.setEditingRow(row)}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow placement="right" title="Delete">
                            <IconButton color="error" onClick={async() => await handleDeleteRow(row)}>
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
                renderTopToolbarCustomActions={() => (
                    <Button
                        color="secondary"
                        onClick={() => setCreateModalOpen(true)}
                        variant="contained"
                    >
                        Create New Account
                    </Button>
                )}
            />
            <CreateNewReminderModal
                columns={columns}
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={handleCreateNewRow}
            />
        </>
    );
};



const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
    !!email.length &&
    email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );

export default ReminderTable;
