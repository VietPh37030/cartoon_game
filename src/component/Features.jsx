import { TiArrowMaximiseOutline } from "react-icons/ti";
import { useRef, useState } from "react";

// Component Tilt có hiệu ứng nghiêng nhẹ khi di chuột
const BentoTilt = ({ children, className = "" }) => {
    const [transformStyle, setTransformStyle] = useState(""); // Lưu style transform động
    const itemRef = useRef(); // Ref để lấy tọa độ phần tử

    // Khi rê chuột vào thì tính toán góc nghiêng dựa trên vị trí chuột
    const handleMouseMove = (e) => {
        if (!itemRef.current) return;
        const { left, top, width, height } = itemRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;   // Vị trí X tương đối từ 0 → 1
        const y = (e.clientY - top) / height;   // Vị trí Y tương đối từ 0 → 1

        // Tính góc xoay – càng gần biên, góc càng lớn
        const tiltX = (y - 0.5) * 5;  // Góc theo trục X
        const tiltY = (x - 0.5) * 5;  // Góc theo trục Y

        // Tạo hiệu ứng 3D nghiêng + thu nhỏ nhẹ
        setTransformStyle(
            `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.95,0.95,0.95)`
        );
    };

    // Khi chuột rời khỏi thẻ thì reset hiệu ứng
    const handleMouseLeave = () => {
        setTransformStyle("");
    };

    return (
        <div
            className={className}
            ref={itemRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform: transformStyle }}
        >
            {children}
        </div>
    );
};

// Component Card gồm video nền + tiêu đề + mô tả
const BentoCard = ({ src, title, description }) => (
    <div className="relative size-full">
        {/* Video nền */}
        <video
            src={src}
            loop
            autoPlay
            muted
            aria-hidden="true"
            role="presentation"
            className="absolute left-0 top-0 size-full object-cover"
        />
        {/* Nội dung hiển thị trên video */}
        <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
            <div>
                <h1 className="bento-title special-font">{title}</h1>
                {description && (
                    <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
                )}
            </div>
        </div>
    </div>
);

// Phần tổng hợp các card: Features Section
const Features = () => {
    return (
        <section className="bg-black pb-52">
            <div className="container mx-auto px-3 md:px-10">
                {/* Phần giới thiệu trên đầu */}
                <div className="px-5 py-32">
                    <p className="font-circular-web text-lg text-blue-50">
                        Into the Metagame layer
                    </p>
                    <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
                        Immerse yourself in the world of the <b>M</b>etaverse, where <b>W</b>aifus come alive,<br /> <b>S</b>ummon mythical cards, <b>C</b>onquer realms, and <b>R</b>ule the <b>C</b>hain.

                    </p>
                </div>

                {/* Card chính kích thước lớn */}
                <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
                    <BentoCard
                        src="videos/feature-1.mp4"
                        title={
                            <>
                                radis<b>n</b>t
                            </>
                        }
                        description="Step into Radisnt — where Waifus awaken, Cards hold power, and the Metaverse becomes your battlefield."
                    />
                </BentoTilt>

                {/* Grid 2 cột 3 hàng chứa các card nhỏ hơn */}
                <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7">
                    {/* Card cao 2 hàng bên trái */}
                    <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
                        <BentoCard
                            src="videos/feature-2.mp4"
                            title={
                                <>
                                    zig<b>m</b>a<b>n</b>t
                                </>
                            }
                            description="A realm where ancient spirits duel through enchanted cards and destiny is forged on the chain."
                        />
                    </BentoTilt>

                    {/* Card bên phải dòng đầu */}
                    <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
                        <BentoCard
                            src="videos/feature-3.mp4"
                            title={
                                <>
                                    n<b>e</b>x<b>u</b>s
                                </>
                            }
                            description="Venture into Nexus — the core of all realms, where champions summon legendary waifus and battle for control of the chain."
                        />
                    </BentoTilt>

                    {/* Card bên trái dòng 2 */}
                    <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
                        <BentoCard
                            src="videos/feature-4.mp4"
                            title={
                                <>
                                    n<b>e</b>x<b>u</b>s
                                </>
                            }
                            description="Venture into Nexus — the core of all realms, where champions summon legendary waifus and battle for control of the chain."
                        />
                    </BentoTilt>

                    {/* Card cuối cùng là placeholder "coming soon" */}
                    <div className="bento-tilt_2">
                        <BentoTilt className="flex size-full flex-col justify-between bg-violet-300 p-5">
                            <h1 className="bento-title special-font max-w-64 text-black">
                                <b>M</b><b>o</b>re c<b>o</b>m<b>i</b>ng s<b>o</b>o<b>n</b>!
                            </h1>
                            <TiArrowMaximiseOutline className="m-5 scale-[5] self-end" />
                        </BentoTilt>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
