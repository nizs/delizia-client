import useAuth from "../../../hooks/useAuth";
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";

const FoodCard = ({ item }) => {
    const { name, image, recipe, price, _id } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [ , refetch] = useCart();

    const handleAddToCart = food => {
        if (user && user.email) {
            // sending cart item to DB
            const cartItem = {
                menuId: _id,
                email: user.email,
                customerName: user.displayName,
                recipeName: name,
                image,
                price
            }
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${name} has been added to cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // refetching cart data for instant loading 
                        refetch();
                    }
                })
        }
        else {
            Swal.fire({
                title: "Your are not logged in !!",
                text: "Please login to Add to cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            });
        }
    }

    return (
        <div className="card  bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className='absolute right-0 mr-8 mt-4 px-4  bg-slate-900 text-white'>${price}</p>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center">
                    <button onClick={() => handleAddToCart(item)} className="btn bg-base-600 border-0 border-b-2 border-orange-500 hover:bg-black hover:text-white hover:border-0">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;