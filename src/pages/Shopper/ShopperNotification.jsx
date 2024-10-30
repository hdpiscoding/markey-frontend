import React, {useEffect, useState} from 'react';
import {AiFillPrinter} from "react-icons/ai";
import PrimaryHeader from "../../components/General/PrimaryHeader";
import Footer from "../../components/General/Footer";
import AccountNav from "../../components/Shopper/AccountNav";
import { PiBellZLight } from "react-icons/pi";
import ShopperReceivedItem from "../../components/Shopper/ShopperReceivedItem";

const ShopperNotification = () => {
    const [orders, setOrders] = useState([{}]);
    const [orderItems, setOrderItems] = useState([{}]);

    const [sampleOrderItems, setSampleOrderItems] = useState([
        { id: 1, name: "Son môi màu đỏ quyến rũ", price: 150000, quantity: 2500, status: "ĐANG GIAO HÀNG" },
        { id: 2, name: "Nước hoa hương chanh tươi mát", price: 800000, quantity: 1800, status: "ĐANG GIAO HÀNG" },
        { id: 3, name: "Kem dưỡng da ban đêm chống lão hóa", price: 600000, quantity: 1500, status: "ĐANG GIAO HÀNG" },
        { id: 4, name: "Sữa rửa mặt làm sạch sâu", price: 200000, quantity: 3200, status: "ĐANG GIAO HÀNG" },
        { id: 5, name: "Mặt nạ cấp ẩm chiết xuất thiên nhiên", price: 75000, quantity: 4800, status: "ĐANG GIAO HÀNG" },
        { id: 6, name: "Phấn nền trang điểm tự nhiên", price: 500000, quantity: 3100, status: "ĐANG GIAO HÀNG" },
        { id: 7, name: "Chì kẻ mắt chống nước", price: 120000, quantity: 5400, status: "ĐANG GIAO HÀNG" },
        { id: 8, name: "Nước tẩy trang dịu nhẹ", price: 250000, quantity: 900, status: "ĐANG GIAO HÀNG" },
        { id: 9, name: "Son dưỡng môi SPF 15", price: 95000, quantity: 2200, status: "ĐANG GIAO HÀNG" },
        { id: 10, name: "Kem chống nắng SPF 50", price: 400000, quantity: 3600, status: "ĐANG GIAO HÀNG" },
    ]);

    useEffect(() => {
        // Call API get all orders by user_id

        // Get orderItems with status = "ĐANG GIAO HÀNG" from orders

    }, []);

    const [items, setItems] = useState([]); // Dữ liệu cho tất cả component
    const [visibleItems, setVisibleItems] = useState(5); // Số lượng component ban đầu được hiển thị
    const ITEMS_TO_LOAD = 5; // Số lượng component mới được load mỗi lần

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
    }, [visibleItems, items]);

    const onDelete = (id) => {
        // Sample code
        setSampleOrderItems(sampleOrderItems.filter((item) => item.id !== id));
    }

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <PrimaryHeader/>

            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 grid grid-cols-[15%_2%_83%]">
                    <div className="col-start-1 flex justify-center">
                        <AccountNav currentPage={5}/>
                    </div>

                    <div className="col-start-3 bg-White round-sm py-4 px-6 flex flex-col gap-4">
                        <div className="flex flex-col justify-center gap-2">
                            <div>
                                <span className="font-semibold text-[2rem]">Thông báo của tôi</span>
                            </div>

                            <div className="border-t-2 w-full text-Dark_gray"></div>
                        </div>

                        {sampleOrderItems.length > 0
                            ? sampleOrderItems.map((item, index) => (
                                <ShopperReceivedItem id={item.id} name={item.name} price={item.price} quantity={item.quantity} status={item.status} key={index}
                                                     onDelete={onDelete}/>
                            ))
                            :
                            <div className="flex flex-col items-center justify-center py-3">
                                <PiBellZLight className="text-Dark_gray h-[80px] w-[80px]"/>

                                <span className="text-Dark_gray">
                                    Hiện tại bạn không có thông báo nào
                                </span>
                            </div>
                        }
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default ShopperNotification;