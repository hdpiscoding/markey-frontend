import React from 'react';
import versace from "../../assets/versace_cologne.svg";
import Rating from "@mui/material/Rating";

const RatingModal = ({open, onClose, productID, productName, isRating}) => {
    const [rating, setRating] = React.useState(5);
    const [comment, setComment] = React.useState("");

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handleClose = () => {
        if (!isRating) {
            setRating(5);
            setComment("");
        }

        onClose();
    };

    const handleUpdateRating = () => {
        // Call API to update rating
        onClose();
    };

    return (
        // backdrop
        <div className={`fixed inset-0 flex items-center justify-center z-[100] ${open ? "visible bg-black/20" : "collapse"}`}>
            <div onClick={(e) => e.stopPropagation()} className={`bg-White rounded-sm shadow w-[35rem] h-[28rem] grid grid-rows-[90%_10%] ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <div className="flex flex-col px-4 py-2 gap-5">
                    <div className="flex flex-col gap-2">
                        <span className="font-semibold text-2xl">
                            Đánh giá sản phẩm
                        </span>
                        <div className="border-t-2 w-full text-Dark_gray"></div>
                    </div>

                    <div className="flex items-center gap-2">
                        <img src={versace} alt="img" className="object-cover h-[80px] w-[80px]"/>

                        <span>
                            {productName ?? "Versace Cologne - Đẳng cấp từ nước Ý"}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span>
                            Chất lượng sản phẩm:
                        </span>

                        <Rating name="read-only" value={rating} precision={0.5} onChange={handleRatingChange} sx={{
                            '& .MuiRating-iconFilled': {
                                color: '#FABC3F',
                            }, '& .MuiRating-iconHover': {
                                color: '#FABC3F',
                            }
                        }}/>
                    </div>

                    <div>
                        <textarea
                            className="border border-Black focus:outline-none rounded-sm p-2 py-1 w-full h-[10rem] resize-none"
                            placeholder="Nhập bình luận của bạn..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-row-reverse gap-4">
                        <div>
                            <button className="bg-Blue text-White rounded-md py-2 px-4 hover:bg-Dark_blue" onClick={handleUpdateRating}>
                                <span>Đăng tải</span>
                            </button>
                        </div>

                        <div>
                            <button className="bg-Red rounded-md py-2 px-4 hover:bg-Dark_red" onClick={handleClose}>
                                <span className="text-White">Trở lại</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RatingModal;