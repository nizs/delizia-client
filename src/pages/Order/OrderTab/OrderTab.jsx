
import FoodCard from '../../shared/FoodCard/FoodCard';

const OrderTab = ({ items }) => {
    console.log(items);
    return (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mx-0 md:mx-0'>
            {
                items.map(item => <FoodCard
                    key={item._id}
                    item={item}
                ></FoodCard>)
            }
        </div>
    );
};

export default OrderTab;