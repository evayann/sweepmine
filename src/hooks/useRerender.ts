import { useState } from "react";

export function useRerender() {
    const [, rerender] = useState({});

    return () => rerender({})
}