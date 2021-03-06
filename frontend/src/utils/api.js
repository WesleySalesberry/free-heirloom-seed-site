import axios from 'axios';

function setStorage(key, value){
    sessionStorage.setItem(`${key}`, JSON.stringify(value))
}

function getToken() {
    let storedToken
    try {
        storedToken = JSON.parse(sessionStorage.getItem("token"));
        return storedToken
    } catch {
        return "";
    }
}

class API {
    axiosInstance = null;
    constructor() {
        const axiosInstance = axios.create({
            baseURL: "http://127.0.0.1:8000/api/v1",
            withCredentials: true,
            timeout: 30000,
        });

        axiosInstance.interceptors.request.use(function(config){
            const token = getToken();
            config.headers.Authorization = token ? `Bearer ${token}` : '';
            return config;
        })

        this.axiosInstance = axiosInstance;
    }

    async seeds(){
        const { data } = await this.axiosInstance.get('seeds/all-seeds/')
        return data
    }

    async singleSeed(slug){
        const { data } = await this.axiosInstance.get(`seeds/${slug}/`)
        return data
    }

    async login(email, password) {
        try {
            const { data } = await this.axiosInstance.post(`auth/login/`, 
                { 'email': email, 'password': password }
            )
            setStorage("token", data.token)
            return data
        } catch (error) {
            console.log(error)
        }
    }

    async register(first_name, last_name, email, password){
        try {
            await this.axiosInstance.post('auth/register/',
            {
                'first_name': first_name,
                'last_name': last_name,
                'email': email,
                'password': password
            })
        } catch (error) {
            console.log(error)
        }
    }

    async getUser(){
        try {
            const { data } = await this.axiosInstance.get(`auth/get-user/`)
            setStorage("user", data.customer)
            setStorage("address", data.shipping)
            return data
        } catch (error) {
            console.log(error)
        }
    }

    async updateUser(firstName, lastName, email){
        try {
            const { data } = await this.axiosInstance.put('auth/update-user/',{
                'first_name': firstName,
                'last_name': lastName,
                'email': email
            })
            return data
        } catch (error) {
            console.log(error)
        }
    }

    async getAddress(){
        try {
            const { data } = await this.axiosInstance.get('shipping/get-address/')
            return data
        } catch (error) {
            console.log(error)
        }
        
    }

    async createAddress(street, city, postalCode, state, country){
        try {
            const { data } = await this.axiosInstance.post('shipping/create-address/',
                {
                    'address': street,
                    'city': city,
                    "postal_code": postalCode,
                    'state':state,
                    'country': country
                }
            )

            return data
        } catch (error) {
            console.log(error)
        }
    }

    async updateShipping(address, city, postalCode, state, country){
        try {
            const { data } = await this.axiosInstance.put('shipping/update-address/',
                {
                    'address': address,
                    'city': city,
                    'postal_code': postalCode,
                    'state': state,
                    'country': country
                }) 
                return data
        } catch (error) {
            console.log(error)
        }
    }

    async addItemToCart(slug){
        try {
            const { data } = await this.axiosInstance.get(`http://127.0.0.1:8000/api/v1/seeds/${slug}/`)
            
            return data
        } catch (error) {
            console.log(error)
        }
    }

    async createOrder(payment_method, confirmation, total_price, is_paid, order_created){
        try {
            const { data } = await this.axiosInstance.post('/order/create-order/',
                {
                    "payment_method": payment_method,
                    "confirmation": confirmation,
                    "total_price": total_price,
                    "is_paid": is_paid,
                    "order_created": order_created
                }) 
            return data
        } catch (error) {
            console.log(error)
        }
    }

    async addOrder(orderItems){
        try {
            const { data } = await this.axiosInstance.post('/order/add-order/',
                
                { 
                    orderItems
                }
            ) 
                return data
        } catch (error) {
            console.log(error)
        }
    }

    async getOrders(){
        try {
            const { data } = await this.axiosInstance.get('/order/get-orders/') 
                return data
        } catch (error) {
            console.log(error)
        }
    }
}




export default new API();