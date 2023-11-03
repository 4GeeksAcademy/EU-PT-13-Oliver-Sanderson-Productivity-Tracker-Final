import React from "react";
import { FeaturesCenter } from "../../components/FeaturesCenter";
import { MdiCardsHeart1 } from "../../icons/MdiCardsHeart1";
import { StreamlineMoneyGraphArrowIncreaseAscendGrowthUpArrowSta } from "../../icons/StreamlineMoneyGraphArrowIncreaseAscendGrowthUpArrowSta";
import { Vector1 } from "../../icons/Vector1";
import "../../styles/features.css";

const Features = () => {
  return (
    <div className="features">
      <FeaturesCenter
        className="features-center-instance"
        iconBoxIcon={<StreamlineMoneyGraphArrowIncreaseAscendGrowthUpArrowSta className="icon-instance-node" />}
        iconBoxSizeSmallClassName="design-component-instance-node"
        paragraphFeatureClassName="features-center-2"
        text="Set Screen Productivity Goals"
        text1="Be on top of thing by setting screen time goals!"
      />
      <FeaturesCenter
        className="features-center-3"
        iconBoxIcon={<MdiCardsHeart1 className="icon-instance-node" />}
        iconBoxSizeSmallClassName="features-center-4"
        paragraphFeatureClassName="features-center-2"
        text="Track your screen time"
        text1="Improve your efficency by tracking your screen time and learning about your habits"
      />
      <FeaturesCenter
        className="features-center-5"
        iconBoxIcon={<Vector1 className="icon-instance-node" />}
        iconBoxSizeSmallClassName="features-center-6"
        paragraphFeatureClassName="features-center-2"
        text="Connect with friends"
        text1="Don’t work in silence share your progress with friends and family!"
      />
    </div>
  );
};
export default Features;
