import { Helmet } from 'react-helmet-async';
import Cover from '../../shared/Cover/Cover';
import coverImg from '../../../assets/menu/banner3.jpg';
import dessertImg from '../../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../../assets/menu/pizza-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';
import soupImg from '../../../assets/menu/soup-bg.jpg';
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';
const Menu = () => {
    const [menu] = useMenu();
    const salad = menu.filter(item => item.category === 'salad');
    const soup = menu.filter(item => item.category === 'soup');
    const dessert = menu.filter(item => item.category === 'dessert');
    const pizza = menu.filter(item => item.category === 'pizza');
    const offered = menu.filter(item => item.category === 'offered');
    return (
        <div>
            <Helmet>
                <title>Delizia | Menu</title>
            </Helmet>
            {/* page cover */}
            <Cover coverImg={coverImg} title={'OUR MENU'} />
            {/* section title */}
            <SectionTitle subHeading={"Don't Miss"} heading={"TODAY'S OFFER"}></SectionTitle>
            {/* offered menu items */}
            <MenuCategory items={offered}></MenuCategory>
            {/* dessert menu items */}
            <MenuCategory items={dessert} title={"Dessert"} coverImg={dessertImg} ></MenuCategory>
            {/* pizza menu items */}
            <MenuCategory items={pizza} title={"Pizza"} coverImg={pizzaImg} ></MenuCategory>
            {/* salad menu items */}
            <MenuCategory items={salad} title={"Salad"} coverImg={saladImg} ></MenuCategory>
            {/* soup menu items */}
            <MenuCategory items={soup} title={"Soup"} coverImg={soupImg} ></MenuCategory>

        </div>
    );
};

export default Menu;