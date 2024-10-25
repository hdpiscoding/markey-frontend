import React from 'react';
import Rating from '@mui/material/Rating';
import avatar from '../../assets/avatar_holder.svg';

const RatingListItem = (props) => {
    return (
        <div className="bg-White rounded-md flex flex-col shadow">
            <div className="flex mx-2 mt-2">
                <div className="select-none">
                    <img src={avatar} alt="avatar" className="object-cover w-[3.5rem] h-[3.5rem]"/>
                </div>

                <div className="flex flex-col ml-3 justify-between">
                    <div className="flex gap-8 items-center">
                        <span className="font-semibold">
                            {props.name ?? "Florentino Perez"}
                        </span>

                        <span className="text-[0.75rem] text-Dark_gray">
                            Ngày tạo: {props.date ?? "12/12/2021"}
                        </span>
                    </div>

                    <div>
                        <Rating name="read-only" value={props.rating ?? 5} precision={0.5} readOnly/>
                    </div>
                </div>
            </div>

            <div className="my-2 mx-5">
                <p className="text-sm">
                    {props.comment ?? "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
                </p>
            </div>
        </div>
    );
};

export default RatingListItem;