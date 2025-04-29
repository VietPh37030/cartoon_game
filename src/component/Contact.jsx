// Import component tiêu đề có hiệu ứng animation
import AnimatedTitle from "./AnimatedTitle";
// Import component Button (nút bấm)
import Button from "./Button";

// Component phụ dùng để hiển thị hình ảnh với class clipPath để tạo hiệu ứng cắt hình
const ImageClipBox = ({ src, clipClass }) => (
    <div className={clipClass}>
        <img src={src} />
    </div>
);

// Component chính Contact dùng để hiển thị section "Liên hệ / Kêu gọi tham gia"
const Contact = () => {
    return (
        // Container chính của section contact
        <div id="contact" className="my-20 min-h-96 w-screen  px-10">
            {/* Khối chính với nền đen, padding dọc và text màu xanh nhạt */}
            <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">

                {/* Hình ảnh bên trái (ẩn trên mobile - chỉ hiện khi sm: trở lên) */}
                <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
                    {/* Hình 1 với clip path custom */}
                    <ImageClipBox
                        src="/img/contact-1.webp"
                        clipClass="contact-clip-path-1"
                    />
                    {/* Hình 2 với clip path và hiệu ứng dịch chuyển xuống dưới */}
                    <ImageClipBox
                        src="/img/contact-2.webp"
                        clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
                    />
                </div>

                {/* Hình ảnh nhân vật kiếm sĩ bên phải (có scale to ra khi md: trở lên) */}
                <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
                    {/* Hình nền/partial của nhân vật */}
                    <ImageClipBox
                        src="/img/swordman-partial.webp"
                        clipClass="absolute md:scale-125"
                    />
                    {/* Hình chính nhân vật với hiệu ứng clip path */}
                    <ImageClipBox
                        src="/img/swordman.webp"
                        clipClass="sword-man-clip-path md:scale-125"
                    />
                </div>

                {/* Phần nội dung chính giữa */}
                <div className="flex flex-col items-center text-center">
                    {/* Tiêu đề phụ */}
                    <p className="mb-10 font-general text-[10px] uppercase">
                        Join Awaken
                    </p>

                    {/* Tiêu đề chính có hiệu ứng động với font đặc biệt */}
                    <AnimatedTitle
                        title="let&#39;s b<b>u</b>ild the <br /> new era of <br /> g<b>a</b>ming t<b>o</b>gether."
                        className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
                    />

                    {/* Nút "contact us" */}
                    <Button title="contact us" containerClass="mt-10 cursor-pointer" />
                </div>
            </div>
        </div>
    );
};

// Export component Contact để sử dụng ở nơi khác
export default Contact;
