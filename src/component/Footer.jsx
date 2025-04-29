// Nhập các icon mạng xã hội từ thư viện react-icons
import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";

// Mảng chứa các đối tượng đại diện cho từng link mạng xã hội và icon tương ứng
const socialLinks = [
    { href: "https://discord.com", icon: <FaDiscord /> },
    { href: "https://twitter.com", icon: <FaTwitter /> },
    { href: "https://youtube.com", icon: <FaYoutube /> },
    { href: "https://medium.com", icon: <FaMedium /> },
];

// Component Footer dùng để hiển thị phần chân trang
const Footer = () => {
    return (
        // Thẻ footer bao toàn bộ nội dung chân trang
        <footer className="w-screen bg-[#5542ff] py-4 text-black">
            {/* container chính giữa, flex chia layout theo chiều dọc trên mobile và ngang ở md trở lên */}
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">

                {/* Đoạn văn bản bản quyền nằm giữa hoặc bên trái tùy theo kích thước màn hình */}
                <p className="text-center text-sm font-light md:text-left">
                    ©Nova 2024. All rights reserved
                </p>

                {/* Nhóm các icon mạng xã hội, sắp xếp theo hàng ngang */}
                <div className="flex justify-center gap-4  md:justify-start">
                    {socialLinks.map((link, index) => (
                        // Mỗi icon là một thẻ <a> liên kết tới nền tảng mạng xã hội
                        <a
                            key={index} // khóa duy nhất để React nhận diện phần tử
                            href={link.href} // URL mạng xã hội
                            target="_blank" // mở liên kết ở tab mới
                            rel="noopener noreferrer" // bảo mật khi mở tab mới
                            className="text-black transition-colors duration-500 ease-in-out hover:text-white" // hiệu ứng hover đổi màu
                        >
                            {link.icon} {/* Hiển thị icon tương ứng */}
                        </a>
                    ))}
                </div>

                {/* Link tới chính sách riêng tư nằm bên phải trên desktop */}
                <a
                    href="#privacy-policy"
                    className="text-center text-sm font-light hover:underline md:text-right"
                >
                    Privacy Policy
                </a>
            </div>
        </footer>
    );
};

// Xuất component Footer để sử dụng nơi khác
export default Footer;
