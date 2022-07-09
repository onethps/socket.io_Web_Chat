import {
  theme,
  eyesMap,
  eyebrowsMap,
  mouthsMap,
  hairMap,
  facialHairMap,
  clothingMap,
  accessoryMap,
  graphicsMap,
  hatMap,
  bodyMap
} from "@bigheads/core";

function selectRandomKey(object:any) {
  return Object.keys(object)[
    Math.floor(Math.random() * Object.keys(object).length)
    ];
}

export function getRandomOptions() {
  const skinTone:any = selectRandomKey(theme.colors.skin);
  const eyes:any = selectRandomKey(eyesMap);
  const eyebrows:any = selectRandomKey(eyebrowsMap);
  const mouth:any = selectRandomKey(mouthsMap);
  const hair:any = selectRandomKey(hairMap);
  const facialHair:any = selectRandomKey(facialHairMap);
  const clothing:any = selectRandomKey(clothingMap);
  const accessory:any = selectRandomKey(accessoryMap);
  const graphic:any = selectRandomKey(graphicsMap);
  const hat:any = selectRandomKey(hatMap);
  const body:any = selectRandomKey(bodyMap);

  const hairColor:any = selectRandomKey(theme.colors.hair);
  const clothingColor:any = selectRandomKey(theme.colors.clothing);
  const circleColor:any = selectRandomKey(theme.colors.bgColors);
  const lipColor:any = selectRandomKey(theme.colors.lipColors);
  const hatColor:any = selectRandomKey(theme.colors.clothing);
  const faceMaskColor:any = selectRandomKey(theme.colors.clothing);

  const mask = true;
  const faceMask = false;
  const lashes = Math.random() > 0.5;

  return {
    skinTone,
    eyes,
    eyebrows,
    mouth,
    hair,
    facialHair,
    clothing,
    accessory,
    graphic,
    hat,
    body,
    hairColor,
    clothingColor,
    circleColor,
    lipColor,
    hatColor,
    faceMaskColor,
    mask,
    faceMask,
    lashes
  };
}