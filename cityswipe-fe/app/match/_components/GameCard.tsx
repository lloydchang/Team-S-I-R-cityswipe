/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, Dispatch, SetStateAction, useEffect } from "react";
import Image from "next/image";
import placeholderImg from'../../assets/imgs/white.png'
import maskImage from'../../assets/imgs/mask.png'

// import { Player } from "@lottiefiles/react-lottie-player";
// import lottieJson from "@/assets/animations/data.json";
import { useMediaQuery } from "usehooks-ts";

import {
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

import { games } from "./games.api";
import { useGameContext } from "./gameContext";
// import { useUserContext } from "@/store/userContext";
// import handleScore from "../_utils/handleScore";

import { type Card } from "@/lib/games.type";
import { useDestinationContext } from "./destinationContext";
import { DestinationItem } from "@/lib/destination.type";
import { createClient } from 'pexels';
import { Button } from "@/components/ui/button";


// import SvgIconScoreLeaf from "@/components/svg/score-leaf.svg";

type Props = {
  id?: number;
  data: Card;
  setCardDrivenProps: Dispatch<SetStateAction<any>>;
  setIsDragging: Dispatch<SetStateAction<any>>;
  isDragging: boolean;
  isLast: boolean;
  setIsDragOffBoundary: Dispatch<SetStateAction<any>>;
  setDirection: Dispatch<SetStateAction<any>>;
};

type cardSwipeDirection = "left" | "right";

const GameCard = ({
  id,
  data,
  setCardDrivenProps,
  setIsDragging,
  isDragging,
  isLast,
  setIsDragOffBoundary,
  setDirection
}: Props) => {
  // const [user, setUser] = useUserContext();
  // const { score, previousScore } = user;

  const [game, setGame] = useGameContext();
  const [destination, setDestination] = useDestinationContext();
  const { cards } = game;
  
  // const cardsAmount = games[game.id]?.cards.length; //fix
  let cardsAmount = 50; //fix

  const [imgLoadingComplete, setImgLoadingComplete] = useState(false);
  // const hasScoreIncreased = previousScore !== score;

  const { location, illustration } = data;
  const x = useMotionValue(0);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const scoreVariants = {
    initial: {
      y: 0,
    },
    pop: {
      y: [0, -15, -20, -15, 0],
    },
  };

  const offsetBoundary = 150;

  const inputX = [offsetBoundary * -1, 0, offsetBoundary];
  const outputX = [-200, 0, 200];
  const outputY = [50, 0, 50];
  const outputRotate = [-40, 0, 40];
  const outputActionScaleBadAnswer = [3, 1, 0.3];
  const outputActionScaleRightAnswer = [0.3, 1, 3];
  const outputMainBgColor = [
    "#fcbab6",
    "#fafafa",
    "#D4E0B2",
  ];

  let drivenX = useTransform(x, inputX, outputX);
  let drivenY = useTransform(x, inputX, outputY);
  let drivenRotation = useTransform(x, inputX, outputRotate);
  let drivenActionLeftScale = useTransform(
    x,
    inputX,
    outputActionScaleBadAnswer
  );
  let drivenActionRightScale = useTransform(
    x,
    inputX,
    outputActionScaleRightAnswer
  );
  // let drivenBg = useTransform(x, inputX, outputMainBgColor);
  let drivenBg = useTransform(x, [-20, 0, 20], outputMainBgColor);

  // --------------
  // Pexels API
  const client = createClient('8U6Se7vVT3H9tx1KPZAQTkDUSW0IKi3ldgBTVyh3W9NFF7roIpZxktzY');
  const query = location as string;
  console.log(query);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const findPhotos = () => {
    try {
      client.photos.search({ query, per_page: 1 }).then(response => {
        if ('photos' in response) {
          const matchphoto = response.photos[0].src.landscape;
          setPhotoUrl(matchphoto);
          console.log(matchphoto);
          return matchphoto;
        } 
      });
    } catch (error) {
      console.error('Error in fetching photos:', error);
    }
  }

  useEffect(() => {
    findPhotos();
  }, [location]);
  // --- Pexels End ---


  useMotionValueEvent(x, "change", (latest) => {
    //@ts-ignore
    setCardDrivenProps((state) => ({
      ...state,
      cardWrapperX: latest,
      buttonScaleBadAnswer: drivenActionLeftScale,
      buttonScaleGoodAnswer: drivenActionRightScale,
      mainBgColor: drivenBg,
    }));
  });

  return (
    <>
      <motion.div
        id={`cardDrivenWrapper-${id}`}
        className="absolute p-2 rounded-xl text-center w-full aspect-[100/150] pointer-events-none text-black origin-bottom shadow-card select-none"
        style={{
          y: drivenY,
          rotate: drivenRotation,
          x: drivenX,
        }}
      >
      {/* inside of card  */}
        <div
          id="illustration"
          className="w-full h-full relative overflow-hidden"
        >
          {/* <div
            id="imgPlaceholder"
            className="bg-gameSwipe-neutral absolute object-cover w-full h-full"
            style={{
              maskImage: `url('/images/gamecard-image-mask.png')`,
              WebkitMaskImage: `url(/images/gamecard-image-mask.png)`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}>
            </div>  */}

            {/* 1 out of whatever card youre on */}
          <div id="metrics" className="relative z-[2] flex w-full justify-between items-baseline">
            {/* number of cards out of 50 */}
            <div className="text-white p-4 bg-gradient-to-b from-black via-black to-transparent w-full flex place-content-start">
              <span className="text-[40px] leading-none">{id}</span>
              <span className="text-[20px] ml-1">
                /<span className="ml-[2px]">{cardsAmount}</span>
              </span>
            </div>
          {/* <div id="score" className="flex relative">
            <div className="text-[50px] text-grey-500 leading-none relative">
              <motion.div
                id="scoreValue"
                className="relative"
                variants={scoreVariants}
                initial="initial"
                animate={isLast && hasScoreIncreased ? "pop" : "initial"}
                transition={{
                  stiffness: 2000,
                  damping: 5,
                }}
              >
                {score}
              </motion.div>
              {isLast && hasScoreIncreased && (
                <div
                  id="sparks"
                  className="absolute w-[100px] h-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[2]"
                >
                  <Player
                    autoplay
                    src={lottieJson}
                    style={{ width: "100%", height: "100%" }}
                    speed={2}
                  ></Player>
                </div>
              )}
            </div>
          </div> */}
          </div>

          {/* the name of match */}
          <div id="locationWrapper"  className="mt-2 h-[30%] bg-gradient-to-t from-black via-black to-transparent w-full rounded absolute bottom-0 p-4 z-[2] text-white flex flex-col gap-2 place-items-start leading-tight">
            <p id="location" className="text-[40px]">
              {location}
            </p>
            <p>Bio</p>
          </div>

          {/* theimage on the card */}
          <Image
            priority
            className='absolute rounded w-full h-full object-cover object-center'
            src={photoUrl || placeholderImg}
            fill
            sizes={`(max-width: 768px) 100vw, 250px`}
            alt="car"
            // style={{
            //   maskImage: `url('/images/gamecard-image-mask.png')`,
            //   WebkitMaskImage: `url(/images/gamecard-image-mask.png)`,
            //   maskSize: "contain",
            //   WebkitMaskSize: "contain",
            //   maskRepeat: "no-repeat",
            //   WebkitMaskRepeat: "no-repeat",
            // }}
          />

        </div>
      {/* images end */}
        
      </motion.div>

      <motion.div
        id={`cardDriverWrapper-${id}`}
        className={`absolute w-full aspect-[100/150] ${
          !isDragging ? "hover:cursor-grab" : ""
        }`}
        drag="x"
        dragSnapToOrigin
        dragElastic={isMobile ? 0.2 : 0.06}
        dragConstraints={{ left: 0, right: 0 }}
        dragTransition={{ bounceStiffness: 1000, bounceDamping: 50 }}
        onDragStart={() => setIsDragging(true)}
        onDrag={(_, info) => {
          const offset = info.offset.x;          

          if (offset < 0 && offset < offsetBoundary * -1) {
          setIsDragOffBoundary("left");
          } else if (offset > 0 && offset > offsetBoundary) {
          setIsDragOffBoundary("right");
          } else {
            setIsDragOffBoundary(null);
          }
        }}
        onDragEnd={(_, info) => {
          setIsDragging(false);
          setIsDragOffBoundary(null);
          const isOffBoundary =
            info.offset.x > offsetBoundary || info.offset.x < -offsetBoundary;
          const direction = info.offset.x > 0 ? "right" : "left";

          if (isOffBoundary) {
            setDirection(direction);
          }
        }}
        style={{ x }}
      ></motion.div>

      {/* debug for pexals */}
      {/* <Button className="fixed top-0 right-0 z-50" onClick={() => findPhotos()}>Pexals</Button> */}

    </>
  );
};

export default GameCard;
