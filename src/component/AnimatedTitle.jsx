import { gsap } from "gsap"; // Thư viện GSAP để tạo hiệu ứng animation
import { useEffect, useRef } from "react"; // Hook useEffect để chạy animation khi component mount, useRef để tham chiếu DOM
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Plugin ScrollTrigger của GSAP để kích hoạt animation khi cuộn
import clsx from "clsx"; // Thư viện clsx để ghép các lớp CSS một cách linh hoạt

gsap.registerPlugin(ScrollTrigger); // Đăng ký plugin ScrollTrigger để sử dụng trong GSAP

// Component AnimatedTitle nhận 2 props: title (chuỗi tiêu đề) và containerClass (lớp CSS tùy chỉnh)
const AnimatedTitle = ({ title, containerClass }) => {
    // Tạo tham chiếu containerRef để GSAP và ScrollTrigger nhắm đến phần tử DOM
    const containerRef = useRef(null);

    // Sử dụng useEffect để chạy animation khi component được mount
    useEffect(() => {
        // Tạo context cho GSAP, giới hạn phạm vi trong containerRef để quản lý animation dễ dàng
        const ctx = gsap.context(() => {
            // Tạo timeline để quản lý các animation theo thứ tự
            const titleAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current, // Phần tử kích hoạt animation là div được tham chiếu bởi containerRef
                    start: "100 bottom", // Animation bắt đầu khi điểm cách đỉnh containerRef 100px đi vào cạnh dưới viewport
                    end: "center bottom", // Animation kết thúc khi điểm giữa containerRef chạm cạnh dưới viewport
                    toggleActions: "play none none reverse", // Hành vi animation: play khi vào vùng, reverse khi ra (hướng lùi)
                },
            });

            // Áp dụng animation cho các phần tử có lớp .animated-word (mỗi từ trong tiêu đề)
            titleAnimation.to(
                ".animated-word",
                {
                    opacity: 1, // Làm các từ hiện lên (từ mờ đến rõ)
                    transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)", // Đặt vị trí và góc quay cuối cùng (về trạng thái bình thường)
                    ease: "power2.inOut", // Hiệu ứng chuyển động mượt mà (chậm đầu, nhanh giữa, chậm cuối)
                    stagger: 0.02, // Các từ xuất hiện lần lượt, mỗi từ cách nhau 0.02 giây
                },
                0 // Bắt đầu animation ngay lập tức trong timeline
            );
        }, containerRef); // Context chỉ áp dụng cho các phần tử trong containerRef

        // Dọn dẹp animation khi component unmount để tránh memory leak
        return () => ctx.revert();
    }, []); // Mảng rỗng để animation chỉ chạy một lần khi mount

    // JSX trả về giao diện của component
    return (
        // Container chính bao quanh toàn bộ tiêu đề, có thể nhận lớp tùy chỉnh qua containerClass
        <div ref={containerRef} className={clsx("animated-title", containerClass)}>
            {/* Tách tiêu đề thành các dòng dựa trên <br /> */}
            {title.split("<br />").map((line, index) => (
                // Mỗi dòng là một div, sử dụng flexbox để căn giữa và tự động xuống dòng
                <div
                    key={index} // Key để React quản lý danh sách
                    className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
                    // flex-center: Căn giữa nội dung (display: flex; align-items: center; justify-content: center)
                    // max-w-full: Chiều rộng tối đa 100%
                    // flex-wrap: Tự động xuống dòng nếu không đủ chỗ
                    // gap-2: Khoảng cách giữa các từ là 2 (thường là 8px nếu dùng Tailwind)
                    // px-10: Padding ngang 10 (thường là 40px nếu dùng Tailwind)
                    // md:gap-3: Trên màn hình medium trở lên, khoảng cách giữa các từ là 3
                >
                    {/* Tách dòng thành các từ dựa trên khoảng trắng */}
                    {line.split(" ").map((word, idx) => (
                        // Mỗi từ được bọc trong span để áp dụng animation riêng lẻ
                        <span
                            key={idx} // Key để React quản lý danh sách
                            className="animated-word" // Lớp này được GSAP nhắm đến để áp dụng animation
                            dangerouslySetInnerHTML={{ __html: word }} // Render HTML trong từ (hỗ trợ thẻ như <b>)
                            // Lưu ý: dangerouslySetInnerHTML có thể gây rủi ro bảo mật nếu title không đáng tin cậy
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

// Xuất component để sử dụng ở nơi khác
export default AnimatedTitle;