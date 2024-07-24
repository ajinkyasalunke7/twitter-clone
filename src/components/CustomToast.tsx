import { Toaster } from "react-hot-toast";

export const CustomToast = () => {
    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
            top-center={90}
            gutter={8}
            containerClassName=""
            containerStyle={{
                top: 60,
            }}
            toastOptions={{
                // Define default options
                className: "",
                duration: 2000,
                style: {
                    background: "#363636",
                    color: "#fff",
                },

                // Default options for specific types
                // success: {
                //     theme: {
                //         duration: 1000,
                //         primary: "green",
                //         secondary: "black",
                //     },
                // },
            }}
        />
    );
};
