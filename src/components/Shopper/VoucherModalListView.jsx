import React, {useState} from "react";

const VoucherModalListView = (props) => {
    // const [checked, setChecked] = useState(props.checked);
    // const handleCheck = () => {
    //     setChecked(!checked);
    // }

    const handleChange = () => {
        props.onSelect({
            id: props.id,
            name: props.name,
            discount: props.discount,
            applyProduct: props.applyProduct
        });
    };

    return (
        <div className="grid grid-cols-[30%_70%] mx-2 my-2 h-[120px]">
            <div className="col-start-1 bg-Blue flex items-center justify-center select-none">
                <span className="text-White text-2xl font-semibold">
                    {props.discount + "%" ?? "10%"} OFF
                </span>
            </div>

            <div className="bg-Light_gray grid grid-cols-[90%_10%]">
                <div className="flex flex-col justify-between col-start-1">
                    <div className="ml-2 mt-1">
                        <span className="text-Red font-bold text-lg">
                            Giảm {props.discount + "%" ?? "10%"}
                        </span>
                    </div>

                    <div className="ml-2">
                        <span className="font-semibold">
                            {props.name ?? "Voucher mùa thu"}
                        </span>
                    </div>

                    <div className="ml-2 mb-1">
                        <span className="text-pretty text-sm">
                            Áp dụng: {props.applyProduct ?? "Chăm sóc tóc, chăm sóc da mặt, dụng cụ trang điểm"}
                        </span>
                    </div>
                </div>

                <div className="col-start-2 flex items-center justify-center">
                    <input type="radio" className="checked:bg-Blue w-5 h-5 cursor-pointer" checked={props.isSelected} onChange={handleChange}/>
                </div>
            </div>
        </div>
    );
};

export default VoucherModalListView;