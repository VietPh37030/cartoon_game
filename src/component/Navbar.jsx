import React, { useEffect, useRef, useState } from 'react';
import Button from './Button.jsx';
import { TiLocationArrow } from 'react-icons/ti';
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';
import { ethers } from 'ethers';

const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact'];

const Navbar = ({ setWalletInfo }) => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);
    const [walletAddress, setWalletAddress] = useState(null);
    const navContainerRef = useRef(null);
    const audioElementRef = useRef(null);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isNavVisible, setIsNavVisible] = useState(true);
    const { y: currenScrolly } = useWindowScroll();

    useEffect(() => {
        if (currenScrolly === 0) {
            setIsNavVisible(true);
            navContainerRef.current.classList.remove('floating-nav');
        } else if (currenScrolly > lastScrollY) {
            setIsNavVisible(false);
            navContainerRef.current.classList.add('floating-nav');
        } else if (currenScrolly < lastScrollY) {
            setIsNavVisible(true);
            navContainerRef.current.classList.add('floating-nav');
        }
        setLastScrollY(currenScrolly);
    }, [currenScrolly, lastScrollY]);

    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev) => !prev);
        setIsIndicatorActive((prev) => !prev);
    };

    useEffect(() => {
        if (isAudioPlaying) {
            audioElementRef.current.play();
        } else {
            audioElementRef.current.pause();
        }
    }, [isAudioPlaying]);

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2,
        });
    }, [isNavVisible]);

    // Kết nối ví Ronin
    const connectWallet = async () => {
        if (window.ronin && window.ronin.provider) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ronin.provider);
                await provider.send('eth_requestAccounts', []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                setWalletAddress(address);
                // Truyền thông tin ví qua props
                setWalletInfo({ provider, signer, address });
            } catch (error) {
                console.error('Lỗi kết nối ví:', error);
                alert('Lỗi kết nối ví!');
            }
        } else {
            alert('Vui lòng cài đặt Ronin Wallet!');
        }
    };

    return (
        <div
            ref={navContainerRef}
            className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6 bg-black"
        >
            <header className="absolute top-1/2 w-full -translate-y-1/2">
                <nav className="flex size-full items-center justify-between p-4">
                    {/* Left side: Logo, Audio Indicator, Nav Items */}
                    <div className="flex items-center gap-7">
                        <img src="/img/logo.webp" alt="logo" className="w-10" />
                        <button
                            className="flex items-center space-x-0.5"
                            onClick={toggleAudioIndicator}
                        >
                            <audio ref={audioElementRef} className="hidden" src="/audio/loop.mp3" loop />
                            {[1, 2, 3, 4].map((bar) => (
                                <div
                                    key={bar}
                                    className={`indicator-line ${isIndicatorActive ? 'active' : ''}`}
                                    style={{ animationDelay: `${bar * 0.1}s` }}
                                />
                            ))}
                        </button>
                        <div className="hidden md:flex gap-4">
                            {navItems.map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="nav-hover-btn"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                    {/* Right side: Connect Wallet Button */}
                    <div className="flex items-center">
                        <Button
                            id="product-button"
                            title={walletAddress ? `Đã kết nối: ${walletAddress.slice(0, 6)}...` : 'Connect Wallet'}
                            rightIcon={<TiLocationArrow />}
                            containerClass="bg-white text-black rounded-full px-4 py-2 flex items-center justify-center gap-1"
                            onClick={connectWallet}
                        />
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Navbar;