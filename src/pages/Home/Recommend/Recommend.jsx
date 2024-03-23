import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import RecommendItem from '../../shared/RecommendItem/RecommendItem';

const Recommend = () => {
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        fetch('/menu.json')
            .then(res => res.json())
            .then(data => {
                const filteredItems = data.filter(item => item.category === 'recommend')
                setMenu(filteredItems)
            })
    }, [])
    return (
        <section className='my-16'>
            <SectionTitle heading={"Chef Recommends"} subHeading={"Should Try"} />
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 md:mx-8'>
                {
                    menu.map(item => <RecommendItem
                        key={item._id}
                        item={item}
                    >
                    </RecommendItem>)
                }
            </div>
        </section>
    );
};

export default Recommend;