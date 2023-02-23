import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const LoginForm = () => (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                <Image src='/logo.png' /> AP SoftIndustries
            </Header>
            <Form size='large'>
                <Segment stacked>
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='Correo electrónico' />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Contraseña'
                        type='password'
                    />

                    <Button color='teal' fluid size='large'>
                        Iniciar Sesión
                    </Button>
                </Segment>
            </Form>
            <Message>
                ¿Eres nuevo? <Link to={'/firma-electronica/signup'}>Regístrate</Link>
            </Message>
        </Grid.Column>
    </Grid>
)

export default LoginForm