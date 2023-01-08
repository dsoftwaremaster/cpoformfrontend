import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { RegistrarRequest } from '../../api/AuthRequest';

function SignUpForm() {

    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (showAlert) {
            setTimeout(() => {
                setShowAlert(false);
                // window.location.href = "/";
            }, 3000);
        }
    }, [showAlert]);

    const dismiss = () => {
        setShowAlert(false);
    };
    const registerRequest = (data) => {
        RegistrarRequest(data)
            .then((res) => {
                if (res) {
                    setShowAlert(true);
                    console.log(res.response);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repeatPassword: '',
        },
        onSubmit: (formData) => {
            console.log(formData);
            registerRequest(formData);
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Campo obligatorio').email('No es un email válido.'),
            password: Yup.string().required('Campo obligatorio').min(3, 'Mínimo 8 caracteres.').max(12, 'Máximo 12 caracteres.'),
            repeatPassword: Yup.string().required('Campo obligatorio').oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden.'),
        })
    });

    return <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                <Image src='/logo.png' /> AP SoftIndustries
            </Header>
            {showAlert && <>
                <Message floating info onDismiss={dismiss} >
                    <Message.Header>¡Felicitaciones!</Message.Header>
                    <Message.Content>
                        <p>Serás redirigido al inicio de sesión</p>
                    </Message.Content>
                </Message>
            </>}
            <Form size='large' onSubmit={formik.handleSubmit}>
                <Segment stacked>
                    <Form.Input
                        fluid icon='user'
                        iconPosition='left'
                        placeholder='Correo electrónico'
                        name='email'
                        onChange={formik.handleChange}
                        error={formik.errors.email}
                    />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Contraseña'
                        type='password'
                        name='password'
                        onChange={formik.handleChange}
                        error={formik.errors.password}
                    />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Repetir Contraseña'
                        type='password'
                        name='repeatPassword'
                        onChange={formik.handleChange}
                        error={formik.errors.repeatPassword}
                    />

                    <Button color='teal' fluid size='large' type='submit'>
                        Registrarse
                    </Button>
                </Segment>
            </Form>
            <Message>
                <Link to={'/firma-electronica'}>Regresar</Link>
            </Message>
        </Grid.Column>
    </Grid>
}





export default SignUpForm