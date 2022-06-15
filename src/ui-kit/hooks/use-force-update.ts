import { useCallback, useState } from "react";

import { getIncrementalId } from "@/ui-kit/helpers/generate-id";


export const useForceUpdate = () => {
  const [, forceUpdate] = useState(0);
  return useCallback(() => forceUpdate(getIncrementalId()), [forceUpdate]);
};
