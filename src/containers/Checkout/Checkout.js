import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends Component {
    constructor(props){
        super(props);
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {}
        let price = 0;
        for(let param of query.entries()){
            if(param[0] === 'price'){
                price = param[1];
            }
            else{
                ingredients[param[0]] = +param[1]
            }
            
        };
        this.state = {ingredients: ingredients, price: price};
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        // this.setState({loading: true})
        // let order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Ayush',
        //         address: 'Kapurthala',
        //         email: 'admin@example.com'
        //     }
        // }
        // axios.post('/orders.json', order)
        // .then(response => {
        //     this.setState({loading: false});
        // })
        // .catch(error => {
        //     this.setState({loading: false});
        // })
        this.props.history.replace('/checkout/contact-data')
    }

    render(){
        console.log(this.state)
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler} />
                <Route path={this.props.match.url + "/contact-data"}
                render = {(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>)} />
            </div>
            
        )
    }
}

export default Checkout;