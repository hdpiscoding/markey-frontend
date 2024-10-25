import React, {useState} from 'react';
import Footer from "../../components/General/Footer";
import CartItemGroupByDate from "../../components/Shopper/CartItemGroupByDate";
import SecondaryHeader from "../../components/General/SecondaryHeader";

const ShopperCart = () => {
    const [productCount, setProductCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [checkedItems, setCheckedItems] = useState({});

    // Hàm để cập nhật trạng thái checked và sellingPrice từ ListItem
    const handleItemChange = (id, sellingPrice, isChecked) => {
        setCheckedItems((prevCheckedItems) => {
            const newCheckedItems = {
                ...prevCheckedItems,
                [id]: { sellingPrice, isChecked },
            };

            // Tính tổng giá trị `totalPrice`
            const newTotalPrice = Object.values(newCheckedItems)
                .filter(item => item.isChecked)
                .reduce((acc, curr) => acc + curr.sellingPrice, 0);

            // Cập nhật số lượng productCount
            const newProductCount = Object.values(newCheckedItems)
                .filter(item => item.isChecked)
                .length;

            setTotalPrice(newTotalPrice);
            setProductCount(newProductCount);
            return newCheckedItems;
        });
    };

    // Hàm để xóa item và cập nhật `totalPrice` và `productCount`
    const handleRemoveItem = (id) => {
        setCheckedItems((prevCheckedItems) => {
            const newCheckedItems = { ...prevCheckedItems };
            delete newCheckedItems[id]; // Xóa item ra khỏi danh sách checked

            // Tính toán lại `totalPrice` và `productCount` sau khi xóa
            const newTotalPrice = Object.values(newCheckedItems)
                .filter(item => item.isChecked)
                .reduce((acc, curr) => acc + curr.sellingPrice, 0);
            const newProductCount = Object.values(newCheckedItems)
                .filter(item => item.isChecked)
                .length;

            setTotalPrice(newTotalPrice);
            setProductCount(newProductCount);
            return newCheckedItems;
        });
    };

    const formatNumberWithDots = (number) => {
        // Convert the number to a string
        let numberStr = number.toString();

        // Use a regular expression to add dots every three digits from the end
        let formattedStr = numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return formattedStr;
    }

    const productDateList = [
        {
            id: 1,
            date: "18/04/2024",
        },
        {
            id: 2,
            date: "19/04/2024",
        },
        {
            id: 3,
            date: "20/04/2024",
        },
        {
            id: 4,
            date: "21/04/2024",
        },
    ]
    return (
        <div className="bg-Light_gray overflow-x-hidden h-screen">
            <SecondaryHeader head="Giỏ hàng"/>
            <main className="grid grid-cols-[1fr_10fr_1fr] my-5 w-screen">
                <div className="col-start-2">
                    <div className="grid grid-cols-[0.25fr_11.5fr_0.25fr] bg-White">
                        <div className="col-start-2 grid grid-cols-[7fr_1.5fr_2fr_1.5fr_1fr]">
                            <div className="flex items-center justify-center col-start-1 py-2">
                                <span className="font-semibold text-lg">
                                    Sản phẩm
                                </span>
                            </div>

                            <div className="flex items-center justify-center col-start-2">
                                <span className="font-semibold text-lg">
                                    Đơn giá
                                </span>
                            </div>

                            <div className="flex items-center justify-center col-start-3">
                                <span className="font-semibold text-lg">
                                    Số lượng
                                </span>
                            </div>

                            <div className="flex items-center justify-center col-start-4">
                                <span className="font-semibold text-lg">
                                    Số tiền
                                </span>
                            </div>

                            <div className="flex items-center justify-center col-start-5">
                                <span className="font-semibold text-lg">
                                    Thao tác
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        {productDateList.map((productDate) => (
                            <div>
                                <CartItemGroupByDate key={productDate.id} date={productDate.date} onItemChange={handleItemChange} onRemoveItem={handleRemoveItem} checkedItems={checkedItems}/>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-row-reverse bg-White mt-5 sticky bottom-0 gap-5 transition-shadow border">
                        <div className="mr-10 my-3">
                            {productCount > 0
                                ?
                                <button className="bg-Blue rounded-sm py-2 px-6 hover:bg-Dark_blue">
                                    <span className="text-White text-lg">
                                        Mua hàng
                                    </span>
                                </button>
                                :
                                <button className="bg-Light_blue rounded-sm py-2 px-6 cursor-not-allowed" disabled>
                                    <span className="text-White text-lg">
                                        Mua hàng
                                    </span>
                                </button>}
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            <div>
                                <span>
                                    Tổng thanh toán: ({productCount ?? 0} sản phẩm)
                                </span>
                            </div>

                            <div>
                                <span className="text-Red font-bold text-xl">
                                    ₫ {formatNumberWithDots(totalPrice) ?? 0}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
            <Footer/>
        </div>
    );
};

export default ShopperCart;