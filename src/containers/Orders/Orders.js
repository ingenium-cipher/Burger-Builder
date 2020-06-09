import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

class Orders extends Component{
    componentDidMount(){
        console.log(this.props.token, this.props.userId)
        this.props.onFetchOrders(this.props.token, this.props.userId)
        
    }
    render(){
        let orders = this.props.orders.map(order => {
            console.log(order);
            return <Order key={order.id} ingredients={order.ingredients} price={+order.price} />
        });
        if(this.props.loading){
            orders = <Spinner />
        }

        return(
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => {dispatch(actions.fetchOrders(token, userId))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));