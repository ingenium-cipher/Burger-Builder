import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
        }
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false});
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading: false});
            alert(error);
        })
    }
    
    render(){
        let form = <form>
        <input className="Input" type="text" name="name" placeholder="Your Name"></input>
        <Button btnType="Success" clicked={this.orderHandler}>Order!</Button>
        </form>
        if(this.state.loading){
            form = <Spinner />
        }
        return (
            <div className="CheckoutBox">
                <h4>Enter you Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;