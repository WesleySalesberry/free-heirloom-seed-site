import React, {useState} from 'react'
import { useDispatch } from 'react-redux';

import { FormContainer } from './FormContainer'
import { Form, Button } from 'react-bootstrap'
import { FormInputComponent } from './FormInputComponent';

// Note to self for when i forget
// Built this just for learning and testing an idea

export const FormComponent = ({
    v1v, v1L, v1P, v1N, v1T, v1R,
    v2v, v2L, v2P, v2N, v2T, v2R,
    v3v, v3L, v3P, v3N, v3T, v3R,
    v4v, v4L, v4P, v4N, v4T, v4R,
    v5v, v5L, v5P, v5N, v5T, v5R,
    title, submit
}) => {
    const [ v1s, setV1S ] = useState(v1v)
    const [ v2s, setV2S ] = useState(v2v)
    const [ v3s, setV3S ] = useState(v3v)
    const [ v4s, setV4S ] = useState(v4v)
    const [ v5s, setV5S ] = useState(v5v)

    const dispatch = useDispatch()

    const handleSubmit = (evt) => {
        evt.preventDefault()
        dispatch(submit(v1s, v2s, v3s, v4s, v5s))
        console.log(v1s, v2s, v3s, v4s, v5s)
    }

    return (
        <FormContainer>
            <Form onSubmit={handleSubmit}>
                <FormInputComponent
                    label={v1L}
                    name={v1N}
                    type={v1T}
                    placeholder={v1P}
                    value={v1s}
                    required={v1R}
                    onChange={(evt) => setV1S(evt.target.value)}
                />

                <FormInputComponent
                    required={v2R}
                    label={v2L}
                    name={v2N}
                    type={v2T}
                    placeholder={v2P}
                    value={v2s}
                    onChange={(evt) => setV2S(evt.target.value)}
                />
                {
                    v3L ? 
                        <FormInputComponent
                            label={v3L}
                            name={v3N}
                            placeholder={v3P}
                            type={v3T}
                            value={v3s}
                            required={v3R}
                            onChange={(evt) => setV3S(evt.target.value)}
                        />
                        :
                        ""
                }
                {
                    v4L ? 
                        <FormInputComponent
                            label={v4L}
                            name={v4N}
                            placeholder={v4P}
                            type={v4T}
                            value={v4s}
                            required={v4R}
                            onChange={(evt) => setV4S(evt.target.value)}
                        />
                        :
                        ""
                }
                {
                    v5L ? 
                        <FormInputComponent
                            label={v5L}
                            name={v5N}
                            placeholder={v5P}
                            type={v5T}
                            value={v5s}
                            required={v5R}
                            onChange={(evt) => setV5S(evt.target.value)}
                        />
                        :
                        ""
                }
                <Button className="btn-block" type='submit' variant='primary'>
                    {title}
                </Button>

            </Form>
        </FormContainer>
    )
}
