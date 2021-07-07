import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Table } from 'react-bootstrap'
import { getOrders } from '../redux/orders/orderAction';

import { Loader } from '../components/Loader'

import { TableRowComponent } from '../components/TableRowComponent'

export const TableComponent = ({ name }) => {

    const dispatch = useDispatch()

    const orderList = useSelector( state => state.orderList )
    const { orders, loading } = orderList

    useEffect(() => {
        dispatch(getOrders())
    }, [dispatch])

    return (
        <>
        {
            loading ? 
                    <Loader />
                :
                    orders && orders.length !== 0 ?
                    <>
                        <h2 className="text-center">{name} Orders</h2>
                        <Table  striped bordered hover className="text-center" variant="dark">
                            <thead>
                                <tr>
                                    <th>Seed ID</th>
                                    <th>Seed Name</th>
                                    <th>Price</th>
                                    <th>Ordered On</th>
                                    <th>Confirmation Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders && orders.map(itm => (
                                        <TableRowComponent
                                            seedItem={itm.seed}
                                            orderItem={itm.order}
                                        />
                                    ))
                                }
                            </tbody>
                        </Table>
                    </>
                    :
                    <h2>No Order</h2>
        }
        </>
    )
}
