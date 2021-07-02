import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom"

import { Form, Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import { FormContainer } from './FormContainer'

// const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

export const PayPalComponent = ({ total }) => {
    const [paidFor, setPadFor ] = useState(false)
    const [error, setError ] = useState()
    const paypalRef = useRef()

    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        initent: 'CAPTURE',
                        purchase_units: [
                            {
                                description: "Free Heirloom Checkout",
                                amount:{
                                    currency_code: 'USD',
                                    value: 10.00,
                                }
                            }
                        ]
                    })
                },

                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log(order)
                },

                onError: err => {
                    setError(err)
                    console.log(err)
                }

            }).render(paypalRef.current)
    }, [total])
    
    return (
        <div>
            <ListGroup>
                <div>Total: {total}</div>
                <div 
                    ref={paypalRef}
                />
            </ListGroup>
        </div>
    )
}

// return (
//         <div>
//             <FormContainer>
//                 <PayPalButton
//                     createOrder={(data, actions) => createOrder(data, actions)}
//                     onApprove={(data, actions) => onApprove(data, actions)}
//                 />
//             </FormContainer>
//         </div>
//     );


//  const createOrder = (data, actions) => {
        // return actions.order.create({
        //     purchase_units: [
        //         {
        //             amount:{
        //                 value: total,
        //             }
        //         }
        //     ]
        // })
//     }
    
//     const  onApprove = (data, actions) => {
//         return actions.order.capture();
//     }
