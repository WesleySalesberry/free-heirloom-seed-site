import React from 'react'
import { Link } from 'react-router-dom';

export const TableRowComponent = ({ seedItem, orderItem }) => {
    return (
        <tr key={seedItem.id}>
            <td>
                { seedItem.seedID }
            </td>
            <td>
                <Link to={`/seed/${seedItem.slug}`}>
                    <strong>{ seedItem.name }</strong> 
                </Link>
            </td>
            <td>
                { seedItem.price }
            </td>
            <td>{ orderItem.order_created }</td>
            <td>{ orderItem.confirmation}</td>
        </tr>
    )
}
