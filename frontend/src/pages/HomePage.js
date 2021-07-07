import React, { useEffect } from 'react'
import { Seeds } from '../components/Seeds'
import { Loader } from '../components/Loader'
import { Container, Row, Col } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { seedLists } from '../redux/seeds/seedAction'



export const HomePage = () => {

    const dispatch = useDispatch()
    const seedList = useSelector(state => state.seedLists)
    const { seeds, loading, error } = seedList

    useEffect(() => {
        dispatch(seedLists())
    }, [dispatch])

    return (
        <Container className="text-center py-3" fluid>
            <div className="mx-auto">
                <h3>Currently in Stock</h3>
                {
                    loading ? <Loader />
                    : error ? <h3>{ error }</h3>
                    :
                    <Row className="mx-auto">
                        {
                            seeds && seeds.map(itm => (
                                <Col key={itm.id} sm={12} md={6} lg={4} xl={3}>
                                    <Seeds product={itm}/>
                                </Col>
                            ))
                        }
                    </Row>
                }
            </div>
        </Container>
    )
}
