import React from 'react'
import { Form } from 'react-bootstrap'

export const FormInputComponent = ({
    label,
    name, 
    type,
    placeholder,
    onChange,
    value,
    required,
    error, 
    ...props
}) => {

    return (
        <Form.Group controlId={name}>
            <Form.Label>{label}</Form.Label>
                <Form.Control
                    required={required ? required : ""}
                    type={type ? type : "text"}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                ></Form.Control>
                {
                    name === "password" ? 
                    <Form.Text muted>
                        Your password must be 8-20 characters long, contain letters and numbers, and
                        must not contain spaces, special characters, or emoji.
                    </Form.Text>
                    :
                    ""
                }
                {
                    error && <Form.Text>
                        {error}
                    </Form.Text>
                }
        </Form.Group>
    )
}
