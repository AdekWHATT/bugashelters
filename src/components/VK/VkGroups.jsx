/* global VK */
import React, { useEffect } from 'react';


const VkPlayGroup = () => {
    useEffect(() => {
        VK.Widgets.Group("vk_groups2", {mode: 2, wide: 1, height: 300, color1: "FFFFFF", color2: "000000", color3: "5181B8"}, 219474277);
      }, []);

  return (
        <div id="vk_groups2">&nbsp;&nbsp;</div>
  );
};

export default React.memo(VkPlayGroup);
