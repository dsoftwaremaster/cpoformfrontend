//AMBIENTES - local, test, produccion
const ambiente = 'local';

const api_config = {
    local: {
        url: 'http://localhost:8000/api',
    },
    test: {
        url: 'http://159.89.47.92/api',
    },
    testWifi: {
        url: 'http://192.168.100.5:8000/api',
    },
    produccion: {
        url: 'http://52.206.72.188/CPOFacturacionWebBack/public/api',
    }

}

export const CONFIGS = {

    API_URL: api_config[ambiente].url,

    TIPOS_IDENTIFICACION: [
        {
            id: '04',
            tipo: 'RUC',
        },
        {
            id: '05',
            tipo: 'CEDULA'
        },
        {
            id: '06',
            tipo: 'PASAPORTE'
        },
        {
            id: '07',
            tipo: 'CONSUMIDOR FINAL'
        },
        {
            id: '08',
            tipo: 'IDENTIFICACION DEL EXTERIOR'
        },
        {
            id: '09',
            tipo: 'PLACA'
        }
    ],

    FORMAS_PAGO: [
        {
            id: '01',
            forma: 'SIN UTILIZACION DEL SISTEMA FINANCIERO',
        },
        {
            id: '15',
            forma: 'COMPENSACIÓN DE DEUDAS',
        },
        {
            id: '16',
            forma: 'TARJETA DE DÉBITO',
        },
        {
            id: '17',
            forma: 'DINERO ELECTRÓNICO',
        },
        {
            id: '18',
            forma: 'TARJETA PREPAGO',
        },
        {
            id: '19',
            forma: 'TARJETA DE CRÉDITO',
        },
        {
            id: '20',
            forma: 'OTROS CON UTILIZACION DEL SISTEMA FINANCIERO',
        },
        {
            id: '21',
            forma: 'ENDOSO DE TÍTULOS',
        },

    ],

    MESES: [
        { mesNumero: 1, mes: 'Enero' },
        { mesNumero: 2, mes: 'Febrero' },
        { mesNumero: 3, mes: 'Marzo' },
        { mesNumero: 4, mes: 'Abril' },
        { mesNumero: 5, mes: 'Mayo' },
        { mesNumero: 6, mes: 'Junio' },
        { mesNumero: 7, mes: 'Julio' },
        { mesNumero: 8, mes: 'Agosto' },
        { mesNumero: 9, mes: 'Septiembre' },
        { mesNumero: 10, mes: 'Octubre' },
        { mesNumero: 11, mes: 'Noviembre' },
        { mesNumero: 12, mes: 'Diciembre' }
    ],

    IMPUESTO: [
        { id: 1, nombre: 'IVA 12%', tarifa: '12' },
        { id: 2, nombre: 'IVA 0%', tarifa: '0' }
    ]

}