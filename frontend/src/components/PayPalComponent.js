import React, { useState, useEffect, useRef } from "react";

import { FormContainer } from './FormContainer'

import { Redirect } from 'react-router-dom'
import api from '../utils/api'

export const PayPalComponent = ({ items, total, history }) => {
    const [paidFor, setPaidFor ] = useState(false)
    const [error, setError ] = useState({})
    const paypalRef = useRef()

    const orderTotal = parseFloat(total).toFixed(2)    

    useEffect(() => {
        window.paypal
            .Buttons({
                style: {
                    color:  'black',
                    shape:  'rect',
                    label:  'pay',
                    height: 40
                },
                createOrder: (data, actions) => {
                    return actions.order.create({
                        application_context: {
                            shipping_preferences: 'SET_PROVIDED_ADDRESS', 
                        },
                        purchase_units: [
                            {
                                description: "Free Heirloom Checkout",
                                amount:{
                                    currency_code: 'USD',
                                    value: orderTotal,
                                },
                                initent: 'CAPTURE',
                                shipping: {
                                    name:{
                                        full_name:'Test User'
                                    },
                                    address:{
                                        address_line_1: '123 Any st',
                                        address_line_2: '',
                                        admin_area_2: 'Any Town',
                                        admin_area_1: 'NC',
                                        postal_code: '28572',
                                        country_code: 'US'
                                    },
                                    options:[
                                        {
                                            id: "SHIPPING_1",
                                            label: "Free Shipping",
                                            type: "SHIPPING",
                                            selected: true,
                                            amount: {
                                                value: 0.00,
                                                currency_code: "USD"
                                            }
                                        },
                                        {
                                            id: "PICKUP_2",
                                            label: "Free Pickup",
                                            type: "PICKUP",
                                            selected: false,
                                            amount: {
                                                value: 0.00,
                                                currency_code: "USD"
                                            }
                                        }
                                    ],
                                },
                            }
                        ],

                        
                        
                    })
                },

                onShippingChange: function(data, actions) {
                    console.log("SELECTED_OPTION", data.selected_shipping_option); // data.selected_shipping_option contains the selected shipping option
                },

                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    const finishedOrder = order.purchase_units[0]

                const myOrder = await api.createOrder(
                        "paypal",
                        finishedOrder.payments.captures[0].id,
                        total,
                        finishedOrder.payments.captures[0].final_capture,
                        finishedOrder.payments.captures[0].create_time,
                    )

                    await api.addOrder({ 
                            item: items,
                            order: myOrder
                        })

                    setPaidFor(true)

                },

                onCancel: function (data, actions) {
                    history.push('/cart')
                },

                onError: err => {
                    setError(err)
                    console.log(err)
                }

            }).render(paypalRef.current)
    }, [total])
    
    return (
        <div className="mt-2">
            {
                paidFor ? 
                    <Redirect
                        to="/confirmation"
                    />
                :
                    <FormContainer>
                        <div 
                            ref={paypalRef}
                        />
                    </FormContainer>
            }
        </div>
    )
}
