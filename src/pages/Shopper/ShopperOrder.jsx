import React, {useEffect, useState} from 'react';
import PrimaryHeader from "../../components/General/PrimaryHeader";
import Footer from "../../components/General/Footer";
import AccountNav from "../../components/Shopper/AccountNav";
import OrderItem from "../../components/Shopper/OrderItem";

const ShopperOrder = () => {
    const orderItems = [
        { id: 1, name: "Son môi màu đỏ quyến rũ", price: 150000, quantity: 2500, status: "CHỜ XỬ LÝ" },
        { id: 2, name: "Nước hoa hương chanh tươi mát", price: 800000, quantity: 1800, status: "ĐANG GIAO HÀNG" },
        { id: 3, name: "Kem dưỡng da ban đêm chống lão hóa", price: 600000, quantity: 1500, status: "ĐÃ NHẬN HÀNG" },
        { id: 4, name: "Sữa rửa mặt làm sạch sâu", price: 200000, quantity: 3200, status: "CHỜ XỬ LÝ" },
        { id: 5, name: "Mặt nạ cấp ẩm chiết xuất thiên nhiên", price: 75000, quantity: 4800, status: "ĐANG GIAO HÀNG" },
        { id: 6, name: "Phấn nền trang điểm tự nhiên", price: 500000, quantity: 3100, status: "ĐÃ NHẬN HÀNG" },
        { id: 7, name: "Chì kẻ mắt chống nước", price: 120000, quantity: 5400, status: "CHỜ XỬ LÝ" },
        { id: 8, name: "Nước tẩy trang dịu nhẹ", price: 250000, quantity: 900, status: "ĐANG GIAO HÀNG" },
        { id: 9, name: "Son dưỡng môi SPF 15", price: 95000, quantity: 2200, status: "ĐÃ NHẬN HÀNG" },
        { id: 10, name: "Kem chống nắng SPF 50", price: 400000, quantity: 3600, status: "CHỜ XỬ LÝ" },
    ];
    const [status, setStatus] = useState("CHƯA THANH TOÁN");

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
    }

    const [items, setItems] = useState([]); // Dữ liệu cho tất cả component
    const [visibleItems, setVisibleItems] = useState(5); // Số lượng component ban đầu được hiển thị
    const ITEMS_TO_LOAD = 5; // Số lượng component mới được load mỗi lần

    // Tải dữ liệu ban đầu
    useEffect(() => {
        setItems(orderItems);
    }, []);

    // Hàm xử lý cuộn
    const handleScroll = () => {
        // Kiểm tra người dùng đã cuộn đến cuối danh sách chưa
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            loadMoreItems();
        }
    };

    // Hàm tải thêm component
    const loadMoreItems = () => {
        // Nếu vẫn còn dữ liệu để hiển thị
        if (visibleItems < items.length) {
            setVisibleItems((prevVisibleItems) => prevVisibleItems + ITEMS_TO_LOAD);
        }
    };

    // Lắng nghe sự kiện cuộn
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [visibleItems, items, handleScroll]);

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <PrimaryHeader/>

            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 grid grid-cols-[15%_2%_83%]">
                    <div className="col-start-1 flex justify-center">
                        <AccountNav currentPage={4}/>
                    </div>

                    <div className="flex flex-col gap-5 col-start-3">
                        <div className="col-start-3 bg-White round-sm pt-4 flex flex-col gap-4 h-fit">
                            <div className="grid grid-cols-[25%_25%_25%_25%]">
                                <div className="flex flex-col text-center gap-2 select-none">
                                    <span
                                        className={`cursor-pointer font-semibold text-xl ${status === "CHƯA THANH TOÁN" ? "text-Blue" : "text-Black"}`}
                                        onClick={() => handleStatusChange("CHƯA THANH TOÁN")}>
                                        CHƯA THANH TOÁN
                                    </span>

                                    {status === "CHƯA THANH TOÁN" && <div className="border-t-2 w-full border-Blue"></div>}

                                </div>

                                <div className="select-none flex flex-col text-center gap-2">
                                    <span
                                        className={`cursor-pointer font-semibold text-xl ${status === "CHỜ XỬ LÝ" ? "text-Blue" : "text-Black"}`}
                                        onClick={() => handleStatusChange("CHỜ XỬ LÝ")}>
                                        CHỜ XỬ LÝ
                                    </span>

                                    {status === "CHỜ XỬ LÝ" && <div className="border-t-2 w-full border-Blue"></div>}
                                </div>

                                <div className="flex flex-col text-center gap-2 select-none">
                                <span
                                    className={`cursor-pointer font-semibold text-xl ${status === "ĐANG GIAO HÀNG" ? "text-Blue" : "text-Black"}`}
                                    onClick={() => handleStatusChange("ĐANG GIAO HÀNG")}>
                                    ĐANG GIAO HÀNG
                                </span>

                                    {status === "ĐANG GIAO HÀNG" &&
                                        <div className="border-t-2 w-full border-Blue"></div>}
                                </div>

                                <div className="flex flex-col text-center gap-2 select-none">
                                <span
                                    className={`cursor-pointer font-semibold text-xl ${status === "ĐÃ NHẬN HÀNG" ? "text-Blue" : "text-Black"}`}
                                    onClick={() => handleStatusChange("ĐÃ NHẬN HÀNG")}>
                                    ĐÃ NHẬN HÀNG
                                </span>

                                    {status === "ĐÃ NHẬN HÀNG" && <div className="border-t-2 w-full border-Blue"></div>}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 px-4 col-start-3">
                            {items.slice(0, visibleItems).map((item) => (
                                <OrderItem
                                    key={item.id}
                                    id={item.id}
                                    productName={item.name}
                                    price={item.price}
                                    quantity={item.quantity}
                                    status={item.status}
                                />
                            ))}
                        </div>
                    </div>

                </div>

            </main>

            <Footer/>
        </div>
    );
};

export default ShopperOrder;