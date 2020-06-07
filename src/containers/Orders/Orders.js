import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withError from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{
    state={
        orders: [],
        loading: false
    }
    componentDidMount(){
        this.setState({loading: true})
        axios.get('/orders.json')
        .then(response => {
            const fetchedOrders = []
            console.log(response.data);
            for(let key in response.data){
                fetchedOrders.push({...response.data[key], id: key})
            }
            this.setState({
            orders: fetchedOrders,
            loading: false
        });
        })
    }
    render(){
        let orders = this.state.orders.map(order => {
            console.log(order);
            return <Order key={order.id} ingredients={order.ingredients} price={+order.price} />
        });
        if(this.state.loading){
            orders = <Spinner />
        }

        return(
            <div>
                {orders}
            </div>
        )
    }
}

export default withError(Orders, axios);