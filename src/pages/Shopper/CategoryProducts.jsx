import React, {useState} from 'react';
import PrimaryHeader from "../../components/General/PrimaryHeader";
import Footer from "../../components/General/Footer";
import Filter from "../../components/General/Filter";
import ProductCardViewMd from "../../components/Shopper/ProductCardViewMd";
import {Pagination, Stack} from "@mui/material";

const CategoryProducts = () => {
    const products = [
        { id: 1, name: "Son môi màu đỏ quyến rũ", price: 150000, sold: 2500 },
        { id: 2, name: "Nước hoa hương chanh tươi mát", price: 800000, sold: 1800 },
        { id: 3, name: "Kem dưỡng da ban đêm chống lão hóa", price: 600000, sold: 1500 },
        { id: 4, name: "Sữa rửa mặt làm sạch sâu", price: 200000, sold: 3200 },
        { id: 5, name: "Mặt nạ cấp ẩm chiết xuất thiên nhiên", price: 75000, sold: 4800 },
        { id: 6, name: "Phấn nền trang điểm tự nhiên", price: 500000, sold: 3100 },
        { id: 7, name: "Chì kẻ mắt chống nước", price: 120000, sold: 5400 },
        { id: 8, name: "Nước tẩy trang dịu nhẹ", price: 250000, sold: 900 },
        { id: 9, name: "Son dưỡng môi SPF 15", price: 95000, sold: 2200 },
        { id: 10, name: "Kem chống nắng SPF 50", price: 400000, sold: 3600 },
        { id: 11, name: "Dầu gội phục hồi tóc hư tổn", price: 300000, sold: 1700 },
        { id: 12, name: "Sữa tắm chiết xuất dừa", price: 180000, sold: 2100 },
        { id: 13, name: "Serum tinh chất làm sáng da", price: 700000, sold: 800 },
        { id: 14, name: "Bộ trang điểm cơ bản", price: 900000, sold: 600 },
        { id: 15, name: "Nước hoa hồng làm sạch da", price: 180000, sold: 3500 },
        { id: 16, name: "Tẩy tế bào chết toàn thân", price: 280000, sold: 1900 },
        { id: 17, name: "Kem trị mụn hiệu quả", price: 220000, sold: 4200 },
        { id: 18, name: "Bảng phấn mắt 12 màu", price: 500000, sold: 900 },
        { id: 19, name: "Mặt nạ ngủ cho da", price: 350000, sold: 1100 },
        { id: 20, name: "Bông tẩy trang mềm mại", price: 50000, sold: 8000 },
        { id: 21, name: "Túi đựng mỹ phẩm thời trang", price: 150000, sold: 4500 },
        { id: 22, name: "Dầu xả phục hồi tóc", price: 250000, sold: 1300 },
        { id: 23, name: "Kem dưỡng ẩm ban ngày", price: 350000, sold: 700 },
        { id: 24, name: "Phấn phủ không dầu", price: 250000, sold: 2000 },
        { id: 25, name: "Gương trang điểm LED", price: 300000, sold: 950 },
        { id: 26, name: "Nước hoa nam hương gỗ", price: 950000, sold: 600 },
        { id: 27, name: "Gel lô hội dưỡng ẩm", price: 220000, sold: 3000 },
        { id: 28, name: "Chì kẻ mày tự nhiên", price: 120000, sold: 2800 },
        { id: 29, name: "Bút kẻ mắt nước chống trôi", price: 150000, sold: 1500 },
        { id: 30, name: "Khăn tắm siêu mềm mại", price: 60000, sold: 4000 },
        { id: 31, name: "Son môi màu hồng pastel", price: 140000, sold: 2100 },
        { id: 32, name: "Nước hoa hương vanilla ngọt ngào", price: 700000, sold: 1750 },
        { id: 33, name: "Kem chống lão hóa ban ngày", price: 650000, sold: 1200 },
        { id: 34, name: "Sữa rửa mặt cho da nhạy cảm", price: 220000, sold: 3300 },
        { id: 35, name: "Mặt nạ đất sét làm sạch lỗ chân lông", price: 300000, sold: 1900 },
        { id: 36, name: "Phấn trang điểm kiềm dầu", price: 280000, sold: 2800 },
        { id: 37, name: "Chì kẻ mắt màu đen", price: 100000, sold: 3200 },
        { id: 38, name: "Nước tẩy trang cho da nhạy cảm", price: 200000, sold: 900 },
        { id: 39, name: "Son dưỡng môi có màu", price: 95000, sold: 2200 },
        { id: 40, name: "Kem chống nắng dạng xịt SPF 30", price: 450000, sold: 2900 },
        { id: 41, name: "Dầu gội chiết xuất thiên nhiên", price: 250000, sold: 1600 },
        { id: 42, name: "Sữa tắm hương oải hương", price: 200000, sold: 2400 },
        { id: 43, name: "Serum phục hồi tóc", price: 400000, sold: 1100 },
        { id: 44, name: "Bộ chăm sóc da mặt cơ bản", price: 950000, sold: 750 },
        { id: 45, name: "Nước hoa hồng làm dịu da", price: 160000, sold: 3100 },
        { id: 46, name: "Tẩy tế bào chết cho môi", price: 150000, sold: 2000 },
        { id: 47, name: "Kem trị thâm mụn", price: 240000, sold: 5000 },
        { id: 48, name: "Bảng phấn mắt 15 màu", price: 550000, sold: 900 },
        { id: 49, name: "Mặt nạ ngủ chiết xuất trà xanh", price: 370000, sold: 1100 },
        { id: 50, name: "Khăn giấy ướt làm sạch", price: 40000, sold: 8500 },
        { id: 51, name: "Túi xách đựng mỹ phẩm", price: 180000, sold: 4200 },
        { id: 52, name: "Dầu xả dưỡng tóc", price: 270000, sold: 1300 },
        { id: 53, name: "Kem chống nắng vật lý SPF 50", price: 500000, sold: 900 },
        { id: 54, name: "Phấn phủ trang điểm lâu trôi", price: 300000, sold: 2100 },
        { id: 55, name: "Gương trang điểm không gương", price: 250000, sold: 800 },
        { id: 56, name: "Nước hoa hương gỗ đàn hương", price: 850000, sold: 400 },
        { id: 57, name: "Gel dưỡng ẩm cho da mặt", price: 320000, sold: 2500 },
        { id: 58, name: "Chì kẻ mày dạng bột", price: 130000, sold: 2900 },
        { id: 59, name: "Bút kẻ mắt nước màu xanh", price: 170000, sold: 1500 },
        { id: 60, name: "Khăn tắm 100% cotton", price: 70000, sold: 6000 },
        { id: 61, name: "Son bóng màu cam", price: 120000, sold: 2700 },
        { id: 62, name: "Nước hoa hương hoa nhài", price: 600000, sold: 1800 },
        { id: 63, name: "Kem chống lão hóa ban đêm", price: 700000, sold: 1300 },
        { id: 64, name: "Sữa rửa mặt chiết xuất lô hội", price: 220000, sold: 3200 },
        { id: 65, name: "Mặt nạ giấy cấp ẩm", price: 120000, sold: 4800 },
        { id: 66, name: "Phấn nước trang điểm", price: 300000, sold: 2300 },
        { id: 67, name: "Chì kẻ mắt màu nâu", price: 130000, sold: 2000 },
        { id: 68, name: "Nước tẩy trang cho da thường", price: 250000, sold: 900 },
        { id: 69, name: "Son dưỡng môi không màu", price: 95000, sold: 3500 },
        { id: 70, name: "Kem chống nắng dạng kem SPF 30", price: 400000, sold: 2100 },
        { id: 71, name: "Dầu gội cho tóc nhuộm", price: 250000, sold: 1700 },
        { id: 72, name: "Sữa tắm hương trái cây", price: 180000, sold: 2500 },
        { id: 73, name: "Serum chống lão hóa", price: 700000, sold: 900 },
        { id: 74, name: "Bộ trang điểm chuyên nghiệp", price: 1200000, sold: 400 },
        { id: 75, name: "Nước hoa hồng cho da dầu", price: 190000, sold: 2200 },
        { id: 76, name: "Tẩy tế bào chết cho da mặt", price: 260000, sold: 1800 },
        { id: 77, name: "Kem trị nám hiệu quả", price: 300000, sold: 1300 },
        { id: 78, name: "Bảng phấn mắt 20 màu", price: 600000, sold: 500 },
        { id: 79, name: "Mặt nạ ngủ chiết xuất trà trắng", price: 350000, sold: 1100 },
        { id: 80, name: "Khăn giấy ướt chiết xuất tự nhiên", price: 45000, sold: 9000 },
        { id: 81, name: "Túi đựng mỹ phẩm cao cấp", price: 200000, sold: 3700 },
        { id: 82, name: "Dầu xả cho tóc khô", price: 230000, sold: 1600 },
        { id: 83, name: "Kem chống nắng nước SPF 50", price: 500000, sold: 800 },
        { id: 84, name: "Phấn phủ cho da khô", price: 270000, sold: 2100 },
        { id: 85, name: "Gương trang điểm bỏ túi", price: 120000, sold: 1000 },
        { id: 86, name: "Nước hoa hương cam chanh", price: 800000, sold: 500 },
        { id: 87, name: "Gel lô hội làm dịu da", price: 220000, sold: 3300 },
        { id: 88, name: "Chì kẻ mày dạng kem", price: 140000, sold: 2900 },
        { id: 89, name: "Bút kẻ mắt nước màu tím", price: 160000, sold: 1200 },
        { id: 90, name: "Khăn tắm dành cho trẻ em", price: 75000, sold: 3000 },
        { id: 91, name: "Son môi màu nude", price: 110000, sold: 2500 },
        { id: 92, name: "Nước hoa hương trái cây tươi mát", price: 900000, sold: 1700 },
        { id: 93, name: "Kem dưỡng ẩm cho da nhạy cảm", price: 320000, sold: 1000 },
        { id: 94, name: "Sữa rửa mặt cho da khô", price: 200000, sold: 1500 },
        { id: 95, name: "Mặt nạ đất sét làm trắng da", price: 280000, sold: 1300 },
        { id: 96, name: "Phấn nước kiềm dầu", price: 300000, sold: 2500 },
        { id: 97, name: "Chì kẻ mắt màu xanh lá", price: 130000, sold: 1100 },
        { id: 98, name: "Nước tẩy trang cho mắt", price: 200000, sold: 600 },
        { id: 99, name: "Son dưỡng môi có mùi trái cây", price: 95000, sold: 3000 },
        { id: 100, name: "Kem chống nắng SPF 50 dạng xịt", price: 450000, sold: 1200 },
    ];

    const [selectedDiv, setSelectedDiv] = useState(1); // Default selected div (1: Phổ biến, 2: Bán chạy, 3: Giá)
    const [selectValue, setSelectValue] = useState('default');

    const handleDivClick = (index) => {
        if (selectedDiv !== index) {
            setSelectedDiv(index);
            if (selectedDiv === 3) {
                setSelectValue('default');
            }
        }
    };

    const handleSelectChange = (event) => {
        setSelectValue(event.target.value);
    };

    // set up pagination
    const [page, setPage] = useState(1);

    const itemsPerPage = 25;
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0)
    }
    // end of set up pagination

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <PrimaryHeader/>

            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 flex flex-col gap-4">
                    <div className="bg-gradient-to-b from-Blue to-Light_blue rounded-sm py-1 text-center mb-4">
                        <span className="text-White font-bold text-2xl p-4">
                            TÊN DANH MỤC
                        </span>
                    </div>

                    <div className="grid grid-cols-[22%_1%_77%]">
                        <Filter/>

                        <div className="col-start-3 flex flex-col gap-6">
                            <div className="bg-[#e1e1e1]">
                                <div className="flex items-center gap-20 ml-8 py-2">
                                    <div>
                                        <span className="font-semibold text-lg">
                                            Sắp xếp theo
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-10 select-none">
                                        <div className={`flex text-center rounded-md px-5 py-1 cursor-pointer 
                                            ${selectedDiv === 1 ? 'bg-Blue text-white' : 'bg-White'}`}
                                             onClick={() => handleDivClick(1)}>
                                            <span>
                                                Phổ biến
                                            </span>
                                        </div>

                                        <div className={`flex text-center rounded-md px-5 py-1 cursor-pointer 
                                            ${selectedDiv === 2 ? "bg-Blue text-white" : 'bg-White'}`}
                                             onClick={() => handleDivClick(2)}>
                                            <span>
                                                Bán chạy
                                            </span>
                                        </div>

                                        <div>
                                            <select className={`rounded-md px-5 py-1 cursor-pointer 
                                                    ${selectedDiv === 3 ? 'border border-Blue outline-none ring-2 ring-Blue text-Blue' : ''}`}
                                                    onClick={() => handleDivClick(3)}
                                                    value={selectValue} onChange={handleSelectChange}>
                                                <option value="default" disabled hidden>Giá:</option>
                                                <option value="1">Giá: Thấp đến Cao</option>
                                                <option value="2">Giá: Cao đến Thấp</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
                                {currentProducts.map((product) => (
                                    <ProductCardViewMd key={product.id} id={product.id} name={product.name} price={product.price}
                                                       rating={product.rating} role="shopper"/>
                                ))}
                            </div>

                            <div className="flex items-center justify-center">
                                <Stack>
                                    <Pagination
                                        count={totalPages}
                                        page={page}
                                        onChange={handlePageChange}
                                        variant="text"
                                        shape="rounded"
                                        sx={{
                                            "& .MuiPaginationItem-root": {
                                                color: "#AAAAAA",            // Màu văn bản mặc định
                                            },
                                            '& .MuiPaginationItem-root:hover': {
                                                // Màu khi hover
                                                backgroundColor: '#008DDA', // Màu nền khi hover
                                                color: 'white', // Màu chữ khi hover
                                            },
                                            "& .Mui-selected": {
                                                backgroundColor: "#008DDA !important", // Màu nền cho item được chọn
                                                color: "white",              // Màu chữ cho item được chọn
                                            },
                                            "& .MuiPaginationItem-ellipsis": {
                                                color: "#AAAAAA"              // Màu sắc cho dấu ba chấm (ellipsis)
                                            }
                                        }}/>
                                </Stack>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default CategoryProducts;