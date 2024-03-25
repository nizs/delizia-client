
const FoodCard = ({item}) => {
    const { name, image, recipe, price } = item;
    return (
        <div className="card  bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className='absolute right-0 mr-8 mt-4 px-4  bg-slate-900 text-white'>${price}</p>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center">
                    <button className="btn bg-base-600 border-0 border-b-2 border-orange-500 hover:bg-black hover:text-white hover:border-0">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;