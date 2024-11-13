import React, {useEffect, useState} from 'react';
import Rating from "@mui/material/Rating";
import LoadingModal from "../General/LoadingModal";
import {instance} from "../../AxiosConfig";

const RatingModal = (props) => {
    const [loading, setLoading] = useState(false);
    // set up loading modal
    const [isLoadingModalOpen, setLoadingModalOpen] = useState(false);

    const openLoadingModal = () => {
        setLoadingModalOpen(true);
    };

    const closeLoadingModal = () => {
        setLoadingModalOpen(false);
    };
    // end set up loading modal

    const [review, setReview] = useState(null);
    const [rating, setRating] = React.useState(5);
    const [comment, setComment] = React.useState("");

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handleClose = () => {
        props.onClose();
    };

    useEffect(() => {
        if (props.ratingId) {
            const fetchRating = async () => {
                try {
                    setLoading(true);
                    openLoadingModal();
                    const response = await instance.get(`v1/shopping-service/product-rating/${props.ratingId}`);
                    setRating(response.data.data.rating);
                    setComment(response.data.data.comment);
                }
                catch (error) {
                    setLoading(false);
                    closeLoadingModal();
                    console.log(error);
                }
                finally {
                    setLoading(false);
                    closeLoadingModal();
                }
            }

            fetchRating();
        }
    }, [props.ratingId]);

    const handleUpdateRating = async () => {
        // Call API to update rating
        try {
            setLoading(true);
            openLoadingModal();
            let data = {
                rating: rating,
                comment: comment,
                productId: props.productId,
            };
            console.log(data);
            await instance.post("v1/shopping-service/product-rating", data);
        }
        catch (error) {
            setLoading(false);
            closeLoadingModal()
            console.log(error);
        }
        finally {
            setLoading(false);
            closeLoadingModal();
            props.onRate();
            handleClose();
        }
    };

    return (
        // backdrop
        <div className={`fixed inset-0 flex items-center justify-center z-[100] ${props.open ? "visible bg-black/20" : "collapse"}`}>
            <div onClick={(e) => e.stopPropagation()} className={`bg-White rounded-sm shadow w-[35rem] h-[28rem] grid grid-rows-[90%_10%] ${props.open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <div className="flex flex-col px-4 py-2 gap-5">
                    <div className="flex flex-col gap-2">
                        <span className="font-semibold text-2xl">
                            Đánh giá sản phẩm
                        </span>
                        <div className="border-t-2 w-full text-Dark_gray"></div>
                    </div>

                    <div className="flex items-center gap-2">
                        <img src={props.picture} alt="img" className="object-cover h-[80px] w-[80px]"/>

                        <span>
                            {props.productName}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span>
                            Chất lượng sản phẩm:
                        </span>

                        {props.isRating
                            ?
                            <Rating name="read-only" value={rating} readOnly onChange={handleRatingChange} sx={{
                            '& .MuiRating-iconFilled': {
                                color: '#FABC3F',
                            }, '& .MuiRating-iconHover': {
                                color: '#FABC3F',
                            }
                        }}/>
                            :
                            <Rating name="read-only" value={rating} onChange={handleRatingChange} sx={{
                            '& .MuiRating-iconFilled': {
                                color: '#FABC3F',
                            }, '& .MuiRating-iconHover': {
                                color: '#FABC3F',
                            }
                        }}/>}
                    </div>

                    <div>
                        {props.isRating
                            ?
                            <textarea
                            className="border border-Black focus:outline-none rounded-sm p-2 py-1 w-full h-[10rem] resize-none"
                            placeholder="Nhập bình luận của bạn..."
                            value={comment}
                            readOnly
                            onChange={(e) => setComment(e.target.value)}/>
                            :
                            <textarea
                            className="border border-Black focus:outline-none rounded-sm p-2 py-1 w-full h-[10rem] resize-none"
                            placeholder="Nhập bình luận của bạn..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}/>}
                    </div>

                    <div className="flex flex-row-reverse gap-4">
                        {!props.isRating &&
                            <div>
                                <button className="bg-Blue text-White rounded-md py-2 px-4 hover:bg-Dark_blue"
                                        onClick={handleUpdateRating}>
                                    <span>Đăng tải</span>
                                </button>
                            </div>}

                        <div>
                            <button className="bg-Red rounded-md py-2 px-4 hover:bg-Dark_red" onClick={handleClose}>
                                <span className="text-White">Trở lại</span>
                            </button>
                        </div>
                    </div>
                </div>

                {loading && <LoadingModal isOpen={isLoadingModalOpen}/>}
            </div>
        </div>
    );
};

export default RatingModal;