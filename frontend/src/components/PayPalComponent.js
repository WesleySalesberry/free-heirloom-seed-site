import React, { useState, useEffect, useRef } from "react";

import { FormContainer } from './FormContainer'

export const PayPalComponent = ({ items, total }) => {
    const [paidFor, setPadFor ] = useState(false)
    const [error, setError ] = useState()
    const paypalRef = useRef()

    const orderTotal = parseFloat(total).toFixed(2)    

    useEffect(() => {
        window.paypal
            .Buttons({
                style: {
                    color:  'black',
                    shape:  'pill',
                    label:  'pay',
                    height: 40
                },
                createOrder: (data, actions) => {
                    return actions.order.create({
                        initent: 'CAPTURE',
                        purchase_units: [
                            {
                                description: "Free Heirloom Checkout",
                                amount:{
                                    currency_code: 'USD',
                                    value: orderTotal,
                                }
                            }
                        ]
                    })
                },

                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    const finishedOrder = order.purchase_units[0].payments

                },

                onError: err => {
                    setError(err)
                    console.log(err)
                }

            }).render(paypalRef.current)
    }, [total])
    
    return (
        <div className="mt-5">
            <FormContainer>
                <div 
                    ref={paypalRef}
                />
            </FormContainer>
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
