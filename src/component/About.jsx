// Import thư viện GSAP để tạo hiệu ứng animation
import gsap from "gsap";
// Import hook useGSAP từ @gsap/react để tích hợp GSAP với React
import { useGSAP } from "@gsap/react";
// Import plugin ScrollTrigger từ GSAP để kích hoạt animation khi cuộn
import { ScrollTrigger } from "gsap/all";

// Import component AnimatedTitle để hiển thị tiêu đề với hiệu ứng animation
import AnimatedTitle from "./AnimatedTitle";

// Đăng ký plugin ScrollTrigger để sử dụng trong GSAP
gsap.registerPlugin(ScrollTrigger);

// Component About hiển thị phần giới thiệu với hiệu ứng animation
const About = () => {
    // Sử dụng useGSAP để chạy animation khi component được mount
    useGSAP(() => {
        // Tạo timeline để quản lý các animation theo thứ tự
        const clipAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: "#clip", // Phần tử kích hoạt animation là div có id="clip"
                start: "center center", // Animation bắt đầu khi điểm giữa của #clip nằm ở giữa viewport
                end: "+=800 center", // Animation kết thúc sau khi cuộn thêm 800px, điểm giữa #clip vẫn ở giữa viewport
                scrub: 0.5, // Animation đồng bộ với cuộn, độ trễ 0.5 giây để mượt mà
                pin: true, // Giữ #clip cố định trong viewport khi cuộn qua vùng kích hoạt
                pinSpacing: true, // Tạo khoảng trống để các phần tử khác không bị đè khi #clip được pin
            },
        });

        // Áp dụng animation cho phần tử có lớp .mask-clip-path
        clipAnimation.to(".mask-clip-path", {
            width: "100vw", // Mở rộng chiều rộng thành 100% viewport width
            height: "100vh", // Mở rộng chiều cao thành 100% viewport height
            borderRadius: 0, // Đặt border-radius về 0 để bỏ bo góc
        });
    }, { dependencies: [] }); // Mảng rỗng để animation chỉ chạy một lần khi mount

    // JSX trả về giao diện của component
    return (
        // Container chính bao quanh toàn bộ phần About
        <div id="about" className="min-h-screen w-screen">
            {/* min-h-screen: Chiều cao tối thiểu bằng 100% viewport height */}
            {/* w-screen: Chiều rộng bằng 100% viewport width */}

            {/* Phần tiêu đề và mô tả, căn giữa dọc */}
            <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
                {/* relative: Định vị tương đối để có thể dùng absolute cho các phần tử con nếu cần */}
                {/* mb-8: Margin bottom 8 (thường là 32px nếu dùng Tailwind) */}
                {/* mt-36: Margin top 36 (thường là 144px nếu dùng Tailwind) */}
                {/* flex: Sử dụng flexbox để sắp xếp các phần tử con */}
                {/* flex-col: Xếp dọc các phần tử con */}
                {/* items-center: Căn giữa các phần tử con theo trục ngang */}
                {/* gap-5: Khoảng cách giữa các phần tử con là 5 (thường là 20px nếu dùng Tailwind) */}

                {/* Dòng chữ "Welcome to Zentry" */}
                <p className="font-general text-sm uppercase md:text-[10px]">
                    {/* font-general: Font tùy chỉnh (cần định nghĩa trong CSS) */}
                    {/* text-sm: Kích thước chữ nhỏ (thường là 14px nếu dùng Tailwind) */}
                    {/* uppercase: Chữ in hoa */}
                    {/* md:text-[10px]: Trên màn hình medium trở lên, kích thước chữ là 10px */}
                    Welcome to Awaken
                </p>

                {/* Tiêu đề chính với hiệu ứng animation, sử dụng component AnimatedTitle */}
                <AnimatedTitle
                    title="Enter a new <b>R</b>ealm where <b>W</b>aifus <b>A</b>waken,<br /> <b>S</b>ummon legends, <b>C</b>laim treasures, and <b>R</b>ule the <b>C</b>hain."


                    containerClass="mt-5 !text-black text-center"
                    // title: Chuỗi tiêu đề, có <b> để in đậm và <br /> để xuống dòng
                    // containerClass: Các lớp CSS tùy chỉnh
                    // mt-5: Margin top 5 (thường là 20px nếu dùng Tailwind)
                    // !text-black: Màu chữ đen (có ! để ưu tiên cao hơn)
                    // text-center: Căn giữa văn bản
                />

                {/* Phần mô tả phụ (subtext) */}
                <div className="about-subtext">
                    {/* about-subtext: Lớp tùy chỉnh (cần định nghĩa trong CSS) */}
                    <p>The Game of Games begins—your life, now an epic MMORPG</p>
                    <p className="text-gray-500">
                        {/* text-gray-500: Màu chữ xám nhạt (thường là #6b7280 nếu dùng Tailwind) */}
                        Awaken unites every player from countless games and platforms, both
                        digital and physical, into a unified Play Economy
                    </p>
                </div>
            </div>

            {/* Phần hình ảnh với hiệu ứng mở rộng khi cuộn */}
            <div className="h-dvh w-screen" id="clip">
                {/* h-dvh: Chiều cao bằng 100% viewport height (bao gồm thanh địa chỉ trên mobile) */}
                {/* w-screen: Chiều rộng bằng 100% viewport width */}
                {/* id="clip": Id để ScrollTrigger nhắm đến phần tử này */}

                {/* Container cho hình ảnh với hiệu ứng mở rộng */}
                <div className="mask-clip-path about-image">
                    {/* mask-clip-path: Lớp tùy chỉnh (có thể dùng clip-path hoặc mask, cần định nghĩa trong CSS) */}
                    {/* about-image: Lớp tùy chỉnh (cần định nghĩa trong CSS) */}
                    {/* Lưu ý: Cần đặt kích thước ban đầu để GSAP hoạt động, ví dụ: w-[50vw] h-[50vh] */}

                    <img
                        src="img/about.webp" // Đường dẫn đến hình ảnh
                        alt="Background" // Mô tả hình ảnh cho SEO và accessibility
                        className="absolute left-0 top-0 size-full object-cover"
                        // absolute: Định vị tuyệt đối để hình ảnh lấp đầy container
                        // left-0 top-0: Căn hình ảnh vào góc trên bên trái
                        // size-full: Chiều rộng và chiều cao 100% container cha
                        // object-cover: Hình ảnh lấp đầy container, cắt bớt phần thừa để giữ tỷ lệ
                    />
                </div>
            </div>
        </div>
    );
};

// Xuất component để sử dụng ở nơi khác
export default About;