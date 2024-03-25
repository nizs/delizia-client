import { Link } from 'react-router-dom';
import Cover from '../../shared/Cover/Cover';
import MenuItem from '../../shared/MenuItem/MenuItem';

const MenuCategory = ({ items, title, coverImg }) => {
    return (
        <section className='my-12'>
            {title && <Cover coverImg={coverImg} title={title} />}
            <div className='grid md:grid-cols-2 gap-8 mx-4 my-16'>
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    >
                    </MenuItem>)
                }
            </div>
            <Link to={`/order/${title}`}><button className="btn bg-transparent border-0 border-b-2 border-black text-black hover:bg-black hover:text-white hover:border-0 mt-4">Order Now</button></Link>
        </section>
    );
};

export default MenuCategory;