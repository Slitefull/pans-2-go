import { useEffect } from "react";

import { useForceUpdate } from "@/ui-kit/hooks/use-force-update";


export const useAutoUpdate = (time: number) => {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const interval = window.setInterval(forceUpdate, time);

    return () => window.clearInterval(interval);
  }, [forceUpdate, time]);
};
