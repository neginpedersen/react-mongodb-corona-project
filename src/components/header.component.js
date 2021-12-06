import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import coronavirus from '../coronavirus.jpg'; 
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
export default class Header extends Component {

   
    render() {
        return (
                    
        <Container>
            <Row>
                <Col xs={5} md={5}>
                    <Image src={coronavirus} fluid/>
                </Col>
                <Col xs={5} md={7}>
                <h1> Corona Story<Badge variant="secondary">Share your stories of Corona and pandemic!</Badge></h1>
                </Col>
            </Row>
        </Container>
        );
    }
}

