import { UseFormRegisterReturn } from "react-hook-form";

interface myp{
    registration: UseFormRegisterReturn;
}


export default function PictureInput({registration}: myp) {
    return (
        <div className="w-full py-9 bg-gray-800 rounded-2xl border border-gray-600 gap-3 grid border-dashed">
            <div className="grid gap-1">
                <svg className="mx-auto" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="File">
                        <path id="icon" d="M16.296 25.3935L19.9997 21.6667L23.7034 25.3935M19.9997 35V21.759M10.7404 27.3611H9.855C6.253 27.3611 3.33301 24.4411 3.33301 20.8391C3.33301 17.2371 6.253 14.3171 9.855 14.3171V14.3171C10.344 14.3171 10.736 13.9195 10.7816 13.4326C11.2243 8.70174 15.1824 5 19.9997 5C25.1134 5 29.2589 9.1714 29.2589 14.3171H30.1444C33.7463 14.3171 36.6663 17.2371 36.6663 20.8391C36.6663 24.4411 33.7463 27.3611 30.1444 27.3611H29.2589" stroke="#4F46E5" stroke-width="1.6" stroke-linecap="round" />
                    </g>
                </svg>
                <h2 className="text-center text-gray-400 text-xs leading-4">JPG, PNG, or JPEG, smaller than 15MB</h2>
            </div>
            <div className="grid gap-2">
                <h4 className="text-center text-gray-200 text-sm font-medium leading-snug">Drag and Drop your Profile Picture here or</h4>
                <div className="flex items-center justify-center">
                    <label>
                        <input {...registration} type="file" hidden />
                        <div className="flex w-28 h-9 px-2 flex-col bg-indigo-600 rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none hover:bg-indigo-700">Choose File</div>
                    </label>
                </div>
            </div>
        </div>
    );
}
