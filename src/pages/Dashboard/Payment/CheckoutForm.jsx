import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import { MdVerifiedUser } from "react-icons/md";
import Swal from 'sweetalert2/src/sweetalert2.js';
import { useNavigate } from "react-router-dom";


const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransectionId] = useState('');
    const [cart, refetch] = useCart();
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);


    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: totalPrice })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [])



    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe && !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod);
            setError('');
        }

        // confirming payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })


        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                setTransectionId(paymentIntent.id)

                // saving the payment data into DB
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert is needed . use moment js to
                    cartId: cart.map(item => item._id),
                    menuItemId: cart.map(item => item.menuId),
                    status: 'pending'
                }

                const res = await axiosSecure.post('/payments', payment);
                console.log('payment is saved to DB', res.data);
                refetch();
                if (res.data.paymentResult) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thanks! You've dove your payment ",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/paymenthistory');
                }

            }
        }

    }
    return (
        <form className='p-8' onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button
                disabled={!stripe || !clientSecret}
                type='submit'
                className="btn bg-orange-500 hover:bg-orange-600 text-white mt-8">
                Pay
            </button>
            <p className='text-red-900'>{error}</p>
            {transactionId &&
                <>
                    <p className='text-black font-bold mt-8'>Your Transaction ID : <span className='text-green-600 ml-4'>{transactionId}</span></p>
                    <p className='flex items-center mt-4'><span className='font-bold mr-4'>Payment Succeded :</span><span className='text-green-600 text-4xl'><MdVerifiedUser /></span></p>
                </>
            }
        </form>
    );
};

export default CheckoutForm;