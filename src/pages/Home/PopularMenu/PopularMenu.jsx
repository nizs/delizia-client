
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import MenuItem from "../../shared/MenuItem/MenuItem";

const PopularMenu = () => {
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');
    return (
        <section className='my-16'>
            <SectionTitle heading={"FROM OUR MENU"} subHeading={"Check it out"} />
            <div className='grid md:grid-cols-2 gap-8 mx-4'>
                {
                    popular.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    >
                    </MenuItem>)
                }
            </div>
        </section>
    );
};

export default PopularMenu;